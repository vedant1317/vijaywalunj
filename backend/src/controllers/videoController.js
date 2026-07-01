import Video from '../models/Video.js';

const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const YOUTUBE_SYNC_LIMIT = Number(process.env.YOUTUBE_SYNC_LIMIT || 12);
const YOUTUBE_SYNC_INTERVAL_MS = Number(process.env.YOUTUBE_SYNC_INTERVAL_MINUTES || 30) * 60 * 1000;
const YOUTUBE_VIDEO_KEYWORDS = (process.env.YOUTUBE_VIDEO_KEYWORDS || '')
  .split(',')
  .map((keyword) => keyword.trim().toLowerCase())
  .filter(Boolean);

let lastYouTubeSyncAt = 0;
let syncInFlight = null;

const decodeXmlEntities = (value = '') => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'");

const cleanText = (value = '') => decodeXmlEntities(value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').trim());

const matchesVideoKeywords = (video) => {
  if (!YOUTUBE_VIDEO_KEYWORDS.length) return true;

  const haystack = `${video.title || ''} ${video.description || ''}`.toLowerCase();
  return YOUTUBE_VIDEO_KEYWORDS.some((keyword) => haystack.includes(keyword));
};

const getYouTubeFeedUrl = () => {
  if (process.env.YOUTUBE_RSS_URL) return process.env.YOUTUBE_RSS_URL;
  if (process.env.YOUTUBE_PLAYLIST_ID) {
    return `https://www.youtube.com/feeds/videos.xml?playlist_id=${process.env.YOUTUBE_PLAYLIST_ID}`;
  }
  if (process.env.YOUTUBE_CHANNEL_ID) {
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${process.env.YOUTUBE_CHANNEL_ID}`;
  }
  return null;
};

const parseYouTubeFeedEntry = (entry) => {
  const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
  const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
  const linkMatch = entry.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/) || entry.match(/<link[^>]*href="([^"]+)"/);
  const descriptionMatch = entry.match(/<media:description[^>]*>([\s\S]*?)<\/media:description>/);
  const publishedAtMatch = entry.match(/<published>([^<]+)<\/published>/);

  if (!videoIdMatch || !titleMatch || !linkMatch) return null;

  const video = {
    title: cleanText(titleMatch[1]),
    description: descriptionMatch ? cleanText(descriptionMatch[1]) : undefined,
    sourcePublishedAt: publishedAtMatch ? new Date(publishedAtMatch[1]) : undefined,
    youtubeVideoId: videoIdMatch[1].trim(),
    youtubeUrl: linkMatch[1].trim(),
  };

  if (!matchesVideoKeywords(video)) return null;

  return {
    ...video,
    thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`,
    isPublished: true,
  };
};

const syncYouTubeVideos = async () => {
  const feedUrl = getYouTubeFeedUrl();
  if (!feedUrl) return { skipped: true, synced: 0 };

  const response = await fetch(feedUrl, { headers: { Accept: 'application/xml,text/xml;q=0.9,*/*;q=0.8' } });
  if (!response.ok) {
    throw new Error(`YouTube feed request failed with status ${response.status}`);
  }

  const xml = await response.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => match[1]);
  const videos = entries
    .map(parseYouTubeFeedEntry)
    .filter(Boolean)
    .slice(0, YOUTUBE_SYNC_LIMIT);

  if (!videos.length) return { skipped: true, synced: 0 };

  await Promise.all(videos.map((video) => Video.updateOne(
    { youtubeVideoId: video.youtubeVideoId },
    {
      $set: {
        title: video.title,
        youtubeUrl: video.youtubeUrl,
        youtubeVideoId: video.youtubeVideoId,
        thumbnailUrl: video.thumbnailUrl,
        description: video.description,
        sourcePublishedAt: video.sourcePublishedAt,
        isPublished: true,
      },
      $setOnInsert: { isFeatured: false },
    },
    { upsert: true },
  )));

  lastYouTubeSyncAt = Date.now();
  return { skipped: false, synced: videos.length };
};

const syncYouTubeVideosIfNeeded = async () => {
  if (!getYouTubeFeedUrl()) return { skipped: true, synced: 0 };
  if (syncInFlight) return syncInFlight;
  if (Date.now() - lastYouTubeSyncAt < YOUTUBE_SYNC_INTERVAL_MS) return { skipped: true, synced: 0 };

  syncInFlight = syncYouTubeVideos().finally(() => {
    syncInFlight = null;
  });

  return syncInFlight;
};

export const getVideos = async (req, res, next) => {
  try {
    await syncYouTubeVideosIfNeeded().catch((error) => {
      console.warn('YouTube video sync skipped:', error.message);
    });

    const videos = await Video.find({ isPublished: true })
      .sort({ isFeatured: -1, sourcePublishedAt: -1, createdAt: -1 })
      .limit(12);
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const { title, youtubeUrl, description, isFeatured } = req.body;
    const youtubeVideoId = extractVideoId(youtubeUrl);
    if (!youtubeVideoId) return res.status(400).json({ message: 'Invalid YouTube URL.' });

    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
    const video = await Video.create({ title, youtubeUrl, youtubeVideoId, thumbnailUrl, description, isFeatured });
    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
};

export const syncLatestVideos = async (req, res, next) => {
  try {
    const result = await syncYouTubeVideos();
    const videos = await Video.find({ isPublished: true })
      .sort({ isFeatured: -1, sourcePublishedAt: -1, createdAt: -1 })
      .limit(12);

    res.json({ ...result, videos });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ message: 'Video not found.' });
    res.json(video);
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted.' });
  } catch (error) {
    next(error);
  }
};

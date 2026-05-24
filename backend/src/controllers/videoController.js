import Video from '../models/Video.js';

const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ isPublished: true })
      .sort({ isFeatured: -1, createdAt: -1 })
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

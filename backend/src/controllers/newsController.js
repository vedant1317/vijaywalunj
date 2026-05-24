import News from '../models/News.js';

const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

export const getNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const filter = { isPublished: true };
    const total = await News.countDocuments(filter);
    const news = await News.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-content -__v');
    res.json({ total, page: Number(page), news });
  } catch (error) {
    next(error);
  }
};

export const getNewsById = async (req, res, next) => {
  try {
    const news = await News.findOne({ slug: req.params.slug, isPublished: true });
    if (!news) return res.status(404).json({ message: 'News not found.' });
    res.json(news);
  } catch (error) {
    next(error);
  }
};

export const createNews = async (req, res, next) => {
  try {
    const { title, summary, content, imageUrl, sourceUrl, category, publishedAt } = req.body;
    const news = await News.create({
      title, summary, content, imageUrl, sourceUrl, category,
      slug: slugify(title),
      publishedAt: publishedAt || new Date(),
    });
    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (req, res, next) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ message: 'News not found.' });
    res.json(news);
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (req, res, next) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted.' });
  } catch (error) {
    next(error);
  }
};

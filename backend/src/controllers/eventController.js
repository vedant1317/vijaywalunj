import EventPage from '../models/EventPage.js';

export const getEventPage = async (req, res, next) => {
  try {
    const event = await EventPage.findOne({ type: req.params.type, isPublished: true });
    if (!event) return res.status(404).json({ message: 'Event page not found.' });
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const upsertEventPage = async (req, res, next) => {
  try {
    const event = await EventPage.findOneAndUpdate(
      { type: req.params.type },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(event);
  } catch (error) {
    next(error);
  }
};

import Contact from '../models/Contact.js';

export const getContacts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const contacts = await Contact.find(filter).sort({ isEmergency: -1, sortOrder: 1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ message: 'Contact not found.' });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted.' });
  } catch (error) {
    next(error);
  }
};

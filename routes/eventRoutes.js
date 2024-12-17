const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel'); // Adjust path if necessary

router.post('/', async (req, res) => {
  const { name, date, description } = req.body;
  if (!name || !date || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEvent = new Event({ name, date, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error while creating event' });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error while fetching events' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, description } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date, description },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error while updating event' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error while deleting event' });
  }
});

module.exports = router;

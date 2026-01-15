const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

router.post('/messages', auth, async (req, res) => {
  const { receiverId, message } = req.body;
  try {
    const newMessage = new Message({ senderId: req.userId, receiverId, message });
    await newMessage.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/messages', auth, async (req, res) => {
  try {
    const { with: withUser } = req.query;
    if (withUser) {
      const messages = await Message.find({
        $or: [
          { senderId: req.userId, receiverId: withUser },
          { senderId: withUser, receiverId: req.userId }
        ]
      }).populate('senderId', 'name email').populate('receiverId', 'name email').sort({ timestamp: 1 });
      res.json(messages);
    } else {
      // For conversation list, get unique users
      const sent = await Message.find({ senderId: req.userId }).distinct('receiverId');
      const received = await Message.find({ receiverId: req.userId }).distinct('senderId');
      const userIds = [...new Set([...sent, ...received])];
      const users = await require('../models/User').find({ _id: { $in: userIds } }, 'name email');
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
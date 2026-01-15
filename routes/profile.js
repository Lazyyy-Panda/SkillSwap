const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');
const auth = require('../middleware/auth');

// router.post('/profile', auth, async (req, res) => {
//   const { skillsOffer, interests, skillsLearn } = req.body;
//   try {
//     const profile = new Profile({ userId: req.userId, name: '', skillsOffer, interests, skillsLearn });
//     await profile.save();
//     res.status(201).json({ success: true, profileId: profile._id });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/profile', auth, async (req, res) => {
  const { skillsOffer, interests, skillsLearn } = req.body;
  try {
    // Get user details first
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    
    // Create or update profile
    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { 
        userId: req.userId,
        name: user.name, // Use name from User model
        skillsOffer: skillsOffer || [],
        interests: interests || [],
        skillsLearn: skillsLearn || []
      },
      { 
        new: true, // Return updated document
        upsert: true, // Create if doesn't exist
        runValidators: true
      }
    ).populate('userId', 'name email');
    
    res.status(201).json({ 
      success: true, 
      message: 'Profile saved successfully',
      profile: profile
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

router.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate('userId', 'name email');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profiles/search', async (req, res) => {
  const { skill } = req.query;
  try {
    const profiles = await Profile.find({ skillsOffer: { $regex: skill, $options: 'i' } }).populate('userId', 'name email');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/profile/me', auth, async (req, res) => {
  try {
    // First check if user exists
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    
    // Find profile by userId
    const profile = await Profile.findOne({ userId: req.userId })
      .populate('userId', 'name email');
    
    if (!profile) {
      // Create a default profile if doesn't exist
      const newProfile = new Profile({
        userId: req.userId,
        name: user.name,
        skillsOffer: [],
        interests: [],
        skillsLearn: []
      });
      
      await newProfile.save();
      
      const populatedProfile = await Profile.findById(newProfile._id)
        .populate('userId', 'name email');
      
      return res.json(populatedProfile);
    }
    
    // Update profile name if user name changed
    if (profile.name !== user.name) {
      profile.name = user.name;
      await profile.save();
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Error in GET /profile/me:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

router.delete('/profile', auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ userId: req.userId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
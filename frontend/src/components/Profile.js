import React, { useState } from 'react';
import API_BASE from '../api';

const Profile = () => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [skillsToLearn, setSkillsToLearn] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Not logged in');
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          skills: skills.split(',').map(s => s.trim()),
          interests: interests.split(',').map(s => s.trim()),
          skillsToLearn: skillsToLearn.split(',').map(s => s.trim())
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Profile created successfully!');
      } else {
        setMessage(data.message || 'Error creating profile');
      }
    } catch (error) {
      setMessage('Network error');
    }
  };

  return (
    <div className="page fade-in">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Interests (comma separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Skills to Learn (comma separated)"
          value={skillsToLearn}
          onChange={(e) => setSkillsToLearn(e.target.value)}
          required
        />
        <button type="submit">Create Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
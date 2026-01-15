import React, { useState } from 'react';
import API_BASE from '../api';

const Dashboard = ({ setView }) => {
  const [skillsOffer, setSkillsOffer] = useState('');
  const [interests, setInterests] = useState('');
  const [skillsLearn, setSkillsLearn] = useState('');
  const [message, setMessage] = useState('');
  const handleDeleteProfile = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE}/profile`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.reload(); // Or setView to welcome
      } else {
        setMessage('Error deleting profile');
      }
    } catch (error) {
      setMessage('Network error');
    }
  };

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
          skillsOffer: skillsOffer.split(',').map(s => s.trim()),
          interests: interests.split(',').map(s => s.trim()),
          skillsLearn: skillsLearn.split(',').map(s => s.trim())
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
    <article style={{ maxWidth: '800px', margin: '0 auto' }} className="fade-in">
      <h1>My Dashboard</h1>
      <p>Connect with peers, share skills, and learn together.</p>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Skills I can offer (comma separated)"
          value={skillsOffer}
          onChange={(e) => setSkillsOffer(e.target.value)}
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
          placeholder="Skills I want to learn (comma separated)"
          value={skillsLearn}
          onChange={(e) => setSkillsLearn(e.target.value)}
          required
        />
        <button type="submit">Save Profile</button>
      </form>
      {message && <p>{message}</p>}
      <div className="dashboard-buttons">
        {/* <button onClick={() => setView('my_profile')}>My Profile</button> */}
        <button onClick={() => setView('explore')}>Explore Profiles</button>
        <button onClick={() => setView('messages')}>My Messages</button>
        <button onClick={handleDeleteProfile} style={{ background: 'red' }}>Delete Profile</button>
      </div>
    </article>
  );
};

export default Dashboard;
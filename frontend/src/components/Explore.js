import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const Explore = ({ setView, setSelectedReceiver }) => {
  const [profiles, setProfiles] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [message, setMessage] = useState('');

  const fetchProfiles = async (skill = '') => {
    try {
      const url = skill ? `${API_BASE}/profiles/search?skill=${encodeURIComponent(skill)}` : `${API_BASE}/profiles`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const currentUserId = localStorage.getItem('userId');
        const filtered = data.filter(profile => profile.userId._id !== currentUserId);
        setProfiles(filtered);
      } else {
        setMessage('Error fetching profiles');
      }
    } catch (error) {
      setMessage('Network error');
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSearch = () => {
    fetchProfiles(searchSkill);
  };

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto' }} className="fade-in">
      <h1>Explore Profiles</h1>
      <div>
        <input
          type="text"
          placeholder="Search by skills"
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => { setSearchSkill(''); fetchProfiles(); }}>Show All</button>
      </div>
      {message && <p>{message}</p>}
      <div className="profiles-container">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <h3>{profile.userId.name}</h3>
            <p>Email: {profile.userId.email}</p>
            <p>Skills I can offer: {profile.skillsOffer.join(', ')}</p>
            <p>Interests: {profile.interests.join(', ')}</p>
            <p>Skills I want to learn: {profile.skillsLearn.join(', ')}</p>
            <button onClick={() => { setSelectedReceiver({ id: profile.userId._id, name: profile.userId.name }); setView('messages'); }}>Message</button>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Explore;
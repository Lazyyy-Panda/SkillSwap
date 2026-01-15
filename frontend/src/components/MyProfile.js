import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const MyProfile = ({ setView }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/profile/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setError('');
      } else if (response.status === 404) {
        setError('Profile not found. Please create your profile first.');
        setProfile(null);
      } else {
        setError('Failed to load profile');
        setProfile(null);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '40px 20px',
        textAlign: 'center',
        color: '#333'
      }}>
        <h1>My Profile</h1>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px'
    }}>
      <div style={{ 
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '30px',
        color: '#333'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ margin: 0 }}>My Profile</h1>
          <button 
            onClick={() => setView('dashboard')}
            style={{
              background: 'transparent',
              color: '#9c27b0',
              border: '1px solid #9c27b0',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ 
            marginBottom: '30px',
            padding: '15px',
            background: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid rgba(220, 53, 69, 0.3)',
            borderRadius: '8px',
            color: '#ffa8a8'
          }}>
            <p style={{ margin: 0 }}>{error}</p>
            <button 
              onClick={() => setView('dashboard')}
              style={{
                background: 'linear-gradient(135deg, #9c27b0, #3f51b5)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Go to Dashboard to Create Profile
            </button>
          </div>
        )}

        {/* Profile Data */}
        {profile && (
          <div>
            {/* Personal Information */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#9c27b0', marginBottom: '15px' }}>Personal Information</h2>
              <div style={{ 
                background: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#666', display: 'inline-block', width: '80px' }}>Name:</strong>
                  <span style={{ color: '#333' }}>
                    {profile.name || 'Not specified'}
                  </span>
                </div>
                <div>
                  <strong style={{ color: '#666', display: 'inline-block', width: '80px' }}>Email:</strong>
                  <span style={{ color: '#333' }}>
                    {profile.userId?.email || 'Not available'}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills I Can Offer */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#9c27b0', marginBottom: '15px' }}>Skills I Can Offer</h2>
              <div style={{ 
                background: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px',
                minHeight: '60px'
              }}>
                {profile.skillsOffer && profile.skillsOffer.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {profile.skillsOffer.map((skill, index) => (
                      <span 
                        key={index}
                        style={{
                          background: 'linear-gradient(135deg, #9c27b0, #3f51b5)',
                          color: 'white',
                          padding: '8px 15px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#666', fontStyle: 'italic', margin: 0 }}>
                    No skills added yet
                  </p>
                )}
              </div>
            </div>

            {/* Interests */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#9c27b0', marginBottom: '15px' }}>My Interests</h2>
              <div style={{ 
                background: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px',
                minHeight: '60px'
              }}>
                {profile.interests && profile.interests.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {profile.interests.map((interest, index) => (
                      <span 
                        key={index}
                        style={{
                          background: 'linear-gradient(135deg, #ff9800, #ff5722)',
                          color: 'white',
                          padding: '8px 15px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#666', fontStyle: 'italic', margin: 0 }}>
                    No interests added yet
                  </p>
                )}
              </div>
            </div>

            {/* Skills I Want to Learn */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#9c27b0', marginBottom: '15px' }}>Skills I Want to Learn</h2>
              <div style={{ 
                background: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px',
                minHeight: '60px'
              }}>
                {profile.skillsLearn && profile.skillsLearn.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {profile.skillsLearn.map((skill, index) => (
                      <span 
                        key={index}
                        style={{
                          background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
                          color: 'white',
                          padding: '8px 15px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#666', fontStyle: 'italic', margin: 0 }}>
                    No skills to learn added yet
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: '15px',
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: '1px solid #ddd'
            }}>
              <button 
                onClick={() => setView('dashboard')}
                style={{
                  background: 'linear-gradient(135deg, #9c27b0, #3f51b5)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Edit Profile
              </button>
              <button 
                onClick={() => setView('explore')}
                style={{
                  background: 'transparent',
                  color: '#9c27b0',
                  border: '1px solid #9c27b0',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Explore Other Profiles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
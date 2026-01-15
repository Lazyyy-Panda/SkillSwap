import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import Messages from './components/Messages';
import MyProfile from './components/MyProfile';

function App() {
  const [view, setView] = useState('welcome');
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setView('dashboard');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setView('welcome');
  };

  return (
    <div className="App">
      {view === 'welcome' && (
        <div className="fade-in">
          <section id="hero" style={{ textAlign: 'center',minHeight: '60vh', padding: '220px 20px', background: 'linear-gradient(135deg, #9c27b0, #3f51b5)', color: '#f5f5f5' }}>
            <h1 style={{ color: '#f5f5f5' }}>SkillSwap</h1>
            <h2 style={{ color: '#f5f5f5' }}>Dive Into The Skill Exchange World</h2>
            <p>Connect with peers, share skills, and learn together in our community platform.</p>
            <div className="auth-buttons">
              <button onClick={() => setView('login')}>Login</button>
              <button onClick={() => setView('register')}>Register</button>
            </div>
          </section>
          <section id="services" style={{ padding: '50px 20px', background: '#f5f5f5', color: '#333' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>We Provide Different Services & Features</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', maxWidth: '300px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#9c27b0' }}>Skill Matching</h3>
                <p style={{ color: '#555' }}>Find users with skills you want to learn and offer your expertise.</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', maxWidth: '300px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#9c27b0' }}>Messaging</h3>
                <p style={{ color: '#555' }}>Communicate directly with other users to arrange exchanges.</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', maxWidth: '300px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#9c27b0' }}>Community</h3>
                <p style={{ color: '#555' }}>Join a network of learners and teachers in various fields.</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', maxWidth: '300px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#9c27b0' }}>Profiles</h3>
                <p style={{ color: '#555' }}>Create detailed profiles showcasing your skills and interests.</p>
              </div>
            </div>
          </section>
          <section id="contact" style={{ padding: '50px 20px', background: '#f5f5f5', color: '#333', textAlign: 'center' }}>
            <h2>Contact Us & Get In Touch</h2>
            <p>Have questions? Reach out to us.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '20px' }}>
              <div>
                <p>📞 +91 7020185052</p>
                <p>📧 infoskillswap@gmail.com</p>
                <p>🏠BMSCE, Bengaluru</p>
              </div>
            </div>
          </section>
        </div>
      )}
      {view === 'login' && (
        <div>
          <button onClick={() => setView('welcome')}>Back</button>
          <Login onSuccess={() => setView('dashboard')} />
        </div>
      )}
      {view === 'register' && (
        <div>
          <button onClick={() => setView('welcome')}>Back</button>
          <Signup onSuccess={() => setView('login')}/>
        </div>
      )}
      {view === 'dashboard' && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Dashboard setView={setView} />
        </div>
      )}
      {view === 'explore' && (
        <div>
          <button onClick={() => setView('dashboard')}>Back to Dashboard</button>
          <Explore setView={setView} setSelectedReceiver={setSelectedReceiver} />
        </div>
      )}
      {view === 'messages' && (
        <div>
          <button onClick={() => setView('dashboard')}>Back to Dashboard</button>
          <Messages setView={setView} selectedReceiver={selectedReceiver} />
        </div>
      )}
      {view === 'my_profile' && (
        <div>
          <button onClick={() => setView('dashboard')}>Back to Dashboard</button>
          <MyProfile setView={setView} selectedReceiver={selectedReceiver} />
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import API_BASE from '../api';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_BASE}/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage('User registered successfully!');
//       } else {
//         setMessage(data.message || 'Error registering user');
//       }
//     } catch (error) {
//       setMessage('Network error');
//     }
//   };

//   return (
//     <article style={{ maxWidth: '800px', margin: '0 auto' }} className="fade-in">
//       <h1>Signup for SkillSwap</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//       {message && <p>{message}</p>}
//     </article>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import API_BASE from '../api';
import './Signup.css';

const Signup = ({ onSuccess }) => {  // Add onSuccess prop
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ 
          text: 'Account created successfully! Redirecting to login...', 
          type: 'success' 
        });
        // Clear form on success
        setName('');
        setEmail('');
        setPassword('');
        
        // 2-second delay to show success message, then redirect to login
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();  // Call the callback to switch to login view
          }
        }, 2000);
      } else {
        setMessage({ 
          text: data.message || 'Error registering user', 
          type: 'error' 
        });
      }
    } catch (error) {
      setMessage({ 
        text: 'Network error. Please check your connection.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container fade-in">
      <div className="signup-box">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.type === 'success' ? 'success' : ''}`}>
            {message.text}
          </div>
        )}
        
        <div className="info-note">
          <p>Already have an account?</p>
          <p>Please use the login option instead.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
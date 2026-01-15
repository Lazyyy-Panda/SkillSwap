// import React, { useState } from 'react';
// import API_BASE from '../api';

// const Login = ({ onSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage('Login successful!');
//         localStorage.setItem('token', data.token);
//         // Fetch user info
//         try {
//           const userResponse = await fetch(`${API_BASE}/me`, {
//             headers: { 'Authorization': `Bearer ${data.token}` }
//           });
//           const userData = await userResponse.json();
//           localStorage.setItem('userId', userData._id);
//         } catch (err) {
//           console.error('Error fetching user:', err);
//         }
//         onSuccess();
//       } else {
//         setMessage(data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       setMessage('Network error');
//     }
//   };

//   return (
//     <article style={{ maxWidth: '800px', margin: '0 auto' }} className="fade-in">
//       <h1>Login to SkillSwap</h1>
//       <form onSubmit={handleSubmit}>
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
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </article>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import API_BASE from '../api';
import './Login.css'; // Make sure to import the CSS file

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        localStorage.setItem('token', data.token);
        
        // Fetch user info
        try {
          const userResponse = await fetch(`${API_BASE}/me`, {
            headers: { 'Authorization': `Bearer ${data.token}` }
          });
          const userData = await userResponse.json();
          localStorage.setItem('userId', userData._id);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
        
        // Small delay to show success message before redirect
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        setMessage({ text: data.message || 'Invalid credentials', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container fade-in">
      <div className="login-box">
        <h1>Login to SkillSwap</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
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
            autoComplete="current-password"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.type === 'success' ? 'success' : ''}`}>
            {message.text}
          </div>
        )}
        
        <p style={{ 
          marginTop: '25px', 
          color: '#aaa', 
          fontSize: '14px',
          lineHeight: '1.5' 
        }}>
          Don't have an account?<br />
          Please use the register option instead.
        </p>
      </div>
    </div>
  );
};

export default Login;
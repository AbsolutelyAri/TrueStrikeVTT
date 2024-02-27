import React, { useState } from 'react';

const Authentication = () => {
  const [username, setUsername] = useState(''); // username state variable and setUsername function to update it
  const [password, setPassword] = useState(''); // password state variable and setPassword function to update it

  // Function to handle login button click
  const handleLogin = () => {
    // Here you can perform your login validation logic
    console.log("Username:", username); // Log the username to the console
    console.log("Password:", password); // Log the password to the console
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <button type="button" onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
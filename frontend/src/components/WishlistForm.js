import React, { useState } from 'react';

const WishlistForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setMessage('Invalid email address');
      return;
    }
    setMessage('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Join Our Wishlist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default WishlistForm;

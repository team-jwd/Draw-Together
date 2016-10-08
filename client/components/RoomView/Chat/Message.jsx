import React from 'react';

export default (props) => {
  const username = props.message.get('username');
  const text = props.message.get('text');
  
  return (
    <div className="message">
      <p>{username}: {text}</p>
    </div>
  );
};

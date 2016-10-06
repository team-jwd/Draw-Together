import React from 'react';

export default props =>
  <div id="joinRoomForm">
    <p>Join Room Form</p>
   
    <button onClick={() => {
      console.log('Clicked!');
      console.log(props.onSubmit); 
      props.onSubmit('test'); 
    }}> 
    
    Submit! 
    </button>
  </div>;

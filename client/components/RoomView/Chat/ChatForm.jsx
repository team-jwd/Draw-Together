import React from 'react';

export default (props) => {
  function textInput() {
    const text = document.getElementById('textSubmit').value;
    props.onChatMessageSubmit(text);
    // props.submit(document.getElementById('textSubmit').value);
    document.getElementById('textSubmit').value = '';
  }

  function submit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={submit}>
      <input id="textSubmit" type="text" placeholder="Send a message" />
      <button id="textButton" type="submit" onClick={textInput}>Send</button>
    </form>
  );
};

import React from 'react';

export default (props) => {
  function textInput() {
    const text = document.getElementById('textSubmit').value;
    props.onChatMessageSubmit(text);
  }

  function submit(e) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={submit}
      id="chat-form"
    >
      <input
        id="textSubmit"
        type="text"
        placeholder="Send a message"
        autoComplete="off"
      />
      <button
        id="textButton"
        type="submit"
        onClick={textInput}
      >
        Send
      </button>
    </form>
  );
};

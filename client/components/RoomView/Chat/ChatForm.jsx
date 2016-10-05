import React from 'react';

export default (props) => {
  function textInput() {
    props.submit(document.getElementById('textSubmit').value);
    document.getElementById('textSubmit').value = '';
  }
  return (
    <form>
      <input id="textSubmit" type="text" placeholder="Send a message" />
      <button id="textButton" type="submit" onClick={textInput}>Send</button>
    </form>
  );
};

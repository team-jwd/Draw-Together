import React from 'react';

export default props => {
  console.log(props.update);
  return(
    <div>
      <p> {props.update.state.test} </p>
      <button onClick={props.update}> Create Room </button>
    </div>
  );
};

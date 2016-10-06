import React from 'react';

export default props => {
  console.log(props.update);
  return(
    <div>
      <button onClick={props.update}> Create Room </button>
    </div>
  );
};

import React from 'react';

export default props =>
  <div className="card">
    <h4>{props.title}</h4>
    <img src={props.img} alt={props.alt} />
    <p>{props.description}</p>
  </div>;

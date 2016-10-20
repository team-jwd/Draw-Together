import React from 'react';

// export default props =>
//   <video
//     autoPlay
//     src={(props.source) ?
//         URL.createObjectURL(props.source) : ''}
//     id={props.id}
//   />;

class Video extends React.Component {

  shouldComponentUpdate() {
    console.log("don't update me bro!");

    return !this.props.source;
  }

  render() {
    return (
      <div>
        <video
          autoPlay
          src={(this.props.source) ?
              URL.createObjectURL(this.props.source) : ''}
          id={this.props.id}
        />;
      </div>
    );
  }
}

export default Video;

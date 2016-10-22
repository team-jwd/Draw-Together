import React from 'react';

class Video extends React.Component {

  shouldComponentUpdate() {
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
        />
      </div>
    );
  }
}

export default Video;

import React from 'react';
import ReactDOM from 'react-dom';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
      ctx: null,
      rect: null,
      prevX: null,
      prevY: null,
      mouseDown: false,
    };
  }

  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this);
    const ctx = canvas.getContext('2d');
    this.setState({
      canvas,
      ctx,
    });
  }

  startDraw(e) {
    const rect = this.state.canvas.getBoundingClientRect();
    const prevX = e.pageX - rect.left;
    const prevY = e.pageY - rect.top;
    this.setState({
      rect,
      prevX,
      prevY,
      mouseDown: true,
    });
  }

  newDraw(e) {
    if (this.state.mouseDown) {
      const x = e.pageX - this.state.rect.left;
      const y = e.pageY - this.state.rect.top;
      if (this.props.drawType === 'erase') {
        this.erase(x, y);
      } else {
        this.drawOnCanvas(this.state.prevX, this.state.prevY, x, y);
      }
      this.setState({
        prevX: x,
        prevY: y,
      });
    }
  }

  drawOnCanvas(pX, pY, cX, cY) {
    const ctx = this.state.ctx;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.props.strokeStyle;
    ctx.lineWidth = this.props.lineWidth;
    ctx.beginPath();
    ctx.moveTo(pX, pY);
    ctx.lineTo(cX, cY);
    ctx.stroke();
  }

  erase(x, y) {
    this.state.ctx.clearRect(x-8, y-8, 16, 16);
  }

  endDraw() {
    this.setState({
      mouseDown: false,
    });
  }

  render() {
    return (
      <canvas
        width="800px"
        height="700px"
        style={{ border: '1px solid black', cursor: 'crosshair' }}
        onMouseDown={this.startDraw.bind(this)}
        onMouseMove={this.newDraw.bind(this)}
        onMouseUp={this.endDraw.bind(this)}
        onMouseLeave={this.endDraw.bind(this)}
      />
    );
  }
}

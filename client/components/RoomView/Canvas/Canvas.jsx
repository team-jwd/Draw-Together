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
    const prevX = e.pageX - rect.left - document.body.scrollLeft;
    const prevY = e.pageY - rect.top - document.body.scrollTop;
    if (this.props.drawType === 'erase') {
      this.state.ctx.strokeStyle = 'white';
      this.state.ctx.beginPath();
      this.state.ctx.moveTo(prevX, prevY);
      this.state.ctx.lineTo(prevX, prevY);
      this.state.ctx.stroke();
    } else {
      this.state.ctx.strokeStyle = this.props.strokeStyle;
      this.state.ctx.beginPath();
      this.state.ctx.moveTo(prevX, prevY);
      this.state.ctx.lineTo(prevX, prevY);
      this.state.ctx.stroke();
    }
    this.setState({
      rect,
      prevX,
      prevY,
      mouseDown: true,
    });
  }

  newDraw(e) {
    if (this.state.mouseDown) {
      const x = e.pageX - this.state.rect.left - document.body.scrollLeft;
      const y = e.pageY - this.state.rect.top - document.body.scrollTop;

      // send relevant state info to connected clients in the room
      const drawState = {
        type: 'canvas',
        drawType: this.props.drawType,
        prevX: this.state.prevX,
        prevY: this.state.prevY,
        x,
        y,
        strokeStyle: this.props.strokeStyle,
        lineWidth: this.props.lineWidth,
      };

      this.props.sendDrawData(drawState);

      if (this.props.drawType === 'erase') {
        this.erase(this.state.prevX, this.state.prevY, x, y);
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

  erase(pX, pY, cX, cY) {
    const ctx = this.state.ctx;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = this.props.lineWidth;
    ctx.beginPath();
    ctx.moveTo(pX, pY);
    ctx.lineTo(cX, cY);
    ctx.stroke();
    // this.state.ctx.clearRect(x - (this.props.lineWidth), y - (this.props.lineWidth), this.props.lineWidth, this.props.lineWidth);
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

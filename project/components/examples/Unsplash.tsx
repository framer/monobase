import * as React from "react";
import { Dynamic } from "monobase";

class Unsplash extends React.Component<
  { width: number; height: number },
  { loaded: boolean }
> {
  state = { loaded: false };

  componentDidMount() {
    const image = new Image();
    image.src = this.imageUrl();
    image.onload = this.onImageLoad;
  }

  onImageLoad = () => {
    this.setState({ loaded: true });
  };

  imageUrl() {
    const size = `${this.props.width}x${this.props.height}`;
    return `//source.unsplash.com/random/${size}`;
  }

  render() {
    const base: React.CSSProperties = {
      display: "inline-block",
      width: this.props.width,
      height: this.props.height
    };

    const wrapperStyle: React.CSSProperties = {
      ...base,
      borderRadius: 8,
      overflow: "hidden",
      background: "rgb(220, 220, 220)",
      border: this.state.loaded ? null : "1px solid rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
      transition: "border .15s ease-in-out"
    };

    const imageStyle: React.CSSProperties = {
      ...base,
      background: `url('${this.imageUrl()}')`,
      opacity: this.state.loaded ? 1 : 0,
      transition: "opacity .15s ease-in-out"
    };

    return (
      <div style={wrapperStyle}>
        <div style={imageStyle} />
      </div>
    );
  }
}

export default Dynamic(Unsplash);

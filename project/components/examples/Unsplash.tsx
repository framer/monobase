import * as React from "react";
import { Dynamic } from "monobase";

class Unsplash extends React.Component<
  { width: number; height: number },
  { loaded: boolean }
> {
  state = { loaded: false };

  componentDidMount() {
    this.load();
  }

  load() {
    const image = new Image();
    image.src = this.imageUrl();
    image.onload = this.onImageLoad;
    image.onerror = this.onImageError;
  }

  onImageLoad = () => {
    this.setState({ loaded: true });
  };

  onImageError = () => {
    this.load();
  };

  imageUrl() {
    const randomId = Math.floor(Math.random() * 300);
    return `//picsum.photos/${Math.ceil(this.props.width)}/${Math.ceil(
      this.props.height
    )}/?image=${randomId}`;
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
      background: "rgb(220, 220, 220)"
    };

    const imageStyle: React.CSSProperties = {
      ...base,
      background: this.state.loaded ? `url('${this.imageUrl()}')` : null,
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

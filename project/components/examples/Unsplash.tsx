import * as React from "react";
import { Dynamic } from "monobase";

class Unsplash extends React.Component<
  { width: number; height: number },
  { loaded: boolean }
> {
  count = 0;
  state = { loaded: false };

  componentDidMount() {
    this.load();
  }

  load() {
    if (this.count > 3) return;
    this.count++;

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
    const s = 100;
    const randomId = Math.floor(Math.random() * 300);
    const width = Math.ceil(this.props.width || s * window.devicePixelRatio);
    const height = Math.ceil(this.props.height || s * window.devicePixelRatio);
    return `//picsum.photos/${width}/${height}/?image=${randomId}`;
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
      opacity: this.state.loaded ? 1 : 0,
      transition: "opacity .15s ease-in-out",
      backgroundImage: this.state.loaded ? `url('${this.imageUrl()}')` : null,
      backgroundSize: "100% 100%"
    };

    return (
      <div style={wrapperStyle}>
        <div style={imageStyle} />
      </div>
    );
  }
}

export default Dynamic(Unsplash);

import * as React from "react";
import Template from "components/Template";

const CanvasDefaults = {
  zoom: 1,
  width: window.innerWidth,
  height: window.innerHeight,
  children: []
};

const Canvas = (props: Partial<typeof FrameDefaults>) => {
  props = Object.assign({}, FrameDefaults, props);
  const style: React.CSSProperties = {
    position: "absolute",
    left: props.x,
    top: props.y,
    width: props.width,
    height: props.height,
    backgroundColor: props.backgroundColor
  };
  return <div style={style}>{props.children}</div>;
};

const FrameDefaults = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  backgroundColor: "rgba(255, 0, 0, 0.2)",
  children: []
};

const Frame = (props: Partial<typeof FrameDefaults>) => {
  props = Object.assign({}, FrameDefaults, props);
  const style: React.CSSProperties = {
    position: "absolute",
    left: props.x,
    top: props.y,
    width: props.width,
    height: props.height,
    backgroundColor: props.backgroundColor
  };
  return <div style={style}>{props.children}</div>;
};

function render(project) {
  return (
    <Template project={project}>
      <Frame />
    </Template>
  );
}

export default render;

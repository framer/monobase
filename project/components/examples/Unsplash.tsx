import * as React from "react";

export default function Unsplash(props: { width: number; height: number }) {
  return (
    <img
      src={`https://source.unsplash.com/random/${props.width}${props.height}`}
      style={{ borderRadius: 8 }}
      width={props.width}
      height={props.height}
    />
  );
}

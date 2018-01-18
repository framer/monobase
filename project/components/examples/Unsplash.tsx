import * as React from "react";

export default function Unsplash(props: { width: number; height: number }) {
  return (
    <img
      src={`https://source.unsplash.com/random/800x600`}
      style={{ borderRadius: 8 }}
      width={props.width}
      height={props.height}
    />
  );
}

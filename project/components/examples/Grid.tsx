import * as React from "react";

const Grid = (props: {
  width?: number;
  height?: number;
  columns?: number;
  rows?: number;
  gap?: number;
  cell?: (
    props: {
      key: string;
      index: number;
      row: number;
      column: number;
      width: number;
      height: number;
    }
  ) => JSX.Element;
}) => {
  // Make sure we have a good set of defaults
  props = Object.assign({}, GridDefaults, props);

  const size = {
    width: (props.width - (props.columns - 1) * props.gap) / props.columns,
    height: (props.height - (props.rows - 1) * props.gap) / props.rows
  };

  const cells = [];
  let index = 0;

  for (let column = 0; column < props.columns; column++) {
    for (let row = 0; row < props.rows; row++) {
      const style: React.CSSProperties = {
        position: "absolute",
        width: size.width,
        height: size.height,
        left: column * (size.width + props.gap),
        top: row * (size.height + props.gap)
        // transform: `
        //   translate(
        //     ${column * (size.width + props.gap)}px,
        //     ${row * (size.height + props.gap)}px)`
      };

      const cell = props.cell({
        ...size,
        key: `cell[${column}:${row}]`,
        index: index,
        column: column,
        row: row
      });

      cells.push(
        <div style={style} key={index}>
          {cell}
        </div>
      );
      index++;
    }
  }

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: props.width,
        height: props.height
      }}
    >
      {cells}
    </div>
  );
};

const GridDefaultCell = props => {
  return (
    <div
      style={{
        ...props,
        border: "1px solid lightgrey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <span style={{ font: "11px/1em Menlo", color: "lightgrey" }}>
        {props.column} x {props.row}
      </span>
    </div>
  );
};

const GridDefaults = {
  width: 400,
  height: 300,
  columns: 4,
  rows: 3,
  gap: 10,
  cell: GridDefaultCell
};

export default Grid;

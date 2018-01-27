import * as React from "react";
import { Dynamic } from "monobase";
import { pill } from "components/theme";
import { ReactNode } from "react";

class Visible extends React.Component<
  { visible: boolean; inset: Frame | number; children?: ReactNode },
  { visible: boolean }
> {
  state = {
    visible: true
  };

  static defaultProps = {
    visible: true,
    inset: 0
  };

  componentDidMount() {
    this.update();
    manager.add(this);
  }

  viewRect() {
    return inset(
      {
        top: 0,
        left: 0,
        bottom: window.innerHeight,
        right: window.innerWidth
      },
      this.props.inset
    );
  }

  update() {
    const el: HTMLDivElement = this.refs.el as any;
    const rect = el.getBoundingClientRect();
    const visible = intersect(rect, this.viewRect());

    if (this.state.visible != visible) {
      this.setState({ visible: visible });
    }
  }

  render() {
    const style = {
      visibility: this.state.visible ? "" : "hidden"
    };

    return (
      <div ref="el" style={style}>
        {this.props.children}
      </div>
    );
  }
}

class Manager {
  visibles = new Set<Visible>();

  add(visible: Visible) {
    if (this.visibles.size === 0) {
      window.addEventListener("scroll", this.update);
      window.addEventListener("resize", this.update);
    }
    this.visibles.add(visible);
  }

  remove(visible: Visible) {
    this.visibles.delete(visible);
  }

  update = throttle(() => {
    this.visibles.forEach(item => item.update());
  }, 100);
}

const manager = new Manager();

type Frame = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

const inset = (frame: Frame, inset: number | Frame) => {
  if (typeof inset === "number") {
    inset = { top: inset, right: inset, bottom: inset, left: inset };
  }

  return {
    left: frame.left + inset.left,
    top: frame.top + inset.top,
    right: frame.right - inset.right,
    bottom: frame.bottom - inset.bottom
  };
};

function intersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function throttle(callback: () => void, limit: number) {
  var wait = false;
  return () => {
    if (!wait) {
      callback();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

export default Dynamic(Visible);

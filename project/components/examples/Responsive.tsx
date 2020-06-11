import * as React from "react";
import { Dynamic } from "monobase";

function getClasses() {
  return {
    size: window.innerWidth < 768 ? "mobile" : "desktop",
    orientation:
      window.innerWidth > window.innerHeight ? "landscape" : "portrait",
  };
}

function Responsive() {
  const [classes, setClasses] = React.useState({
    size: "desktop",
    orientation: "landscape",
  });

  React.useEffect(() => {
    if (!window) return;

    function handleResize() {
      if (!window.document?.body) return;
      window.document.body.classList.remove("mobile", "desktop");

      const newClasses = getClasses();

      window.document.body.classList.add(newClasses.size);
      window.document.body.setAttribute("data-size", newClasses.size);
      setClasses(newClasses);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return null;
}

export default Dynamic(Responsive);

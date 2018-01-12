import * as React from "react";

function Link(props) {
  return <a href="">{props.children}</a>;
}

function Header(props) {
  return (
    <div>
      <Link>Home</Link>
      <Link>About</Link>
      <Link>Contact</Link>
    </div>
  );
}

export default Header;

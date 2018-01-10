import * as React from "react";

const Link = props => {
  return <a href="">{props.children}</a>;
};

const Header = props => {
  return (
    <div>
      <Link>Home</Link>
      <Link>About</Link>
      <Link>Contact</Link>
    </div>
  );
};

export default Header;

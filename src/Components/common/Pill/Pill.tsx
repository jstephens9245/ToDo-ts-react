import React from "react";
import "./Pill.scss";

const Pill: React.FC = props => {
  return <span className="pill">{props.children}</span>;
};

export default Pill;

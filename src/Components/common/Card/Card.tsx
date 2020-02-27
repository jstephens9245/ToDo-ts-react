import React from "react";
import "./Card.scss";

interface Props {
  id?: string;
  className?: string;
}

const ButtonPrimary: React.FunctionComponent<Props> = (
  props
): React.ReactElement => {
  let className = "card";

  if (props.className) {
    className = className.concat(` ${props.className}`);
  }

  return (
    <div id={props.id} className={className}>
      {props.children}
    </div>
  );
};

export default ButtonPrimary;

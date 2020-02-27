import React from "react";
import ButtonPrimary from "../../common/ButtonPrimary/ButtonPrimary";
import ButtonPrimaryProps from "../../../types/ButtonPrimaryProps";
import "./ButtonPrimaryPlainText.scss";

const ButtonPrimaryPlainText = (props: ButtonPrimaryProps) => {
  return (
    <ButtonPrimary
      id={props.id}
      className={props.className? `${props.className} plain-text-btn` : 'plain-text-btn'}
      target={props.target}
      to={props.to}
      href={props.href}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </ButtonPrimary>
  );
};

export default ButtonPrimaryPlainText;

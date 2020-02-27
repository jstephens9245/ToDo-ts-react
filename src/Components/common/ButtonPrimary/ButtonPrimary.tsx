import React from "react";
import { Link } from "react-router-dom";
import "./ButtonPrimary.scss";
import ButtonPrimaryProps from "../../../types/ButtonPrimaryProps";

const ButtonPrimary: React.FunctionComponent<ButtonPrimaryProps> = (
  props: ButtonPrimaryProps
): React.ReactElement => {
  // If an 'href' property is supplied, we treat this as a link to an external page
  // and render an anchor
  if (props.hasOwnProperty("href") && props.href) {
    return (
      <a
        href   = {props.href}
        target = {props.target}
        rel    = {props.target === "_blank" ? "noopener noreferrer" : undefined}
      >
        <button
          id                    = {props.id}
          type                  = "button"
          tabIndex              = {-1}
          disabled              = {props.disabled}
          onClick               = {props.onClick}
          data-track            = {props.dataTrack}
          data-track-detail     = {props.dataTrackDetail}
          data-track-action     = {props.dataTrackAction}
          data-track-sub-action = {props.dataTrackSubAction}
          className             = {
            props.className ? `btn-primary ${props.className}`: "btn-primary"
          }
        >
          {props.children}
        </button>
      </a>
    );
  }
  if (props.hasOwnProperty("to") && props.to) {
    // If a 'to' property is supplied, render a Link component to route the user within the app instead
    return (
      <Link to={props.to}>
        <button
          id                    = {props.id}
          type                  = "button"
          tabIndex              = {-1}
          disabled              = {props.disabled}
          onClick               = {props.onClick}
          data-track            = {props.dataTrack}
          data-track-detail     = {props.dataTrackDetail}
          data-track-action     = {props.dataTrackAction}
          data-track-sub-action = {props.dataTrackSubAction}
          className             = {
            props.className ? `btn-primary ${props.className}`: "btn-primary"
          }
        >
          {props.children}
        </button>
      </Link>
    );
  }
  if (props.hasOwnProperty("onClick") && props.onClick) {
    return (
      <button
        id                    = {props.id}
        type                  = "button"
        onClick               = {props.onClick}
        disabled              = {props.disabled}
        data-track            = {props.dataTrack}
        data-track-detail     = {props.dataTrackDetail}
        data-track-action     = {props.dataTrackAction}
        data-track-sub-action = {props.dataTrackSubAction}
        className             = {
          props.className ? `btn-primary ${props.className}`: "btn-primary"
        }
      >
        {props.children}
      </button>
    );
  }
  throw new Error(
    `ButtonPrimary.tsx: this component requires either an 'href' attribute (for links to external pages), a 'to' attribute (for links to pages within this app), or an 'onClick' click handler.`
  );
};

export default ButtonPrimary;

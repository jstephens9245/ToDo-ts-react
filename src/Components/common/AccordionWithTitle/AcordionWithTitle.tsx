import React, { FunctionComponent } from "react";
import Accordion from "../Accordion/Acordion";
import "./AccordionWithTitle.scss";

interface AccordionWithTitleProps {
  headingText: string;
  icon?: React.ReactElement;
  className?: string;
  includeConnectingLine?: boolean;
}

const AccordionWithTitle: FunctionComponent<AccordionWithTitleProps> = (
  props: React.PropsWithChildren<AccordionWithTitleProps>
): React.ReactElement => {
  const heading = (
    <h4 className="accordion-with-title__title">{props.headingText}</h4>
  );

  return (
    <Accordion
      className={`accordion-with-title ${
        props.className ? props.className : ""
      }`}
      icon={props.icon}
      includeConnectingLine={props.includeConnectingLine}
      heading={heading}
    >
      {props.children}
    </Accordion>
  );
};

export default AccordionWithTitle;

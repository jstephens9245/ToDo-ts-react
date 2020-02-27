import React, { useState, useEffect } from "react";
import chevronIcon from "../../../assets/chevron-down-grey.svg";
import "./Accordion.scss";

interface AccordionProps {
  heading: JSX.Element | JSX.Element[];
  className?: string;
  icon?: JSX.Element;
  includeConnectingLine?: boolean;
  open?: boolean;
  includeChevron?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  heading,
  className = "",
  icon,
  includeConnectingLine,
  open,
  includeChevron,
  children
}): React.ReactElement => {
  const contentsRef = React.createRef<HTMLDivElement>();

  const [accordionOpen, setAccordionOpen] = useState(!!open);

  // To smoothly animate the opening/closing of this modal, we need to set the maxHeight of the contents element
  // when it is rendered (this is because the height property cannot be animated from 0 to 100%, only fixed values
  // are animated)

  useEffect((): void => {
    if (contentsRef.current && accordionOpen) {
      contentsRef.current.style.maxHeight = `${
        contentsRef.current.scrollHeight
      }px`;
      setTimeout(() => {
        let e = document.getElementsByClassName("contents-open") as HTMLCollection;
        for (let index = 0; index < e.length; index++) {
          const el = e[index] as any;
          if(el.style.overflow !== "visible") {
            el.style.overflow = "visible";
          }
        }
      }, 500);
    } else if (contentsRef.current && !accordionOpen) {
      contentsRef.current.style.maxHeight = "0px";
      contentsRef.current.style.overflow = "hidden";
    } else {
      throw new Error(`Accordion.tsx: contentsRef is ${typeof contentsRef}!`);
    }
  }, [accordionOpen, contentsRef]);


  const toggleAccordion = (): void => {
    setAccordionOpen(!accordionOpen);
  };

  let customClassName = `accordion ${className}`;

  if (accordionOpen) {
    customClassName = customClassName.concat(" open");
  }

  let connectingLineContent = null;

  if (includeConnectingLine && icon) {
    connectingLineContent = <div className="connecting-line" />;
  }

  let iconContent = null;

  if (icon) {
    iconContent = (
      <div
        className="icon-container"
        aria-hidden="true"
        onClick={toggleAccordion}
      >
        {icon}
      </div>
    );
  } else {
    customClassName = customClassName.concat(" no-icon");
  }

  function compileTest(){
    let elements = document.getElementsByTagName("contents-open");
    for(let element of elements as any){
      console.log(element);
      element.style.overflow = "visible";
    }
  }

  return (
    <div className={customClassName}>
      {iconContent}
      {/* We disable the a11y eslint rules for the clickable header because it is readable by a screen reader as-is */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="heading"
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
      >
        <div className="accordion_header_custom-content">{heading}</div>

        {includeChevron ? (
          <img
            className="accordion__header__chevron"
            src={chevronIcon}
            alt=""
          />
        ) : null}
      </div>

      <div className="connecting-line-container">{connectingLineContent}</div>
          <div className={customClassName.indexOf("open") !== -1 ? "contents-open":"contents"} ref={contentsRef}>
            {children}
          </div>
    </div>
  );
};

export default Accordion;
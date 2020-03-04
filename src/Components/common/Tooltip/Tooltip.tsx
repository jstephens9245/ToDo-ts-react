import React from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import './Tooltip.scss';

interface Props {
  tooltipBody   : any | JSX.Element | JSX.Element[];
  children      : any;
  eventTrigger? : string;
  className?    : string;

  // this a Calendar component specific variable
  selectedDay?  : any
}

const Tooltip: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {
  const [hovering, setHovering] = React.useState(false);
  const [selectedDayChange, setSelectedDayChange] = React.useState(undefined);

  // this closes the calendar after a date has been selected while not if a user selects an unavailable date
  if(selectedDayChange !== props.selectedDay) {
    setSelectedDayChange(props.selectedDay)
    setHovering(false);
  }

  const onMouseOver = () => setHovering(true);
  const onMouseOut = () => setHovering(false);

  if(props.eventTrigger === "click") {
    window.addEventListener('click', function(e){
      const check = document.getElementById('clickbox') as any
      if (hovering && check !== null && !check.contains(e.target)){
        setHovering(false);
      }
    });
  }

  // determines which tooltip type click/hover will be used
  const tooltipEventType = () => {
    return props.eventTrigger === "click" ? (
      <div className={`${props.className}-tooltip`}
      onClick={e => {
        setHovering(!hovering)
        e.stopPropagation()
      }}
      > {props.children}
        {hovering === true && (
          <>
            <div id="clickbox" className="content" onClick={e => {e.stopPropagation()}}>{props.tooltipBody}</div>
              </>
            )}
      </div>
    )
    :
    (
      <Tippy content={<span>{props.tooltipBody}</span>} className="ted-theme">
      <div className="tooltip-body">{props.children}</div>
    </Tippy>

    )
  }

  return (
    <>
    {tooltipEventType()}
    </>
  );
};

export default Tooltip;

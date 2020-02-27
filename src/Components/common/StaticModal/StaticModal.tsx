import React, { useState } from "react";
import "./StaticModal.scss"

export const StaticModal: React.FC<{
  open: boolean;
  heading?: string;
  text?: string;
  className?: string;
  buttonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}> = ({
  open = true,
  heading = "",
  text =  "No messae to show",
  className = "",
  buttonText = "OK",
  onCancel,
  onConfirm
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(open);
  const [toggleClass, setToggleClass] = useState(className)

  return (
    <div
      className={`static-modal ${isOpen ? `open` : ``}`}
      onClick={() => setIsOpen(false)}
    >
      <div className="contents">
        <div className="heading">
          {heading}
          <button className="static-modal__close-button" />
        </div>
        <div className="text">
          <p dangerouslySetInnerHTML={{ __html: text }}></p>
          <div>
            {heading === "Before you go" ? (
              <>
                <button onClick={onConfirm} className="btn-primary onConfirm-btn">{buttonText}</button>
                <button onClick={onCancel} className="btn-primary">Cancel</button>
              </>):(<>
                <button onClick={() => {setIsOpen(!isOpen)}} className="btn-primary">{buttonText}</button>
              </>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
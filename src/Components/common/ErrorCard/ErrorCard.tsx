import React from "react";
import Card from "../Card/Card";
import "./ErrorCard.scss";

const ErrorCard: React.FC<{}> = ({ children }) => {
  return <Card className="error-card">{children}</Card>;
};

export default ErrorCard;

import React from "react";
import Card from "../Card/Card";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";

interface Props {
  className: string;
}

const ContactUsCard: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  return (
    <Card className={props.className}>
      <h2>Contact Us</h2>
      <p>Do you need an answer to a specific question? Please contact us.</p>
      <ButtonPrimary to="/contact-us">Contact Us</ButtonPrimary>
    </Card>
  );
};

export default ContactUsCard;

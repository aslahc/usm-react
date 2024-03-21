import React from "react";

import classes from "./Card.module.css";

function Card({ children }) {
  return <div className={classes['login-card']}>{children}</div>;
}

export default Card;

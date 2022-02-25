import React, { Fragment } from "react";
import classes from "./overlay.module.css";

function Overlay({ show = false, text, children }) {
  return (
    <Fragment>
      <div className={`${classes.overlay} ${show && classes.show}`}>
        {text ? text : "Loading, Please wait..."}
      </div>
      {children}
    </Fragment>
  );
}

export default Overlay;

import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverLay = (props) => {
  return (
    <div className={classes.modal}>

      {/* props.children is the content passed for opening and closing cart overlay */}
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>

      {/* Creating portal */}
      {ReactDOM.createPortal(<Backdrop 
      onClose={props.onClose} 
      />, portalElement)}

      {ReactDOM.createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,
        portalElement
      )}

    </Fragment>
  );
};

export default Modal;

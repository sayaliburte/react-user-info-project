import React from "react";
import { Modal} from "@material-ui/core";
/*This is reusable ModalComponent */
const ModalComponent = (props) => {
  return (
    <Modal open={props.open} >
      {props.children}
    </Modal>
  );
};
export default ModalComponent;

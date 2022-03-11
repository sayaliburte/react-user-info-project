import React from "react";
import { Modal} from "@material-ui/core";

const HomeScreen = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      {props.children}
    </Modal>
  );
};
export default HomeScreen;

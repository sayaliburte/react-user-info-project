import React from "react";
import {Table} from '@material-ui/core';
const CardComponent = (props) => {
  return <Card>{props.children}</Card>;
};

export default CardComponent;

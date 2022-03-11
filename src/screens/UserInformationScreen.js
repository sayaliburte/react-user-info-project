import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./UserInformationScreen.module.css";
import TableComponent from "../components/TableComponent";
const UserInformationScreen = (props) => {
  return (
    <Grid container className={styles.center}>
      <Grid item xs={10} md={8}>
        <TableComponent data={props.userData} onItemDelete={props.onDelete} />
      </Grid>
    </Grid>
  );
};

export default UserInformationScreen;

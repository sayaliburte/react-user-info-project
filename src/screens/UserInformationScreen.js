import React, { useState, Fragment } from "react";
import { Grid } from "@material-ui/core";
import styles from "./UserInformationScreen.module.css";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";
import UserForm from "../components/UserForm.js";
const UserInformationScreen = (props) => {
  const [open, setOpen] = useState(false);
  const [idToUpdate,setIdToUpdate]=useState();
  const handleOpen = (id) => {
    setIdToUpdate(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  let fetchData;
  if(idToUpdate){
    fetchData=props.userData.filter(data=>data.id===idToUpdate);
    fetchData={...fetchData[0]};
  }
  return (
    <Fragment>
      <Grid container className={styles.center}>
        <Grid item xs={10} md={8}>
          <TableComponent userData={props.userData} onItemDelete={props.onDelete} handleOpen={handleOpen} />
        </Grid>
      </Grid>
      <ModalComponent open={open} onClose={handleClose}>
        <UserForm fetchData={fetchData} onUpdateData={props.onUpdateData}/>
      </ModalComponent>
    </Fragment>
  );
};

export default UserInformationScreen;

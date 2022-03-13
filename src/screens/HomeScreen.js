import React, { Fragment, useState } from "react";
import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import ModalComponent from "../components/ModalComponent";
import UserForm from "../components/UserForm";
import useHttp from "../hooks/use-http";
import classes from "./HomeScreen.module.css";
import CardComponent from '../components/CardComponent'
const HomeScreen = (props) => {
  const { sendRequest: sendTaskRequest } = useHttp();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addDataSuccess, setAddDataSuccess] = useState(false);
  const addUser = () => {
    setAddDataSuccess(true);
  };
  const addNewUser = async (newUserData) => {
    sendTaskRequest(
      {
        url: "https://react-user-info-project-default-rtdb.firebaseio.com/userData.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { ...newUserData },
      },
      addUser
    );
  };

  return (
    <Fragment>
     <div><CardComponent /> </div>
      <div className={classes.button}>
        <Button onClick={handleOpen} color="secondary" variant="contained">
          Add New User
        </Button>
      </div>
      <ModalComponent open={open}>
        <UserForm addUserData={addNewUser} onClose={handleClose} />
      </ModalComponent>
      <Snackbar
        open={addDataSuccess}
        autoHideDuration={6000}
        onClose={() => {
          setAddDataSuccess(false);
        }}
      >
        <Alert
          onClose={() => {
            setAddDataSuccess(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
   
    </Fragment>
  );
};
export default HomeScreen;

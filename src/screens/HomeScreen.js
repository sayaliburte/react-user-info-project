import React, { Fragment, useState } from "react";
import { Button, Snackbar, Box, CircularProgress } from "@material-ui/core";
import { Alert } from "@mui/material";
import ModalComponent from "../components/ModalComponent";
import UserForm from "../components/UserForm";
import useHttp from "../hooks/use-http";
import classes from "./HomeScreen.module.css";

/*On this Screen,from app bar we can navigate to two screens.

*/
const HomeScreen = (props) => {
  const { isLoading, error, sendRequest: sendAddDataRequest } = useHttp();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addDataSuccess, setAddDataSuccess] = useState(false);
  const addUser = () => {
    setAddDataSuccess(true);
  };
  //this function is used for adding data on firebase server.
  const addNewUser = async (newUserData) => {
    sendAddDataRequest(
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
  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress color="secondary" size={50} />
      </Box>
    );
  }
  return (
    <Fragment>
      <div className={classes.button}>
        <Button onClick={handleOpen} color="secondary" variant="contained">
          Add New User
        </Button>
        {error && <Alert variant="filled" severity="error">Something went wrong Please Try Again Later</Alert>}
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
          User Information Added Successfully
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
export default HomeScreen;

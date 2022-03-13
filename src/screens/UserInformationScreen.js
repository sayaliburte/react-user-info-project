import React, { useState, Fragment, useEffect } from "react";
import { Grid, Snackbar, Box, CircularProgress } from "@material-ui/core";
import styles from "./UserInformationScreen.module.css";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";
import UserForm from "../components/UserForm.js";
import useHttp from "../hooks/use-http";
import { Alert } from "@mui/material";

/*This Screen is used for displaying data of User*/
const UserInformationScreen = (props) => {
  const [open, setOpen] = useState(false);
  const [deleteDataSuccess, setDeleteDataSuccess] = useState(false);
  const [updateDataSuccess, setUpdateDataSuccess] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState();
  const [userData, setUserData] = useState([]);
  const handleOpen = (id) => {
    setIdToUpdate(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  let fetchData;
  if (idToUpdate) {
    fetchData = userData.filter((data) => data.id === idToUpdate);
    fetchData = { ...fetchData[0] };
  }
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const viewUserData = (data) => {
      const loadedData = [];

      for (const i in data) {
        loadedData.push({ ...data[i], id: i });
      }
      setUserData(loadedData);
    };

    sendRequest(
      {
        url: "https://react-user-info-project-default-rtdb.firebaseio.com/userData.json",
      },
      viewUserData
    );
  }, [sendRequest]);

  const deletedUser = (id) => {
    const tempData = userData.filter((element) => element.id !== id);
    setUserData(tempData);
    setDeleteDataSuccess(true);
  };
  /*deleteUser function deletes particular user information when clicked on it */
  const deleteUser = async (id) => {
    sendRequest(
      {
        url: `https://react-user-info-project-default-rtdb.firebaseio.com/userData/${id}.json`,
        method: "DELETE",
      },
      deletedUser.bind(null, id)
    );
  };

  /*updateUserData function update particular user information when clicked on it */
  const updateUser = (id, dataToUpdate) => {
    const tempData = [...userData];
    const updateDataindex = userData.findIndex((i) => i.id === id);
    tempData[updateDataindex] = {
      ...userData[updateDataindex],
      ...dataToUpdate,
    };
    setUserData(tempData);
    setUpdateDataSuccess(true);
  };

  const updateUserData = async (id, dataToUpdate) => {
    sendRequest(
      {
        url: `https://react-user-info-project-default-rtdb.firebaseio.com/userData/${id}.json`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: { ...dataToUpdate },
      },
      updateUser.bind(null, id, dataToUpdate)
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
  const onCloseSnackbar=()=>{
      deleteDataSuccess
        ? setDeleteDataSuccess(false)
        : setUpdateDataSuccess(false);
  }
  return (
    <Fragment>
      <Grid container className={styles.center}>
        <Grid item xs={10} md={8}>
          {error && <Alert variant="filled" severity="error">Something Went Wrong Please Try Again Later</Alert>}
          <TableComponent
            userData={userData}
            onItemDelete={deleteUser}
            handleOpen={handleOpen}
          />
        </Grid>
      </Grid>
      <ModalComponent open={open}>
        <UserForm
          fetchData={fetchData}
          onUpdateData={updateUserData}
          onClose={handleClose}
        />
      </ModalComponent>
      <Snackbar
        open={deleteDataSuccess || updateDataSuccess}
        autoHideDuration={6000}
        onClose={onCloseSnackbar}
      >
        <Alert
          onClose={onCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {deleteDataSuccess
            ? "Data Deleted Successfully"
            : "Data Updated Successfully"}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default UserInformationScreen;

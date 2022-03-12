import React, { useState, Fragment, useEffect } from "react";
import { Grid, Snackbar } from "@material-ui/core";
import styles from "./UserInformationScreen.module.css";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";
import UserForm from "../components/UserForm.js";
import useHttp from "../hooks/use-http";
import { Alert } from "@mui/material";
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
  const { sendRequest } = useHttp();
  useEffect(() => {
    const viewUserData = (data) => {
      const loadedData = [];

      for (const i in data) {
        console.log(data[i].hobbyArray.length);
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
  const deleteUser = async (id) => {
    sendRequest(
      {
        url: `https://react-user-info-project-default-rtdb.firebaseio.com/userData/${id}.json`,
        method: "DELETE",
      },
      deletedUser.bind(null, id)
    );
  };

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
  return (
    <Fragment>
      <Grid container className={styles.center}>
        <Grid item xs={10} md={8}>
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
        onClose={() => {
          deleteDataSuccess
            ? setDeleteDataSuccess(false)
            : setUpdateDataSuccess(false);
        }}
      >
        <Alert
          onClose={() => {
            deleteDataSuccess
              ? setDeleteDataSuccess(false)
              : setUpdateDataSuccess(false);
          }}
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

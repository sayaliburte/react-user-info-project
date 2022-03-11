import React, { Fragment, useState } from "react";
import { Button, Grid, Box, Typography } from "@material-ui/core";
import ModalComponent from "../components/ModalComponent";
import classes from "./HomeScreen.module.css";
import FormComponent from "../components/FormComponent";
import UserForm from "../components/UserForm";
const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={6} md={8}>
          <Button onClick={handleOpen} color="secondary" variant="contained">
            Add New User
          </Button>
        </Grid>
      </Grid>
      <ModalComponent open={open} onClose={handleClose}>
          <UserForm />
      </ModalComponent>
    </Fragment>
  );
};
export default HomeScreen;

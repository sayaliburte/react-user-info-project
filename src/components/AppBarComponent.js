import React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const AppBarComponent = (props) => {
  return (
    <Grid>
      <AppBar>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            User Information Project
          </Typography>
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link
              to="/userInfo"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">View User's List</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: 90 }}>{props.children}</main>
    </Grid>
  );
};

export default AppBarComponent;

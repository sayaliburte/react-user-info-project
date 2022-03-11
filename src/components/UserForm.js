import React, { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";

import {
  Box,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  FormGroup,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const UserForm = (props) => {
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const [name, setName] = useState(props.fetchData ? props.fetchData.name : "");
  const [date, setDate] = useState(
    props.fetchData ? props.fetchData.date : null
  );
  const [address, setAddress] = useState(
    props.fetchData ? props.fetchData.address : ""
  );
  const [gender, setGender] = useState(
    props.fetchData ? props.fetchData.gender : ""
  );
  const [collegeName, setCollegeName] = useState(
    props.fetchData ? props.fetchData.collegeName : ""
  );
  const [hobbies, setHobbies] = useState({
    Reading: !props.fetchData
      ? false
      : props.fetchData.hobbyArray.includes("Reading")
      ? true
      : false,
    Travelling: !props.fetchData
      ? false
      : props.fetchData.hobbyArray.includes("Travelling")
      ? true
      : false,
    Gaming: !props.fetchData
      ? false
      : props.fetchData.hobbyArray.includes("Gaming")
      ? true
      : false,
    Drawing: !props.fetchData
      ? false
      : props.fetchData.hobbyArray.includes("Drawing")
      ? true
      : false,
    other: !props.fetchData
      ? false
      : props.fetchData.hobbyArray.includes("other")
      ? true
      : false,
  });
  const [fetchCollegeName, setFetchCollegeName] = useState([]);
  useEffect(() => {
    const transformTasks = (collegeNameObj) => {
      const loadedTasks = [];

      for (const i in collegeNameObj) {
        loadedTasks.push({ collegeName: collegeNameObj[i].name });
      }

      setFetchCollegeName(loadedTasks);
    };

    fetchTasks(
      { url: "http://universities.hipolabs.com/search?country=india" },
      transformTasks
    );
  }, [fetchTasks]);

  let hobbiesText = " ";
  if (props.fetchData) {
    hobbiesText = props.fetchData.hobbyArray
      .filter((element) => {
        return (
          element !== "Reading" &&
          element !== "Travelling" &&
          element !== "Gaming" &&
          element !== "Drawing" &&
          element !== "other"
        );
      })
      .toString(",");
  }
  const [addedHobbies, setAddedHobbies] = useState(hobbiesText);
  const handleChange = (e) => {
    setHobbies({ ...hobbies, [e.target.name]: e.target.checked });
  };
  let hobbyArray = [];
  const formSubmitHandler = (event) => {
    event.preventDefault();
    Object.keys(hobbies).forEach(function (key) {
      if (hobbies[key] === true) {
        hobbyArray.push(key);
      }
    });
    if (hobbies.other) {
      let arr = addedHobbies.toString().split(",");
      hobbyArray = arr.concat(hobbyArray);
    }

    let userData = {
      id: props.fetchData ? props.fetchData.id : name + date,
      name,
      date,
      address,
      gender,
      collegeName,
      hobbyArray,
    };
    if (props.fetchData) {
      props.onUpdateData(userData);
    } else {
      props.addUserData(userData);
    }
    props.handleClose();
  };

  return (
    <Box sx={style}>
      <form onSubmit={formSubmitHandler}>
        {props.fetchData ? <h2>Update User Data</h2> : <h2>Add User Data</h2>}
        <Grid container spacing={2} xs={8} md={12}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label={props.fetchData ? "" : "Name"}
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={8} md={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label={props.fetchData ? "" : "Birth Date"}
                format="dd/MM/yyy"
                style={{ width: "380px", height: "44px" }}
                variant="dialog"
                value={date}
                onChange={(event, row) => {
                  setDate(event, row);
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              multiline
              maxRows={4}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl>
              <FormLabel id="demo-form-control-label-placement">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="end"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select College
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={collegeName}
                label="College"
                onChange={(e) => setCollegeName(e.target.value)}
              >
               {fetchCollegeName ? fetchCollegeName.map((f)=>{return <MenuItem value={f.collegeName}>{f.collegeName}</MenuItem>}):<MenuItem value={0}>No data</MenuItem>}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <FormLabel component="legend">Hobbies</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hobbies.Reading}
                    name="Reading"
                    value={hobbies}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Reading"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hobbies.Travelling}
                    onChange={handleChange}
                    name="Travelling"
                    color="primary"
                  />
                }
                label="Travelling"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hobbies.Gaming}
                    onChange={handleChange}
                    name="Gaming"
                    color="primary"
                  />
                }
                label="Gaming"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hobbies.Drawing}
                    onChange={handleChange}
                    name="Drawing"
                    color="primary"
                  />
                }
                label="Drawing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hobbies.other}
                    onChange={handleChange}
                    name="other"
                    color="primary"
                  />
                }
                label="other"
              />
            </FormGroup>
            <Grid item xs={12} md={12}>
              {hobbies.other ? (
                <TextField
                  fullWidth
                  value={addedHobbies}
                  label="Hobbies"
                  onChange={(e) => setAddedHobbies(e.target.value)}
                  variant="outlined"
                />
              ) : null}
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disableElevation
              >
                {props.fetchData ? "Update Data" : "Add User"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;

import React, { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";
import useInput from "../hooks/use-input";
import { Alert } from "@mui/material";
import {
  Box,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
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
/*This Component is Form Component */
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
//var regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const isNotEmpty = (value) => value.trim() !== "";
//const isNameValid = (value) => value.trim() !== "" && regex.test(value);

const UserForm = (props) => {
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const [date, setDate] = useState(
    props.fetchData ? props.fetchData.date : null
  );

  const [gender, setGender] = useState(
    props.fetchData ? props.fetchData.gender : ""
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
    //fetching university name where country=India from given Api
    const transformData = (collegeNameObj) => {
      const loadedCollege = [];

      for (const i in collegeNameObj) {
        loadedCollege.push({ collegeName: collegeNameObj[i].name });
      }

      setFetchCollegeName(loadedCollege);
    };

    fetchTasks(
      { url: "http://universities.hipolabs.com/search?country=india" },
      transformData
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
  /*Used for Validation using use-input custom hook*/
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty, props.fetchData ? props.fetchData.name : "");

  const {
    value: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty, props.fetchData ? props.fetchData.address : "");

  const {
    value: collegeName,
    isValid: collegeNameIsValid,
    hasError: collegeNameHasError,
    valueChangeHandler: collegeNameChangeHandler,
    inputBlurHandler: collegeNameBlurHandler,
    reset: resetCollegeName,
  } = useInput(isNotEmpty, props.fetchData ? props.fetchData.collegeName : "");

  let formIsValid = false;

  if (nameIsValid && addressIsValid && collegeNameIsValid) {
    formIsValid = true;
  }

  const handleChange = (e) => {
    setHobbies({ ...hobbies, [e.target.name]: e.target.checked });
  };
  let hobbyArray = [];

  /*Form Submit Handler*/
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
      name,
      date,
      address,
      gender,
      collegeName,
      hobbyArray,
    };
    if (props.fetchData) {
      props.onUpdateData(props.fetchData.id, userData);
    } else {
      props.addUserData(userData);
    }
    resetName();
    setDate(null);
    resetAddress();
    resetCollegeName();
    props.onClose();
  };
  if (isLoading) {
    return (
      <Box sx={style}>
          <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={style}>
        <Alert variant="filled" severity="error">{error}</Alert>
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={() => {
            props.onClose();
          }}
        >
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <Box sx={style}>
      <form onSubmit={formSubmitHandler}>
        {props.fetchData ? (
          <h2 style={{ textAlign: "center" }}>Update User Data</h2>
        ) : (
          <h2 style={{ textAlign: "center" }}>Add User Data</h2>
        )}
        <Grid container spacing={3} xs={8} md={12}>
          <Grid item xs={12} md={12}>
            <TextField
              required
              fullWidth
              error={nameHasError ? true : false}
              label={props.fetchData ? "" : "Name"}
              variant="outlined"
              value={name}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameHasError && (
              <span style={{ color: "red" }}>Please enter a first name.</span>
            )}
          </Grid>
          <Grid item xs={8} md={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
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
              required
              fullWidth
              label="Address"
              variant="outlined"
              error={addressHasError ? true : false}
              multiline
              maxRows={4}
              value={address}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
            />
            {addressHasError && (
              <span style={{ color: "red" }}>
                Please enter a valid address.
              </span>
            )}
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
                required
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio required={true} />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio required={true} />}
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
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={collegeName}
                label="College"
                onChange={collegeNameChangeHandler}
                onBlur={collegeNameBlurHandler}
              >
                {fetchCollegeName ? (
                  fetchCollegeName.map((f) => {
                    return (
                      <MenuItem value={f.collegeName}>{f.collegeName}</MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={0}>No data</MenuItem>
                )}
              </Select>
            </FormControl>
            {collegeNameHasError && (
              <span style={{ color: "red" }}>
                Please enter a valid College Name.
              </span>
            )}
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  disabled={!formIsValid}
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  {props.fetchData ? "Update Data" : "Add User"}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={() => {
                    props.onClose();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;

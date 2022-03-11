import React from "react";
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
  FormGroup,Button
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
  return (
    <Box sx={style}>
      <h2>Add User Data</h2>
      <Grid container spacing={2} xs={8} md={12}>
        <Grid item xs={12} md={12}>
          <TextField fullWidth label="Name" variant="outlined" />
        </Grid>

        <Grid item xs={8} md={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Birth Date"
              style={{ width: "380px", height: "44px" }}
              variant="dialog"
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
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl>
            <FormLabel id="demo-form-control-label-placement">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="end"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
              value={""}
              label="Age"
              onChange={() => {}}
            >
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12}>
        <FormLabel component="legend">Hobbies</FormLabel>
          <FormGroup row>
         
            <FormControlLabel
              control={<Checkbox onChange={() => {}} name="checkedA" color="primary" />}
              label="Reading"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={() => {}} name="checkedB" color="primary" />
              }
              label="Travelling"
            />
               <FormControlLabel
              control={<Checkbox onChange={() => {}} name="checkedA" color="primary" />}
              label="Gaming"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={() => {}} name="checkedB" color="primary" />
              }
              label="Drawing"
            />
              <FormControlLabel
              control={
                <Checkbox onChange={() => {}} name="checkedB" color="primary" />
              }
              label="other"
            />
          </FormGroup>
          <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Hobbies"
            variant="outlined"
           
          />
        </Grid>
        <Grid item xs={12} md={12}>
        <Button variant="contained" disableElevation>
  Disable elevation
</Button>
        </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;

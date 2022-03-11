import React from "react";
import { Grid } from "@material-ui/core";

const FormComponent = (props) => {
  return (
    <form>
      <div className="form-control">
        <div style={{ paddingBottom: "10px" }}>
          <label htmlFor="firstName">Name: </label>
          <input type="text" id="firstName" name="firstName" />
        </div>
        <div>
          <label htmlFor="BirthDate">Birth Date: </label>
          <input type="date" id="birthDate" name="birthDate" />
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <textarea rows="4" cols="50" id="address" name="address" />
        </div>
        <div>
          <label htmlFor="gender">Gender: </label>
          <input type="radio" name="gender" value="male" /> Male
          <input type="radio" name="gender" value="female" /> Female
        </div>
        <div>
          <label for="cars">Choose a car:</label>
          <select id="cars" name="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div>
        <label htmlFor="hobbies">Hobbies: </label>
        <input type="checkbox" id="vehicle1" name="vehicle1" />
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        </div>
      </div>

      <button type="submit">Add person</button>
    </form>
  );
};

export default FormComponent;

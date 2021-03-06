import { useReducer } from "react";

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return state;
};
/** use-input is custom hook used for validating Data*/
const useInput = (validateValue, updateValue) => {
  const initialInputState = {
    value: updateValue ? updateValue : "",
    isTouched: false,
  };

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
 let valueIsValid = validateValue(inputState.value);
  if (updateValue) {
    valueIsValid = true;
  }

  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;

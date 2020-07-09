import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function InputBox(props) {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.showFilters);

  const [value, setValue] = useState(props.value);
  const [initialValue] = useState(props.value);
  const submit = props.submit
    ? props.submit
    : (e) =>
        console.log(
          "Pressed enter but did not assign a submit function on component: ",
          e.target
        );
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const isIn = (e) => {
    if (e.target.value.toString() === initialValue.toString()) {
      setValue("");
    }
  };
  const isOut = (e) => {
    props.writeToState(e);
    if (e.key) {
      //TAB out with no value
      if (e.key === "Tab") {
        if (toString(e.target.value) === "") {
          props.writeToState(initialValue);
        }
      }
      if (e.key === "Enter") {
        submit(e);
      }
    }
  };

  return (
    <input
      className={props.className}
      id={props.id}
      type={props.type}
      value={value}
      placeholder={initialValue}
      onChange={handleInput}
      onFocus={isIn}
      //Once focus is off
      onBlur={(e) => {
        isOut(e);
      }}
      onKeyDown={(e) => isOut(e)}
    ></input>
  );
}

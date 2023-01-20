import { text } from '@fortawesome/fontawesome-svg-core';
import React, { useState } from 'react';
import classes from './InputField.module.css';

// const InputField = props => {
//   return (
//     <div>
//       <input className={classes.input} {...props.input} />
//     </div>
//   );
// };

const InputField = props => {
  let propsStyle = props.propsStyle || { width: '100%' };
  const [valueState, setValueState] = useState();
  const changeValue = val => {
    setValueState(val);
  };
  const label = (
    <label className={classes.label} htmlFor="">
      {props.labelText}
    </label>
  );
  const input = (
    <input
      style={propsStyle}
      className={`${classes.input}`}
      {...props.properties}
      value={changeValue}
    />
  );
  const select = (
    <select style={propsStyle} className={classes.input} {...props.properties}>
      {/* {props.option} */}
      <option value="g">g</option>
      <option value="kg">kg</option>
      <option value="ml">ml</option>
      <option value="l">l</option>
      <option value="TL-gestr.">TL-gestr.</option>
      <option value="TL">TL</option>
      <option value="EL">EL</option>
      <option value="Stk.">Stk.</option>
      <option value="Priese">Priese</option>
      <option value="Tasse">Tasse</option>
      <option value="--">--</option>
    </select>
  );
  const textarea = (
    <textarea
      style={propsStyle}
      className={classes.input}
      {...props.properties}
    ></textarea>
  );
  return (
    <React.Fragment>
      {props.label && label}
      {props.input && input}
      {props.select && select}
      {props.textarea && textarea}
    </React.Fragment>
  );
};

export default InputField;

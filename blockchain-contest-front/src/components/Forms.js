import ExternalDatePicker from "react-datepicker";
import { useCallback, useRef, useState } from "react";

import styles from "@styles/Forms.module.css";
import { CheckmarkFilled } from "@fluentui/react-icons";
import { Unbounded } from "next/font/google";
const unbounded = Unbounded({ subsets: ["latin"], weight: "400" });

export function TextField({
  className = "",
  id,
  desc = null,
  errorMsg = null,
  FluentIcon = null,
  replaceRegex = null,
  onChange = () => {},
  ...props
}) {
  const input = useRef(null);

  const changeHandler = useCallback(
    (e) => {
      if (replaceRegex) {
        input.current.value = input.current.value.replace(replaceRegex, "");
      }
      onChange(e);
    },
    [input, replaceRegex]
  );

  return (
    <div className="flexCol">
      <div className={styles.formLabel}>
        <label htmlFor={id}>{desc}</label>
      </div>
      <div className={styles.inputWrapper} data-has-error={!!errorMsg}>
        {FluentIcon && <FluentIcon />}
        <input
          type="text"
          id={id}
          ref={input}
          name={id}
          className={styles.basicInput + " " + className}
          data-has-icon={!!FluentIcon}
          onChange={changeHandler}
          {...props}
        />
      </div>
      <div className={styles.errorMsg}>{errorMsg}</div>
    </div>
  );
}

export function CheckBox({
  className = "",
  desc = null,
  label = null,
  checked = false,
  ...props
}) {
  const [isChecked, setIsChecked] = useState(checked);

  function _changeHandler(e) {
    setIsChecked(!isChecked);
    if (props.onChange) props.onChange(e);
  }
  return (
    <div className="flexCol">
      <div className={styles.formLabel}>
        <label>{desc}</label>
      </div>
      <div className="flexRow">
        <div
          className="flexCol"
          style={{
            position: "relative",
            width: "unset",
          }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            className={styles.basicCheckBox + " " + className}
            {...props}
            onChange={_changeHandler}
          />
          <div className={styles.checkWrapper}>
            <CheckmarkFilled className={styles.checkIcon} />
          </div>
        </div>

        <div>{label}</div>
      </div>
    </div>
  );
}

export function Button({ className = "", children, ...props }) {
  return (
    <button className={styles.formBtn + " " + className} {...props}>
      {children}
    </button>
  );
}

export function OutlineButton({ className = "", children, ...props }) {
  return (
    <button className={styles.outlineBtn + " " + className} {...props}>
      {children}
    </button>
  );
}

export function DatePicker({
  className = "",
  desc = null,
  FluentIcon = null,
  ...props
}) {
  return (
    <div className="flexCol">
      <div className={styles.formLabel}>
        <label>{desc}</label>
      </div>
      <div className={styles.inputWrapper}>
        {FluentIcon && <FluentIcon />}
        <ExternalDatePicker
          className={styles.basicInput + " " + className}
          {...props}
        />
      </div>
    </div>
  );
}

export function Select({
  className = "",
  desc = null,
  options,
  FluentIcon = null,
  ...props
}) {
  return (
    <div className="flexCol">
      <div className={styles.formLabel}>
        <label>{desc}</label>
      </div>
      <div className={styles.inputWrapper}>
        {FluentIcon && <FluentIcon />}
        <select className={styles.basicInput + " " + className} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function Panel({ className = "", label = null, children, ...props }) {
  return (
    <div className={styles.form + " " + className} {...props}>
      {label && (
        <div className={`${styles.label} ${unbounded.className}`}>{label}</div>
      )}
      {children}
    </div>
  );
}

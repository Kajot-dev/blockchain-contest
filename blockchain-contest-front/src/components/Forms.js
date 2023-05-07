import ExternalDatePicker from "react-datepicker";

import styles from "@styles/Forms.module.css";

export function TextField({
  className = "",
  id,
  desc = null,
  errorMsg = null,
  FluentIcon = null,
  ...props
}) {
  return (
    //todo add fluent icons
    <div className="flexCol">
      <div className={styles.formLabel}>
        <label htmlFor={id}>{desc}</label>
      </div>
      <div className={styles.inputWrapper} data-has-error={!!errorMsg}>
        {FluentIcon && <FluentIcon />}
        <input
          type="text"
          id={id}
          name={id}
          className={styles.basicInput + " " + className}
          data-has-icon={!!FluentIcon}
          {...props}
        />
      </div>
      <div className={styles.errorMsg}>{errorMsg}</div>
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

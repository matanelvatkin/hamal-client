import React, { useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import { useEffect } from "react";

const SelectInput = ({
  options,
  placeholder,
  setValues,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState({});

  useEffect(() => {
    if (selectedOption && selectedOption.value) {
      setValues(selectedOption.value);
    }
  }, [selectedOption]);
  return (
    <>
      <Select
        style={{ width: "80%" ,backgroundColor: '#000' }}
        options={options}
        blurInputOnSelect={true}
        isRtl={true}
        placeholder={placeholder}
        defaultValue={{ label: placeholder, value: `${placeholder}` }
        }
        isSearchable={true}
        isClearable={true}
        required={true}
        className={styles.submitted}
        onChange={setSelectedOption}
      />
    </>
  );
};

export default SelectInput;

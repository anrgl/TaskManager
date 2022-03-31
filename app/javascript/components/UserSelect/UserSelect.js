import React, { useState } from "react";
import PropTypes from "prop-types";

import AsyncSelect from "react-select/async";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import InputLabel from "@material-ui/core/InputLabel";

import UsersRepository from "repositories/UsersRepository";
import UserPresenter from "presenters/UserPresenter";
import useStyles from "./useStyles";


const UserSelect = (props) => {
  const {
    error,
    label,
    isClearable,
    isDisabled,
    isRequired,
    onChange,
    value,
    helperText,
  } = props;
  const [isFocused, setFocus] = useState(false);
  const styles = useStyles();
  const handleOptionsLoad = (inputValue) =>
    UsersRepository.index({ q: { firstNameOrLastNameCont: inputValue } }).then(
      ({ data }) => data.items
    );

  return (
    <div>
      <FormControl
        margin="dense"
        disabled={isDisabled}
        focused={isFocused}
        error={error}
        required={isRequired}
      >
        <InputLabel shrink>{label}</InputLabel>
        <div className={styles.select}>
          <AsyncSelect
            cacheOptions
            loadOptions={handleOptionsLoad}
            defaultOptions
            getOptionLabel={(user) => UserPresenter.fullName(user)}
            getOptionValue={(user) => user.id}
            isDisabled={isDisabled}
            isClearable={isClearable}
            defaultValue={value}
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </div>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

UserSelect.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.shape(),
  helperText: PropTypes.string,
};

export default UserSelect;

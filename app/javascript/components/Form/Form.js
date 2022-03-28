import React from "react";
import PropTypes from "prop-types";
import { has } from "ramda";

import TextField from "@material-ui/core/TextField";

import useStyles from "./useStyles";

const Form = (props) => {
  const { errors, onChange, task } = props;
  const styles = useStyles();
  const handleChangeTextField = (fieldName) => (onTextFieldChange) =>
    onChange({ ...task, [fieldName]: onTextFieldChange.target.value });

  return (
    <form className={styles.root}>
      <TextField
        error={has("name", errors)}
        helperText={errors.name}
        onChange={handleChangeTextField("name")}
        value={task.name}
        label="Name"
        required
        margin="dense"
      />
      <TextField
        error={has("description", errors)}
        helperText={errors.description}
        onChange={handleChangeTextField("description")}
        value={task.description}
        label="Description"
        required
        multiline
        margin="dense"
      />
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  task: PropTypes.shape().isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
  }),
};

Form.defaultProps = {
  errors: {},
};

export default Form;

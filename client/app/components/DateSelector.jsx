import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../components/TextField';
import _ from 'lodash';

const DEFAULT_TEXT = 'mm/dd/yyyy';
// A regex that will match as much of a mm/dd/yyyy date as possible.
// TODO (mdbenjam): modify this to not accept months like 13 or days like 34
const DATE_REGEX = /[0,1](?:\d(?:\/(?:[0-3](?:\d(?:\/(?:\d{0,4})?)?)?)?)?)?/;

export default class DateSelector extends React.Component {
  dateFill = (initialValue) => {
    let value = initialValue || '';
    let propsValue = this.props.value || '';

    // If the user added characters we append a '/' before putting
    // it through the regex. If this spot doesn't accept a '/' then
    // the regex test will strip it. Otherwise, the user doesn't have
    // to type a '/'. If the user removed characters we check if the
    // last character is a '/' and remove it for them.
    if (value.length > propsValue.length) {
      value = `${value}/`;
    } else if (propsValue.charAt(propsValue.length - 1) === '/') {
      value = value.substr(0, value.length - 1);
    }

    // Test the input agains the date regex above. The regex matches
    // as much of an allowed date as possible. Therefore this will just
    // removing any non-date characters
    let match = DATE_REGEX.exec(value);

    value = match ? match[0] : '';

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    let {
      errorMessage,
      label,
      name,
      readOnly,
      required,
      type,
      validationError,
      value,
      ...passthroughProps
    } = _.omit(this.props, 'onChange');

    return <TextField
      errorMessage={errorMessage}
      label={label}
      name={name}
      readOnly={readOnly}
      type={type}
      value={value}
      validationError={validationError}
      onChange={this.dateFill}
      placeholder={DEFAULT_TEXT}
      required={required}
      {...passthroughProps}
    />;

  }
}

DateSelector.propTypes = {
  errorMessage: PropTypes.string,
  invisible: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  validationError: PropTypes.string,
  value: PropTypes.string
};

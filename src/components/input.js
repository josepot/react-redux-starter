import React from 'react';

const Input = ({
  type,
  style,
  placeholder,
  fieldDefinition,
}) => (
  <input
    className="block col-12 mb1 input"
    style={{ ...styles.base, ...style }}
    type={ type }
    placeholder={ placeholder }
    { ...fieldDefinition } />
);

const styles = {
  base: {},
};

Input.propTypes = {
  type: React.PropTypes.string,
  style: React.PropTypes.object,
  placeholder: React.PropTypes.string,
  fieldDefinition: React.PropTypes.object.isRequired,
};

Input.defaultProps = {
  type: 'text',
  style: {},
  placeholder: '',
};

export default Input;

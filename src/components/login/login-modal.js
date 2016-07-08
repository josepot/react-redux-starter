import React, { PropTypes } from 'react';

import { Modal, ModalContent } from '../modal';
import LoginForm from './login-form';

function LoginModal({ isVisible, loginFormProps, loginFormHandlers }) {
  return (
    <Modal testid="login-form" isVisible={ isVisible }>
      <ModalContent>
        <h1 data-testid="login-header" className="mt0">Login</h1>

        <LoginForm { ...loginFormProps } { ...loginFormHandlers } />
      </ModalContent>
    </Modal>
  );
}

export const props = {
  isVisible: PropTypes.bool,
  loginFormProps: PropTypes.shape(LoginForm.props),
};

export const handlers = {
  loginFormHandlers: PropTypes.shape(LoginForm.handlers),
};

LoginModal.propTypes = {
  ...props,
  ...handlers,
};

export default LoginModal;

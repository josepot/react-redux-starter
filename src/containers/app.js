import R from 'ramda';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { session } from '../actions';
import storeConnector from '../queries/app';

import { Link } from 'react-router';
import Button from '../components/button';
import Content from '../components/content';
import LoginModal from '../components/login/login-modal';
import Logo from '../components/logo';
import Navigator from '../components/navigator';
import NavigatorItem from '../components/navigator-item';

const App = ({
  children, firstName, isLoggedIn, lastName, loginModalProps,
  loginModalHandlers, logout,
}) => (
  <div>
    <LoginModal { ...loginModalProps } { ...loginModalHandlers } />
    <Navigator testid="navigator">
      <NavigatorItem mr>
        <Logo />
      </NavigatorItem>
      <NavigatorItem isVisible={ isLoggedIn } mr>
        <Link to="/">Counter</Link>
      </NavigatorItem>
      <NavigatorItem isVisible={ isLoggedIn }>
        <Link to="/about">About Us</Link>
      </NavigatorItem>
      <div className="flex flex-auto"></div>
      <NavigatorItem isVisible={ isLoggedIn } mr>
        <div data-testid="user-profile" className="h3">{ `${ firstName } ${ lastName }` }</div>
      </NavigatorItem>
      <NavigatorItem isVisible={ isLoggedIn }>
        <Button onClick={ logout } className="bg-red white">
          Logout
        </Button>
      </NavigatorItem>
    </Navigator>
    <Content isVisible={ isLoggedIn }>
      { children }
    </Content>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
  firstName: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  lastName: PropTypes.string,
  loginModalProps: PropTypes.shape(LoginModal.props),
  loginModalHandlers: PropTypes.shape(LoginModal.handlers),
  logout: PropTypes.func,
};

const mapDispatchToProps = {
  logout: session.onLogout,
  submit: session.onLogin,
};

const mergeProps = (
  { appProps, formProps: { username, password } },
  { submit, logout },
  { children }
) => ({
  ...appProps,
  logout,
  loginModalHandlers: {
    loginFormHandlers: {
      onSubmit: R.partial(submit, [username, password]),
    },
  },
  children,
});

export default connect(storeConnector, mapDispatchToProps, mergeProps)(App);

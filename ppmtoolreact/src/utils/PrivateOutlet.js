import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateOutlet({ redirectTo, security }) {
  const auth = security.validToken === true;
  return auth ? <Outlet /> : <Navigate to={redirectTo} />;
}

PrivateOutlet.propTypes = {
    security: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    security: state.security
})

export default connect(mapStateToProps)(PrivateOutlet);
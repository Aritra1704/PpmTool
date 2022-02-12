import React, { Component } from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import {createNewUser} from '../../actions/securityActions';
import classNames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        "username": "",
        "fullName": "",
        "password": "",
        "confirmPassword": "",
        errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.security.validToken) {
        this.props.navigate("/dashboard")
    }
  }

  //Life cycle hooks
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors});
        }
    }

    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            "username": this.state.username,
            "fullName": this.state.fullName,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword
        };

        this.props.createNewUser(newUser, this.props.navigate);
    }

  render() {
    const { errors } = this.state;
    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 
                            className="display-4 text-center">
                            Sign Up
                        </h1>
                        <p 
                            className="lead text-center">
                            Create your Account
                        </p>
                        <form 
                            action="create-profile.html"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className={
                                        classNames("form-control form-control-lg ", {
                                            "is-invalid": errors.fullName
                                    })} 
                                    placeholder="Full Name" 
                                    name="fullName"
                                    required 
                                    value={this.state.fullName}
                                    onChange={this.handleChange}
                                />
                                {errors.fullName && (
                                    <div className='invalid-feedback'>
                                        {errors.fullName}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <input 
                                    type="username" 
                                    className={
                                        classNames("form-control form-control-lg ", {
                                            "is-invalid": errors.username
                                    })} 
                                    placeholder="Email Address (Username)" 
                                    name="username" 
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                {errors.username && (
                                    <div className='invalid-feedback'>
                                        {errors.username}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={
                                        classNames("form-control form-control-lg ", {
                                            "is-invalid": errors.password
                                    })} 
                                    placeholder="Password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                {errors.username && (
                                    <div className='invalid-feedback'>
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={
                                        classNames("form-control form-control-lg ", {
                                            "is-invalid": errors.confirmPassword
                                    })} 
                                    placeholder="Confirm Password"
                                    name="confirmPassword" 
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                />
                                {errors.username && (
                                    <div className='invalid-feedback'>
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </div>
                            <input 
                                type="submit" 
                                className="btn btn-info btn-block mt-4" 

                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

// declares that createNewUser is a required prop type for this function
Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    security: state.security,
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    { createNewUser }
)(Register);
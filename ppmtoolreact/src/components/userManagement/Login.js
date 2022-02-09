import React, { Component } from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import {loginUser} from '../../actions/securityActions';
import classNames from 'classnames';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            "username": "",
            "fullName": "",
            "password": "",
            errors: {}
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const user = {
            "username": this.state.username,
            "fullName": this.state.fullName,
            "password": this.state.password
        };

        this.props.loginUser(user, this.props.navigate);
    }

  render() {
    const { errors } = this.state;
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 
                            className="display-4 text-center">
                            Log In
                        </h1>
                        <form 
                            action="dashboard.html"
                            onSubmit={this.handleSubmit}
                        >
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
// declares that createprproject is a required prop type for this function
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    { loginUser }
)(Login);
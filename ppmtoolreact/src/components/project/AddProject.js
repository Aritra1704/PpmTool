import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classNames from 'classnames';

class AddProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "id": 1,
            "projectName": "",
            "projectIdentifier": "",
            "description": "",
            "start_date": "",
            "end_date": "",
            "errors": {}
        }

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
        const newProject = {
            "projectName": this.state.projectName,
            "projectIdentifier": this.state.projectIdentifier,
            "description": this.state.description,
            "start_date": this.state.start_date,
            "end_date": this.state.end_date,
        };

        this.props.createProject(newProject, this.props.navigate);
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="register">  
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create Project form</h5>
                                <hr />
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className={
                                                classNames("form-control form-control-lg ", {
                                                    "is-invalid": errors.projectName
                                            })} 
                                            placeholder="Project Name" 
                                            name="projectName"
                                            value={this.state.projectName}
                                            onChange={this.handleChange} 
                                        />
                                        {errors.projectName && (
                                            <div className='invalid-feedback'>
                                                {errors.projectName}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className={
                                                classNames("form-control form-control-lg", {
                                                    "is-invalid": errors.projectIdentifier
                                                })} 
                                            placeholder="Unique Project ID"
                                            name="projectIdentifier"
                                            value={this.state.projectIdentifier}
                                            onChange={this.handleChange} 
                                        />
                                        {errors.projectIdentifier && (
                                            <div className='invalid-feedback'>
                                                {errors.projectIdentifier}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="form-group">
                                        <textarea 
                                            className={
                                                classNames("form-control form-control-lg", {
                                                    "is-invalid": errors.description
                                                })} 
                                            placeholder="Project Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleChange} 
                                        />
                                        {errors.description && (
                                            <div className='invalid-feedback'>
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" name="start_date"
                                        value={this.state.start_date}
                                        onChange={this.handleChange} />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" name="end_date"
                                        value={this.state.end_date}
                                        onChange={this.handleChange} />
                                    </div>

                                    <input 
                                        type="submit" 
                                        className="btn btn-primary btn-block mt-4" 
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// declares that createprproject is a required prop type for this function
AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    { createProject }
)(AddProject);
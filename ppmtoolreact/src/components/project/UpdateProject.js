import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from 'classnames';
import { getProject, updateProject } from "../../actions/projectActions";

class UpdateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "id": "",
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors : nextProps.errors });
        } 
        const { 
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date
        } = nextProps.project;
        
        this.setState({
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date
        });
    }
    componentDidMount() {
        const { history } = this.props;
        const path = history.location.pathname;
        if(!path.includes("/updateProject"))  {// workaround to get correct params
            window.location.reload(false);
        } else {
            const pathSplit = path.toString().split("/");
            const id = pathSplit[pathSplit.length - 1];
            this.props.getProject(id, history)
        }
    }
    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const updateProject = {
            "projectName": this.state.projectName,
            "projectIdentifier": this.state.projectIdentifier,
            "description": this.state.description,
            "start_date": this.state.start_date,
            "end_date": this.state.end_date,
        };

        this.props.updateProject(updateProject, this.props.history);
    }
    render () {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">
                                Update Project form
                            </h5>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classNames("form-control form-control-lg ", {
                                            "is-invalid": errors.projectName
                                        }) }
                                        placeholder="Project Name" 
                                        name='projectName'
                                        value={this.state.projectName} 
                                        onChange={this.handleChange} 
                                    />
                                    {
                                        errors.projectName && (
                                            <div className='invalid-feedback'>{errors.projectName}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Unique Project ID"
                                        name='projectIdentifier'
                                        value={this.state.projectIdentifier}
                                        disabled />
                                </div>
                                <div className="form-group">
                                    <textarea  
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })} 
                                        placeholder="Project Description"
                                        name='description'
                                        value={this.state.description}
                                        onChange={this.handleChange} 
                                    >
                                    </textarea>
                                    {
                                        errors.description && (
                                            <div className='invalid-feedback'>{errors.description}</div>
                                        )
                                    }
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="start_date" 
                                        value={this.state.start_date}
                                        onChange={this.handleChange} 
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="end_date" 
                                        value={this.state.end_date}
                                        onChange={this.handleChange} 
                                    />
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
        )
    }
}

// declares that createprproject is a required prop type for this function
UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
        errors: state.errors,
        project: state.project.project
    }
)
    
export default connect(
    mapStateToProps,
    { getProject, updateProject }
)(UpdateProject);
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { addProjectTask } from "../../../actions/backlogActions";
import { getId } from '../../../utils/Commons';

class AddProjectTask extends Component {
    constructor(props) {
        super(props);

        let id;
        const path = this.props.history.location.pathname;
        if(!path.includes("/addProjectTask"))  {// workaround to get correct params
            window.location.reload(false);
        } else {
            id = getId(props, "addProjectTask");
        } 

        this.state = {
            "summary": "",
            "acceptanceCriteria": "",
            "status": "",
            "priority": 0,
            "dueDate": "",
            "projectIdentifier": id,
            "errors": {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "status": this.state.status,
            "priority": this.state.priority,
            "dueDate": this.state.dueDate,
        };

        console.log(newTask);
        this.props.addProjectTask(this.state.projectIdentifier,
            newTask,
            this.props.history);
    }

    render() {
        const id = getId(this.props, "addProjectTask");
        const { errors } = this.state;
        
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${id}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Add Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classNames("form-control form-control-lg" , {
                                            "is-invalid": errors.summary
                                        }) }
                                        name="summary" 
                                        placeholder="Project Task summary" 
                                        value={this.state.summary}
                                        onChange={this.handleChange}
                                    />
                                    {
                                        errors.summary && (
                                            <div className='invalid-feedback'>{errors.summary}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className={classNames("form-control form-control-lg" , {
                                            "is-invalid": errors.acceptanceCriteria
                                        }) }
                                        placeholder="Acceptance Criteria" 
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.handleChange}
                                    />
                                    {
                                        errors.acceptanceCriteria && (
                                            <div className='invalid-feedback'>{errors.acceptanceCriteria}</div>
                                        )
                                    }
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className={classNames("form-control form-control-lg" , {
                                            "is-invalid": errors.dueDate
                                        }) }
                                        name="dueDate" 
                                        value={this.state.dueDate}
                                        onChange={this.handleChange}
                                    />
                                    {
                                        errors.dueDate && (
                                            <div className='invalid-feedback'>{errors.dueDate}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.handleChange}
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
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
        );
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { addProjectTask }
)(AddProjectTask);
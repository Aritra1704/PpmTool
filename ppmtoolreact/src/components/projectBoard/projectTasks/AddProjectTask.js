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

        const id = getId(props, "addProjectTask");

        this.state = {
            "summary": "",
            "acceptanceCriteria": "",
            "status": "",
            "priority": 0,
            "dueDate": "",
            "projectIdentifier": id,
            "errors": {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // const updateProject = {
        //     "projectName": this.state.projectName,
        //     "projectIdentifier": this.state.projectIdentifier,
        //     "description": this.state.description,
        //     "start_date": this.state.start_date,
        //     "end_date": this.state.end_date,
        // };
    }

    

    render() {
        const id = getId(this.props, "addProjectTask");
        
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
                                        className="form-control form-control-lg" 
                                        name="summary" 
                                        placeholder="Project Task summary" 
                                        value={this.state.summary}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="form-control form-control-lg" 
                                        placeholder="Acceptance Criteria" 
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                    />
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="dueDate" 
                                        value={this.state.dueDate}
                                        />
                                </div>
                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="priority"
                                        value={this.state.priority}
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

export default connect(
    null,
    { addProjectTask }
)(AddProjectTask);
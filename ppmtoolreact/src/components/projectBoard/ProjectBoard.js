import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getId } from '../../utils/Commons';

class ProjectBoard extends Component {
    render() {
        let id;
        const path = this.props.history.location.pathname;
        if(!path.includes("/projectBoard"))  {// workaround to get correct params
            window.location.reload(false);
        } else {
            id = getId(this.props, "projectBoard");
            // this.props.getProject(id, history)
        } 

        return (
                <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {/* <!-- Backlog STARTS HERE --> */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>

                            {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
                            <div className="card mb-1 bg-light">

                                <div className="card-header text-primary">
                                    ID: projectSequence -- Priority: priorityString
                                </div>
                                <div className="card-body bg-light">
                                    <h5 className="card-title">project_task.summary</h5>
                                    <p className="card-text text-truncate ">
                                        project_task.acceptanceCriteria
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        View / Update
                                    </a>

                                    <button className="btn btn-danger ml-4">
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-primary text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            {/* <!-- SAMPLE PROJECT TASK STARTS HERE -->

                            <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-success text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            {/* <!-- SAMPLE PROJECT TASK STARTS HERE -->

                            <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(ProjectBoard);
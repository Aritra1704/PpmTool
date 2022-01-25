import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { boardAlgo, getId } from '../../utils/Commons';
import Backlog from './Backlog';
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        
    }
    componentDidMount() {
        const id = getId(this.props, "projectBoard");
        this.props.getBacklog(id);
    }
    render() {
        let id;
        const path = this.props.history.location.pathname;
        if(!path.includes("/projectBoard"))  {// workaround to get correct params
            window.location.reload(false);
        } else {
            id = getId(this.props, "projectBoard");
            // this.props.getProject(id, history)
        } 
        const { project_tasks } = this.props.backlog;
        const { errors } = this.state;

        let boardContent;
        

        boardContent = boardAlgo(errors, project_tasks);

        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                { boardContent !== undefined ? // If boardcontent is not undefined
                    boardContent :  //  then show error
                    <Backlog project_tasks={project_tasks} />}
            </div>
        );
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    backlog: state.backlog,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getBacklog }
)(ProjectBoard);
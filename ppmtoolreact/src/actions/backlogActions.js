import axios from "axios";
import { ADD_PROJECT_TASK, GET_BACKLOG, GET_ERRORS } from "./types";

export const addProjectTask = (
    backlog_id, 
    project_task, 
    history
) => async dispatch => {
    let type;
    let payload;
    try {
        console.log("addProjectTask >>");
        console.log(backlog_id);
        console.log(project_task);
        await axios.post(`/api/backlog/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`);
        type = ADD_PROJECT_TASK;
        payload = {};
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
}

export const getBacklog = (backlog_id) => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}`);
        type = GET_BACKLOG;
        payload = res.data;
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
}
import axios from "axios";
import { ADD_PROJECT_TASK, GET_ERRORS } from "./types";

export const addProjectTask = (
    backlog_id, 
    project_task, 
    history
) => async dispatch => {
    let type;
    let payload;
    try {
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
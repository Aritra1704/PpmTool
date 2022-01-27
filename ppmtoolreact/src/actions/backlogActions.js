import axios from "axios";
import { ADD_PROJECT_TASK, GET_BACKLOG, GET_ERRORS, GET_PROJECT_TASK, UPDATE_PROJECT_TASK } from "./types";

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

export const getProjectTask = (backlog_id, projectTaskId, history) => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}/${projectTaskId}`);
        type = GET_PROJECT_TASK;
        payload = res.data;
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
        history.push(`/dashboard`);
    } finally {
        dispatch({ type, payload });
    }
}

export const updateProjectTask = (backlog_id, projectTaskId, updateTask, history) => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.put(`/api/backlog/${backlog_id}/${projectTaskId}`, updateTask);
        type = UPDATE_PROJECT_TASK;
        payload = res.data;
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
        history.push(`/dashboard`);
    } finally {
        dispatch({ type, payload });
    }
}
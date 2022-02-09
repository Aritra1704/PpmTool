import axios from "axios";
import { ADD_PROJECT_TASK, DELETE_PROJECT_TASK, GET_BACKLOG, GET_ERRORS, GET_PROJECT_TASK, UPDATE_PROJECT_TASK } from "./types";

export const addProjectTask = (
    backlog_id, 
    project_task, 
    navigate
) => async dispatch => {
    let type;
    let payload;
    try {
        console.log("addProjectTask >>");
        console.log(backlog_id);
        console.log(project_task);
        await axios.post(`/api/backlog/${backlog_id}`, project_task);
        navigate(`/projectBoard/${backlog_id}`);
        type = ADD_PROJECT_TASK;
        payload = {};
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
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
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
}

export const getProjectTask = (backlog_id, projectTaskId, navigate) => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}/${projectTaskId}`);
        type = GET_PROJECT_TASK;
        payload = res.data;
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
        navigate(`/dashboard`);
    } finally {
        dispatch({ type, payload });
    }
}

export const updateProjectTask = (backlog_id, projectTaskId, updateTask, navigate) => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.put(`/api/backlog/${backlog_id}/${projectTaskId}`, updateTask);
        type = UPDATE_PROJECT_TASK;
        payload = res.data;
        navigate(`/projectBoard/${backlog_id}`);
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
        navigate(`/dashboard`);
    } finally {
        dispatch({ type, payload });
    }
}

export const deleteProjectTask = (backlog_id, projectTaskId) => async dispatch => {
    if(!window.confirm(`Are you sure you wish to delete ${projectTaskId} task?`)) {
        return;
    }
    let type;
    let payload;
    try {
        const URL = `/api/backlog/${backlog_id}/${projectTaskId}`;
        console.log(`delete URL >> ${URL}`);
        await axios.delete(URL);
        type = DELETE_PROJECT_TASK;
        payload = projectTaskId;
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }   
}
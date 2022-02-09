import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT, CREATE_PROJECTS, UPDATE_PROJECTS } from "./types";

export const createProject = (project, navigate) => async dispatch => {
    let type;
    let payload;
    try {
        await axios.post("/api/project", project);
        navigate("/dashboard");
        type = CREATE_PROJECTS;
        payload = {};
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
            // Use below for naviaget hooks in router v6
            // navigate("/", { replace: true});
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
}

export const updateProject = (project, navigate) => async dispatch => {
    let type;
    let payload;
    try {
        console.log(project);
        await axios.put(`/api/project/${project.projectIdentifier}`, project);
        navigate("/dashboard");
        type = UPDATE_PROJECTS;
        payload = {};
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
            // Use below for naviaget hooks in router v6
            // navigate("/", { replace: true});
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
}

export const getProjects = () => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.get("/api/project/all");
        type = GET_PROJECTS;
        payload = res.data;
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
};

export const getProject = (id, navigate) => async dispatch => {
    let type;
    let payload;
    try {
        const URL = `/api/project/${id}`;
        console.log(`URL >> ${URL}`);
        const res = await axios.get(URL);
        type = GET_PROJECT;
        payload = res.data;
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
        navigate("/dashboard");
    } finally {
        dispatch({ type, payload });
        console.log('getProject finally');
    }
};

export const deleteProject = (id) => async dispatch => {
    if(!window.confirm("Are you sure you wish to delete this project?")) {
        return;
    }
    let type;
    let payload;
    try {
        const URL = `/api/project/${id}`;
        console.log(`URL >> ${URL}`);
        await axios.delete(URL);
        type = DELETE_PROJECT;
        payload = id;
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
        console.log('deleteProject finally');
    }   
}
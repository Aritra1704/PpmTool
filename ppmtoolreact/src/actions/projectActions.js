import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async dispatch => {
    let type;
    let payload;
    try {
        await axios.post("/api/project", project);
        history.push("/dashboard");
        type = GET_ERRORS;
        payload = {};
            // Use below for naviaget hooks in router v6
            // navigate("/", { replace: true});
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
}

export const updateProject = (project, history) => async dispatch => {
    let type;
    let payload;
    try {
        await axios.post(`/api/project/${project.projectIdentifier}`, project);
        history.push("/dashboard");
        type = GET_ERRORS;
        payload = {};
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
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
};

export const getProject = (id, history) => async dispatch => {
    let type;
    let payload;
    try {
        const URL = `/api/project/${id}`;
        console.log(`URL >> ${URL}`);
        const res = await axios.get(URL);
        type = GET_PROJECT;
        payload = res.data;
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
        history.push("/dashboard");
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
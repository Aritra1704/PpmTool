import axios from "axios";
import { GET_ERRORS, GET_PROJECTS } from "./types";

export const createProject = (project, history) => async dispatch => {
    try {
        const res = await axios.post(
            "http://localhost:8080/api/project", 
            project);
            console.log(history);
            history.replace("/dashboard");
            // Use below for naviaget hooks in router v6
            // navigate("/", { replace: true});
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getProjects = () => async dispatch => {
    let type;
    let payload;
    try {
        console.log('getProjects called');
        const res = await axios.get(
            "http://localhost:8080/api/project/all"
        );
        type = GET_PROJECTS;
        payload = res.data;
        console.log('getProjects completed');
    } catch(err) {
        type = GET_ERRORS;
        payload = err.response.data;
        console.log('getProjects error');
    } finally {
        dispatch({ type, payload });
        console.log('getProjects finally');
    }
}
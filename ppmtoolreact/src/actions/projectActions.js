import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";

export const createProject = (project, history) => async dispatch => {
    try {
        await axios.post("http://localhost:8080/api/project", project);
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
        const res = await axios.get(
            "http://localhost:8080/api/project/all"
        );
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
        const URL = `http://localhost:8080/api/project/${id}`;
        console.log(`URL >> ${URL}`);
        const res = await axios.get(URL);
        type = GET_PROJECT;
        payload = res.data;
        history.replace("/dashboard");
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
        console.log('getProject finally');
    }
}
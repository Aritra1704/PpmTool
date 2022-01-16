import axios from "axios";
import { GET_ERRORS } from "./types";

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
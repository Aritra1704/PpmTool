import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { CREATE_USER, GET_ERRORS, LOGIN_USER } from "./types";

export const createNewUser = (newUser, navigate) => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.post("/api/users/register", newUser);
        type = CREATE_USER;
        payload = res.data;
        navigate("/login");
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
}

export const loginUser = (user, navigate) => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.post("/api/users/login", user);
        type = LOGIN_USER;
        payload = res.data;
        console.log(payload);
        navigate("/dashboard");
        // Use below for naviaget hooks in router v6
        // navigate("/", { replace: true});
        dispatch({ type: GET_ERRORS, payload: {} });// resetting error
    } catch (err) {
        type = GET_ERRORS;
        payload = err.response.data;
    } finally {
        dispatch({ type, payload });
    }
}
import axios from "axios";
import jwt_decode from 'jwt-decode';
import setJwtToken from "../utils/SetJwtToken";
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

export const loginUser = (loginRequest, navigate) => async dispatch => {
    let type;
    let payload;
    try {
        const res = await axios.post("/api/users/login", loginRequest);
        // extract token from res.data
        const { token } = res.data;
        // store the token in the localstorage
        localStorage.setItem("jwtToken", token);
        // set  our token in the localstorage
        setJwtToken(token);
        // decode token on react
        const decoded = jwt_decode(token);
        type = LOGIN_USER;
        payload = decoded;
        console.log(payload);
        // navigate("/dashboard"); // perform this action in Login component
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

export const logout = () => async dispatch => {
    localStorage.removeItem("jwtToken");
    setJwtToken(false);
    dispatch({ type: LOGIN_USER, payload: {} });
}
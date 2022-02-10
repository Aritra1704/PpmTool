import axios from "axios"

const setJwtToken = token => {
    if(token) {
        // setting up authorization token header
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setJwtToken;
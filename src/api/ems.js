import axios from 'axios';
const BASE_URL = 'https://g7w4zrci3a.execute-api.us-east-1.amazonaws.com/dev';

function getAll() {
    return axios.get(`${BASE_URL}/ems-parameters?type=allParameters`)
        .then(resp => resp.data);
}

export {
    getAll
}
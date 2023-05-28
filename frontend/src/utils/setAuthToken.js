import axios from '../api';

const setAuthToken = data =>{
    console.log(data)
    if(data.token) axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    else delete axios.defaults.headers.common['Authorization'] 
}

export default setAuthToken;
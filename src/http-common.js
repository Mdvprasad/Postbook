import axios from "axios";
const token = '67d856138ba54d7093dd48ebe39e446944ca4ddc0e4765f42f50d8cd67980477';
export default axios.create({
    baseURL: 'https://gorest.co.in/public/v2',
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${token}`
    }
});
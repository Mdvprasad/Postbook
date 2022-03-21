import axios from 'axios';
import { token } from '../constants/constants';


axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
export default axios;
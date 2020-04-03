import axios from 'axios'

const axiosDBInstance = axios.create({
  baseURL: 'https://doggytails24.firebaseio.com/',
})

export default axiosDBInstance

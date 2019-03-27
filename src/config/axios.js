import axios from 'axios'
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // config.data = {'token': sessionStorage.getItem('token')}
    config.headers['token'] = sessionStorage.getItem('token')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
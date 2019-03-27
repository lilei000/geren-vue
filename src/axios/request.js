import axios from 'axios'
axios.defaults.baseURL = ''
axios.interceptors.request.use(
  config => {
    if(localStorage.getItem('token')){
      config.headers.token = localStorage.getItem('token')
      config.headers['Content-Type'] = 'application/json'
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      if (config.method === 'post') {
        // 做出修改
      }
    }
    
    return config
  },
  error => {
    console.log(error)
    console.log('请求拦截出错')
  }
)
axios.interceptors.response.use(
  response => {
    if(response.data.resultCode == "403"){
      window.location.href = '/'
    }else{
      console.log(response)
      return response.data
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          alert('服务器地址不存在')
          break
        case 500:
          alert('服务器故障')
          break
      }
    }
    return Promise.reject(error)
  }
)
export default axios

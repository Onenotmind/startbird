const axios = require('axios')
const qs = require('qs')
axios.defaults.withCredentials = true
const ssapiAxios = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000
})
// axios.defaults.headers.common['token'] = '123'
const ssapiPath = {
  getNovelInfo: 'v1/getNovelInfo',
  getSpecificChapter: 'v1/getSpecificChapter',
  getTopFivePopularNovel: 'v1/getTopFivePopularNovel',
  getNovelAllChapter: 'v1/getNovelAllChapter',
  getChapterById: 'v1/getChapterById'
}

function intercept () {
  ssapiAxios.interceptors.request.use(config => {
    console.log('request', config)
    return config
  }, error => {
    console.log('request error', error)
    return Promise.reject(error)
  })

  ssapiAxios.interceptors.response.use(response => {
    console.log('response', response.data)
    return response
  }, error => {
    console.log('response error', error)
    return Promise.reject(error)
  })
}

function handleRequestRes (data, succCb, errCb) { // trade项目数据回调函数封装
  console.log('data', data)
  if (data.status === 1) {
    if (data.res.status === 1) {
      if (succCb) {
        succCb(data.res.data)
      }
    } else {
      if (errCb) {
        errCb(data.res.msg)
      }
    }
  } else {
    if (errCb) {
      errCb(data.msg)
    }
  }
}

// 更改axios headers
function setHeader (type, val) {
  axios.defaults.headers.common[type] = val
}

// get novel info
function getNovelInfo (novelId) {
  return ssapiAxios.get(ssapiPath.getNovelInfo, { params: { novelId } })
}

// get top5 popular novel
function getTopFivePopularNovel () {
  return ssapiAxios.get(ssapiPath.getTopFivePopularNovel)
}

// get all chapters by novel_id
function getNovelAllChapter (novelId) {
  return ssapiAxios.get(ssapiPath.getNovelAllChapter, { params: { novelId } })
}

// get chapter by id
function getChapterById (chapterId) {
  return ssapiAxios.get(ssapiPath.getChapterById, { params: { chapterId } })
}

export default {
  getNovelInfo,
  getTopFivePopularNovel,
  getNovelAllChapter,
  getChapterById
}
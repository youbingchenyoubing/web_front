const development = {
  envMsg: "开发环境变量",
  BASIC_BASE_URL: "/api",
  BASIC_IMAGE_URL: "/api"
}

const production = {
  envMsg: "生产环境变量",
  BASIC_BASE_URL: "/api",
  BASIC_IMAGE_URL: "/api"
}

/* 
  使用： import.env.$envMsg
  具体使用文档：https://www.npmjs.com/package/vite-plugin-set-env
*/
export default {
  development,
  production
}

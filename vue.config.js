module.exports = {
    devServer: {
      proxy: 'http://127.0.0.1/yutang_api/public/index.php/api/'
    },
    css: {
      loaderOptions: {
          css: {},
          postcss: {
              plugins: [
                  require('postcss-pxtorem')({
                      rootValue: 75,
                      propList: ['*'],
                      selectorBlackList: ['van']
                  })
              ]
          }
      }
   },
   chainWebpack:config=>{
    //发布模式
    config.when(process.env.NODE_ENV === 'production',config=>{
        //entry找到默认的打包入口，调用clear则是删除默认的打包入口
        //add添加新的打包入口
        config.entry('app').clear().add('./src/main-prod.js')
        config.set('externals',{
            vue:'Vue',
            vant:'vant'
        })
        config.plugin('html').tap(args=>{
            //添加参数isProd
            args[0].isProd = true
            return args
        })
    })
    //开发模式
    config.when(process.env.NODE_ENV === 'development',config=>{
        config.entry('app').clear().add('./src/main-dev.js')
        config.plugin('html').tap(args=>{
            //添加参数isProd
            args[0].isProd = false
            return args
        })
    })
},
    // publicPath:'./'
  }
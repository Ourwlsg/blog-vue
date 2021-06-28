module.exports = {
  devServer: {
    // 解决跨域问题
    proxy: {
      '/photos': {
        target: 'https://picsum.photos',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/photos': ''
        }
      },
      '/Music': {
        target: 'https://autumnfish.cn',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/Music': ''
        }
      },
      '/server': {
        target: 'http://139.196.193.100:9002/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/server': ''
        }
      },
      '/link': {
        target: 'http://139.196.193.100:9003/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/link': ''
        }
      },
      '/crawler': {
        target: 'http://127.0.0.1:9005',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/crawler': ''
        }
      },
      '/AI': {
        target: 'http://127.0.0.1:9007',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/AI': ''
        }
      },
      '/encrypt': {
        target: 'http://127.0.0.1:9001',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/encrypt': ''
        }
      },
    },
    before: app => {}
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // 默认是main.js要清空换成自己的
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        // vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress'
        // 'mavon-editor': 'mavon-editor' // 配置有问题，不知道如何修改
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        args[0].title = 'Zhucc的博客'
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      // 默认是main.js要清空换成自己的
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        args[0].title = 'Zhucc的博客'
        return args
      })
    })
  }
}

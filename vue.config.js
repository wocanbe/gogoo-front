const path = require("path")

const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  publicPath: process.env.BASE_URL,
  css: {
    extract: isProduction,
    sourceMap: false,
    loaderOptions: {
      css: {
        importLoaders: 1,
      },
      sass: {
        prependData: `@import "~@/assets/theme.scss";`
      }
    },
  },
  productionSourceMap: false,
  devServer: {
    port: 9090,
    proxy: {
      [process.env.VUE_APP_API_PATH]: {
        target: process.env.VUE_APP_API_PROXY,
        pathRewrite: {
          [process.env.VUE_APP_API_PATH]: [process.env.VUE_APP_API_PROXY_PATH]
        },
        changeOrigin: true
      }
    }
  },
  // webpack配置
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@img", resolve("src/assets/images"))
      .set("@css", resolve("src/assets/css"))
    if (isProduction) {
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions = {
          cache: true, // 是否缓存
          paraller: true, // 是否并行打包
          sourceMap: false,
          compress: {
            dead_code: true,
            drop_debugger: true,
            drop_console: true
          }
        }
        // args[0].terserOptions.compress.drop_console = true
        return args
      })
      config.optimization.splitChunks({
        chunks: 'initial',
        name: true,
        cacheGroups: {
          default: false,
          vendors: {
            test (module) {
              return /\/node_modules\//.test(module.resource)
            },
            priority: -10,
            enforce: true
          },
          vant: {
            test: /node_modules\/element\//,
            enforce: true
          }
        }
      })
    }
  }
}

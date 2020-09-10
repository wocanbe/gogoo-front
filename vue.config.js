const path = require("path")
const CompressionPlugin = require("compression-webpack-plugin")
const zopfli = require("@gfx/zopfli")
const BrotliPlugin = require("brotli-webpack-plugin")

const isProduction = process.env.NODE_ENV === 'production'
const prodGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

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
  configureWebpack: (config) => {
    // 生产环境相关配置
    if (isProduction) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback);
          },
          compressionOptions: {
            numiterations: 15
          },
          //压缩超过此大小的文件,以字节为单位
          threshold: 51200, // 50KB
          minRatio: 0.8,
          test: prodGzipExtensions
        })
      )
      config.plugins.push(
        new BrotliPlugin({
          test: prodGzipExtensions,
          threshold: 51200,
          minRatio: 0.8
        })
      )
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
        chunks: 'initial', //  “initial”（初始化） | “all”(默认就是 all) | “async”（动态加载）
        name: true,
        cacheGroups: {
          default: false,
          vendors: {
            name: 'vendors',
            test (module) {
              return /\/node_modules\//.test(module.resource)
            },
            priority: -10,
            enforce: true
          },
          element: {
            name: 'element',
            test: /node_modules\/element-ui\//,
            priority: 1,
            enforce: true
          },
          vxe: {
            name: 'vxe',
            test: /node_modules\/vxe-table\//,
            priority: 2,
            enforce: true
          },
          codemirror: {
            chunks: 'async',
            name: 'codemirror',
            test: /node_modules\/codemirror\//,
            priority: 3,
            enforce: true
          }
        }
      })
    }
  }
}

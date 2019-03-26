# 创建一个UI��组件 造一个轮子
# 作者： C.L


## 介绍
这是我在学习Vue过程中做的一个UI组件，希望对你有用。
## 开始使用
1. 安装
    使用本框架前，请在css中开启 border-box
    ```
    *,*::before,*::after{box-sizing:border-box}
    ```
    IE 8 及以上浏览器都支持此样式
    你还需设置默认颜色等变量（后续会改scss变量）
    ```
    html {
        --button-height: 32px;
        --font-size: 14px;
        --button-bg: white;
        --button-active-bg: #eee;
        --border-radius: 4px;
        --color: #999;
        --border-color:#999;
        --border-color-hover: #666;
    }
    ```
    IE 158 及以上浏览器都支持此样式
2. 安装gulu-chenlling-1
    ```
    npm i --save gulu-chenlling-1
    ```
3. 引入gulu-chenlling-1
    ```
    import {Button, Icon, ButtonGroup} from 'gulu-chenlling-1'
    import '../node_modules/gulu-chenlling-1/dist/index.css'

    export default {
      name: 'app',
      components: {
        HelloWorld,
        'g-button': Button
      }
    }
    ```

## 文档
## 提问
## 变更记录
## 联系方式
## 贡献代码

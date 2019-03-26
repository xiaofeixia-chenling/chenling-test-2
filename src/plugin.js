import Toast from './toast'

let currentToast
export default{
  install (Vue, options){
    Vue.prototype.$toast = function(message, tOptions){
      if(currentToast){
        currentToast.close()
      }
      currentToast = createToast({
        Vue, 
        message, 
        propsData: tOptions,
        onClose: ()=>{
          currentToast = null
          //如果已经关闭了toast实例了，currtent这个值赋值为bull，就不会多执行一次currentToast.close()方法，
          //原本不加上onClose这个属性，也是没有bug的，但是为了让代码优化，这个是要加上的逻辑
        }
      })
      // tOptions = tOptions && tOptions || {};
      // let Constructor = Vue.extend(Toast)
      // let toast = new Constructor({
      //   // propsData:{
      //   //   enbleHtml: tOptions.enbleHtml,
      //   //   closeButton:{
      //   //     text: tOptions.buttton || '知道了',
      //   //     callback(newToast){
      //   //       tOptions.closeButtonCb && typeof tOptions.closeButtonCb === 'function' && tOptions.closeButtonCb(newToast)
      //   //     }
      //   //   }
      //   // }
      //   propsData : tOptions
      // });
      
      // toast.$slots.default = [message]
      // toast.$mount() //挂载
      // document.body.appendChild(toast.$el)
    }

    //实现只出现一个toast功能步骤
    //提取函数
    //函数里返回toast对象
    //用一个变量接住函数返回的toast对象，
    //判断这个变量是否已经存在，存在就删掉
  }
}

function createToast({Vue, message, propsData, onClose}){
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor({
    propsData
  })
  toast.$slots.default = [message]
  toast.$mount()
  toast.$on('close', onClose)
  document.body.appendChild(toast.$el)
  return toast
}
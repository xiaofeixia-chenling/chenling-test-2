<template>
  <div class="warpper" :class="toastClasses">
    <div class="toast" ref="toast">
      <div class="message">
          <div v-if="enbleHtml" v-html="$slots.default[0]"></div>
          <slot v-else></slot>
        </div>
        <div class="line" ref="line"></div>
        <span class="close" if="closeButton" @click="onClickClose">{{closeButton.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuluToast',
  props:{
    autoClose:{
      type: Boolean,
      default: true //复制
    },
    autoCloseDelay: {
      type: Number,
      default: 5 //复制
    },
    closeButton:{
      type: Object,
      // default:{
      //   text: xxx,
      //   callback: ()=>{}
      // }, //这种写法是错的
      default:()=>{
        return {  //如果默认的值是一个函数则一定要用retrurn的方式定义，因为函数是对象，会被引用的方式作为默认值，如果不用return 其它所有new Toast实例都会受到影响
          text: '关闭',
          callback: (toast)=>{
            toast.close()
          }
        }
      }
    },
    enbleHtml: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top',
      validator(value){
        return ['top', 'bottom', 'middle'].indexOf(value) >= 0
      }
    }
  },
  mounted(){
    this.updateHeight()  
    this.excuedClose()
  },
  computed:{
    toastClasses(){
      return {[`position-${this.position}`]: true}
    }
  },
  methods:{
    excuedClose(){
      if(this.autoClose){
        setTimeout(() =>{
          this.close()
        },this.autoCloseDelay * 1000)
      }
    },
    updateHeight(){
      //mounted的时候，如果肉眼看到的和js实际打印出来的不一样，一般是因为异步的问题
      // setTimeout(() => {
      //   this.$refs.line.style.height = `${this.$refs.toast.getBoundingClientRect().height}px`
      // },1000)
      this.$nextTick(() => {
        this.$refs.line.style.height = `${this.$refs.toast.getBoundingClientRect().height}px`
      })
      // xxx.style.height只获取内联样式，不获取css样式
      //父的高度是css高度，所以用xxx.stryle.height是无法获得元素的高度的
      //console.log(this.$refs.toast.getBoundingClientRect().height)
    },
    close(){
      this.$el.remove()
      this.$emit('close')
      this.$destroy()
    },
    onClickClose(){
      //关闭自己
      this.close()
      //调用别人的回调
      this.closeButton.callback && this.closeButton.callback(this) //this是toast 实例
    }
  }
}
</script>

<style scoped lang="scss">
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
$animation-destroy: 300ms;
@keyframes slide-up {
  0%{ opacity: 0; transform: translateY(100%)}
  100%{ opacity: 1; transform: translateY(0%)}
}
@keyframes slide-down {
  0%{ opacity: 0; transform: translateY(-100%)}
  100%{ opacity: 1; transform: translateY(0%)}
}
@keyframes fade-in {
  0%{ opacity: 0;}
  100%{ opacity: 1;}
}
.warpper{
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  &.position-top{
    top: 0;
    .toast{
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: slide-down $animation-destroy;
    }
  }
  &.position-bottom{
    bottom: 0;
    .toast{
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: slide-up $animation-destroy;
    }
  }
  &.position-middle{
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    .toast{
      animation: fade-in $animation-destroy;
    }
  }
}
.toast{
  display: flex;
  color: white;
  background: $toast-bg;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.50);
  padding: 0 16px;
  font-size: $font-size;
  min-height: $toast-min-height;
  line-height: 1.8;

  .message{
    padding: 8px 0;
  }
  .close{
    padding-left: 16px;
    flex-shrink: 0;
  }
  .line{
    border-left: 1px solid #666;
    margin-left: 16px;
  }
  
}
</style>


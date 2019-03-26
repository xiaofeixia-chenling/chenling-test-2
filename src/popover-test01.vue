<template>
    <div class="popover" @click="visiContrlFun">
        <div class="content-wrapper" v-if="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default{
        name: 'GuluPopover',
        data(){
            return {
                visible: false
            };
        },
        methods: {
            visiContrlFun(){
                this.visible = !this.visible
                if(this.visible === true){
                    //1
                    // document.addEventListener('click', () => {
                    //     this.visible = false;
                    // })

                    //问题1 js事件机制问题，冒泡机制问题，如果直接在body监听一个点击事件会立马冒泡到点击事件里面的代码，
                    //意思就是this.visible = true 和 this.visible = false 同时执行了。
                    //有两种解决方案，setTimeout 或者用 this.$nextTick()

                    //问题二，每次触发button的点击事件，又触发一次document的click事件监听，
                    //导致只有界面只有第一次关闭popover提示是成功的，往后由于触发了多次documen的click事件，发生混乱了
                    //解决方案就是，每次监听之前remove掉原来的监听事件
                    this.$nextTick(() => {
                        // document.addEventListener('cllck', function x(){
                        //     this.visible = false
                        //     document.removeEventListener('click', x)
                        // }.bind(this))

                        //2 removeEventListener的时候找不到函数名称，所以要把函数提取出来取个名字
                        // 这样写基本完成了，但是有一个坑， 绑定的click函数是 x 是一个函数，
                        // x.bing(this) 又会生成一个新的函数，所以函数 x 是不等于 x.bind(this)的，所以removeEventListener函数不是addEventListener函数
                        //所以要写法3 出现

                        //正确的写法 3
                        let eventHandler = () => {
                            this.visible = false
                            document.removeEventListener('click', eventHandler)
                        }

                        document.addEventListener('click', eventHandler)
                    })
                }
            }
        }
    }
</script>
<style scoped lang="scss">
.popover{
    display: inline-block;
    vertical-align: top;
    position: relative;
    .content-wrapper{
        position: absolute;
        bottom:100%;
        left:0;
        border: 1px solid red;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5)
    }
}

</style>

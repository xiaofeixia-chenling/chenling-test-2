<template>
    <div class="popover" ref="trggerWrapper">
        <div ref="contentWrapper" class="content-wrapper" :class="{[`position-${position}`]: true}" v-if="visible">
            <slot name="content"></slot>
        </div>
        <span ref="trigger" style="display: inline-block">
            <slot></slot>
        </span>
    </div>
</template>
<script>
    export default{
        name: 'GuluPopover',
        props:{
            position: {
                type: String,
                default: 'top',
                validator(value){
                    return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
                }
            },
            trigger: {
                type: String,
                default: 'click',
                validator(value){
                    return ['click', 'hover'].indexOf(value) >= 0
                }
            }

        },
        data(){
            return {
                visible: false,
            };
        },
        mounted() {
            this.$refs.trggerWrapper.addEventListener(this.openEvent, this.open)

            this.$refs.trggerWrapper.addEventListener(this.closeEvent, this.close)
        },
        //计算属性
        computed:{
            openEvent(){
                if(this.trigger === 'click'){
                    return 'click'
                }else{
                    return 'mouseenter'
                }
            },
            closeEvent(){
                if(this.trigger === 'click'){
                    return 'click'
                }else{
                    return 'mouseleave'
                }
            }
        },
        created() {

        },
        methods: {
            positionContent(){
                const {width, height, top, left} = this.$refs.trggerWrapper.getBoundingClientRect()
                const contentWrapper = this.$refs.contentWrapper
                document.body.appendChild(contentWrapper)
                const {height: height2} = contentWrapper.getBoundingClientRect()

                let x = {
                    top:{
                        top: top + window.scrollX,
                        left: left + window.scrollY
                    },
                    bottom:{
                        top: top + height +  window.scrollY,
                        left: left + window.scrollX
                    },
                    left:{
                        top: top +  window.scrollY - (height2 - height) /2,
                        left: left + window.scrollX
                    },
                    right:{
                        top: top +  window.scrollY - (height2 - height) /2,
                        left: left + window.scrollX + width
                    }
                }
                contentWrapper.style.left = x[this.position].left + 'px'
                contentWrapper.style.top = x[this.position].top + 'px'
            },
            eventHandler(e){
                if(this.$refs.trggerWrapper === e.target || this.$refs.trggerWrapper.contains(e.target)){
                    return
                }
                if(this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target)){
                    return
                }
                this.close()
            },
            open(){
                this.visible = true;
                this.$nextTick(() => {
                    this.positionContent()
                    document.addEventListener('click', this.eventHandler)
                })
            },
            close(){
                // this.visible = false;
                document.removeEventListener('click', this.eventHandler)
            },
            visiContrlFun(event){
                if(this.$refs.trggerWrapper.contains(event.target)){
                    //console.log('down')
                    this.visible = !this.visible
                    if(this.visible === true){
                        this.$nextTick(() => {
                            this.positionContent()
                            this.listenToDocument()
                        })
                    }
                }else{
                    console.log('up')
                    console.log('close2')
                }
            }
        },
    }
</script>
<style scoped lang="scss">
$border-color: #999;
$boder-radius: 4px;
.popover{
    display: inline-block;
    vertical-align: top;
    position: relative;
}
.content-wrapper{
    position: absolute;
    border: 1px solid $border-color;
    border-radius: $boder-radius;
    // box-shadow: 0 0 $boder-radius rgba(0, 0, 0, 0.5);
    filter: drop-shadow(0 1px 1px $boder-radius rgba(0, 0, 0, 0.5));
    background: white;
    padding: .5em 1em;
    max-width: 20em;
    word-break: break-all;
    &::before, &::after{
        content: '';
        display: block;
        border: 10px solid transparent;
        width: 0;
        height: 0;
        position: absolute;
    }
    &.position-top{
        transform: translateY(-100%);
        margin-top:  -10px;
        &::before, &::after{
            left: 10px;
        }
        &::before{
            border-top-color: black;
            top: 100%;
        }
        &::after{
            border-top-color: white;
            top: calc(100% - 1px);
        }
    }
    &.position-bottom{
        margin-top:  10px;
        &::before, &::after{
            left: 10px;
        }
        &::before{
            border-bottom-color: black;
            bottom: 100%;
        }
        &::after{
            border-bottom-color: white;
            bottom: calc(100% - 1px);
        }
    }
    &.position-left{
        margin-left:  -10px;
        transform: translateX(-100%);
        &::before, &::after{
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
        &::before{
            border-left-color: black;
            left: 100%;
        }
        &::after{
            border-left-color: white;
            left: calc(100% - 1px);
        }
    }
    &.position-right{
        margin-left: 10px;
        &::before, &::after{
            top: 50%;
            transform: translateY(-50%);
        }
        &::before{
            border-right-color: black;
            right: 100%;
        }
        &::after{
            border-right-color: white;
            right: calc(100% - 1px);
        }
    }
}

</style>

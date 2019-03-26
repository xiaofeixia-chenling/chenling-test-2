<template>
<button class="g-button" :class="{[`icon-${iconPosition}`]: true}"
@click="$emit('click')">
    <!-- <svg v-if="iconName" class="icon">
        <use :xlink:href=`#icon-i-${iconName}`></use>
    </svg> -->
    <g-icon v-if="iconName && !loading" :icon-name="iconName" icon-position="iconPosition"></g-icon>
    <g-icon v-if="loading" icon-name="loading" icon-position="iconPosition"></g-icon>
    <div class="content">
        <slot></slot>
    </div>
</button>
</template>
<script>

    import Icon from './icon'

    export default{
        name: 'gulu-button',
        //props:['iconName', 'iconPosition']
        components: {
            'g-icon': Icon
        },
        props:{
            'iconName': {},
            'loading' : {
                type: Boolean,
                default: false
            },
            'iconPosition': {
                type: String,
                default: 'left',
                //属性的检查器
                validator(value){
                    // if(value !== 'left' && value !== 'right'){
                    //     return false
                    // }else{
                    //     return true
                    // }
                    //简化代码写法一
                    //return !(value !== 'left' && value !== 'right')
                    //简化代码写法二
                    return value === 'left' || value === 'right'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

    .g-button{
        font-size: var(--font-size);
        height: var(--button-height);
        background: var(--button-bg);
        padding: 0 .8em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        &:hover{
            border-color: var(--border-color-hover);
        }
        &:active{
            background-color: var(--button-active-bg);
        }
        &:focus{
            outline: none;
        }
        > .icon{
            order: 1;
            margin-right: .3em;
        }
        > .content{
            order: 2;
        }
        &.icon-right{
            > .icon{
                order: 2;
                margin-right: 0;
                margin-left: .3em;
            }
            > .content{
                order: 1;
            }
        }
    }

</style>

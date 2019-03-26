<template>
    <div class="wrapper" :class="{'error' : error}">
        <input type="text" :value="value" :disabled="disabled" :readonly="readonly"
        @change="$emit('change', $event)">
        <template v-if="error">
            <g-icon class="errorIcon" icon-name="error"></g-icon>
            <span class="errorMess">{{error}}</span>
        </template>
    </div>
</template>
<script>
//g-icon已经在app.js里全局引用了icon组件，这里就不需要局部引用了
    // import Icon from './icon'
    export default{
        // compontents: {Icon},
        name: 'gulu-input', //用了name属性的话方便调试
        props: {
            value: {
                type: String
            },
            disabled:{
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            error: {
                type: String
            }
        }
    }
</script>
<style lang="scss" scoped>
$height: 32px;
$border-color:#999;
$border-color-hover:#666;
$border-radius: 4px;
$font-size: 12px;
$box-shadow-color: rgba(0,0,0,0.5);
$red: #F1453D;
.wrapper{
    &.error{
        > input {
            border-color: $red;
        }
    }
    font-size: $font-size;
    display: inline-flex;
    align-items: center;
    > :not(:last-child){
        margin-right: 0.5em;
    }
    > input{
        height: $height;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        padding: 0 8px;
        font-size: inherit;
        &:hover{
            border-color: $border-color-hover;
        }
        &:focus{
            box-shadow: inset 0 1px 3px $box-shadow-color;
            outline: none;
        }
        &[disabled], &[readonly]{
            border-color: #aaa;
            color: #aaa;
            cursor: not-allowed;
        }
    }
    .errorIcon{
        background-color: $red;
    }
    .errorMess{
        color: $red;
    }
}
</style>

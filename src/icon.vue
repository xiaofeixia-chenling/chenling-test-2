<template>
    <svg class='icon chenling2' :class="{[`i-${iconName}`]: true}">
        <use :xlink:href=`#icon-i-${iconName}`></use>
    </svg>
</template>
<script>
import './svg'
export default{
    name: 'guluIcon',
    props: ['iconName']
}
</script>
<style lang="scss" scoped>
@keyframes spin{
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}
.i-loading{
    animation: spin 1s infinite linear;
}
.i-an-loading{
    animation: spin 0s infinite linear;
}
.icon{
    width: 1em;
    height: 1em;
}
</style>

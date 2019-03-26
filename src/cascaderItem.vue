<template>
    <!-- 此组件作用就是检测到有children就循环自己 -->
    <!-- <div class="x">
        {{itemname.name}}
        <GuluCascaderItem
        v-if="itemname.children"
        v-for="item in itemname.children"
        :itemname="item">
        </GuluCascaderItem>
    </div> -->
<div class="x">
    <div class="left">
        <div v-for="(item,index) in itemname" :key="index"  @click="leftSelected = item">
            {{item.name}}
        </div>
    </div>
    <div class="right" v-if="rightItem">
        <GuluCascaderItem :itemname="rightItem"></GuluCascaderItem>
    </div>
</div>
</template>

<script>
    //写法一：
    // const component = {
    //     components: {
    //         'GuluCascader': component
    //     }
    // }
    // export default component

    export default {
        name: 'GuluCascaderItem',
        // components: {
        //     cascaderItem
        // },
        props:{
            itemname:{
                type: Array,
            },

        },
        data(){
            return{
                leftSelected: null
            }
        },
        computed:{
            rightItem(){
                if(this.leftSelected && this.leftSelected.children){
                    return this.leftSelected.children
                }else{
                    return null
                }
            }
        },
        created(){},
        methods:{

        }
    }

    //export default cascaderItem
</script>

<style scoped lang="scss">
@import "var";
.x{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100px;
}
.left{
    height: 100%;
    border: 1px solid blue;
}
.right{
    height: 100%;
}
</style>

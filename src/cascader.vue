<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">

        </div>
        <div class="popover" v-if="popoverVisible">
            <cascaderItem :itemname="source"></cascaderItem>
        </div>
    </div>
</template>

<script>
import cascaderItem from './cascaderItem'
export default {
    name: 'GuluCascader',
    components: {
        cascaderItem
    },
    props: {
        source: {
            type: Array
        }
    },
    data() {
      return {
          popoverVisible: false
      }
    },
}
</script>

<style scoped lang="scss">
@import "var";
.cascader{
    position: relative;
    .trigger{
        border: 1px solid red;
        width: 200px;
        height: 30px;
    }
    .popover{
        position: absolute;
        top:30px;
        background: white;
        
        width: 400px;
        // height: 200px;
    }
}
</style>

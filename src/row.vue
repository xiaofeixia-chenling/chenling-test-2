<template>
    <div class="row" :style="rowStyle" :class="rowClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "GuluRow",
  props: {
    gutter: {
      type: [Number, String]
    },
    align: {
      type: String,
      validator(value) {
        return ["left", "center", "right"].includes(value);
      }
    }
  },
  created() {
    //没有儿子
  },
  mounted() {
    //有儿子
    //通过vue钩子的形成顺序可以知道在父组件的mouted函数里，一定可以拿到儿子组件对象的属性，因为儿子组件都形成了
    this.$children.forEach(vm => {
      //使gutter属性变成全局属性，儿子就可以拿到gutter属性了
      vm.gutter = this.gutter;
    });
  },
  computed: {
    rowStyle() {
      return {
        marginLeft: -this.gutter / 2 + "px",
        marginRight: -this.gutter / 2 + "px"
      };
    },
    rowClass() {
      let { align } = this;
      return [align && `align-${align}`];
    }
  }

  //vue考题， created mounted 函数有什么区别
  // document.createIlement('div')  --> created --> 在内存里生成对象
  // document.body.appendChild(div) --> mounted --> 把这个对象挂到页面里面去

  //vue的钩子顺序
  //先创建爸爸元素
  //再创建儿子元素
  // 把儿子元素挂载爸爸元素的身上
  // 最后把爸爸元素挂载在body身上
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
  &.align-left {
    justify-content: flex-start;
  }
  &.align-right {
    justify-content: flex-end;
  }
  &.align-center {
    justify-content: center;
  }
}
</style>

<template>
    <div class="col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "GuluCol",
  data() {
    return {
      //接收父组件通过钩子传过来的参数
      gutter: 0
    };
  },
  props: {
    span: {
      type: [Number, String]
    },
    offset: {
      type: [Number, String]
    },
    phone: {
      type: Object,
      validator(value) {
        let valid = true;
        let keys = Object.keys(value);
        //最简单的方法
        key.forEach(key => {
          if (!["span", "offset"].includes(key)) {
            valid = false;
          }
        });
        return valid;

        //算法方法
      }
    }
  },
  created() {},
  mounted() {},
  computed: {
    colClass() {
      let { span, offset, phone } = this;
      if (phone) {
      }
      return [`col-${span}`, offset && `offset-${offset}`];
    },
    colStyle() {
      return {
        paddingLeft: this.gutter / 2 + "px",
        paddingRight: this.gutter / 2 + "px"
      };
    }
    //如果一个属性变另外一个属性跟着变，要写在computed函数里
  }
};
</script>

<style scoped lang="scss">
.col {
  height: 100px;

  $class-prefix: col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }
  $class-prefix: offset-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }
  @media (max-width: 576px) {
  }
}
</style>

<template>
  <div class="gulu-table-warpper" style="margin-top:100px;">
    <table class="gulu-table" :class="{bordered, compact, striped}">
      <thead>
        <tr>
          <td><input type="checkbox" @change="onAllChageItem" ref="allChecked"></td>
          <th v-for="column in columns" :key="column.field">{{column.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in dataSource" :key="item.id">
          <td><input type="checkbox" @change="onChageItem(item, index, $event)"
          :checked="selectedItems.filter((i)=> i.id === item.id).length > 0"
          /></td>
          <td v-if="numberVisible">{{item.id}}</td>
          <template>
            <td v-for="column in columns" :key="column.field">{{item[column.field]}}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GuluTable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource:{
      type: Array,
      required: true,
      validator(arr){
        return !(arr.filter(item => item.id === undefined).length > 0)
      }
    },
    numberVisible:{
      type: Boolean,
      default: false
    },
    bordered:{
      type: Boolean,
      default: false
    },
    compact:{
      type: Boolean,
      default: false
    },
    striped:{
      type: Boolean,
      default: true
    },
    selectedItems:{
      type: Array,
      //如果default的值直接是[] , 一旦table有多个的时候就会共用[] ; 所以要()=> []
      default: ()=> []
    }
  },
  components:{},
  data(){
    return{

    }
  },
  created(){},
  computed:{},
  methods:{
    onChageItem(item, index, e){
      //单向数据流的原则是：如果数据源的获得是从props里面获得的，是不能修改这个数据的，只能通知父级组件修改
      //还有一种解决方案是拷贝一份，把要修改push到拷贝的那个变量里边
      //全拷贝  
      let selected=  e.target.checked
      let copy = JSON.parse(JSON.stringify(this.selectedItems))
      if(selected){
        copy.push(item)
      }else{
        copy = copy.filter(i => i.id !== item.id)
        //因为copy是全拷贝出来的新对象，而item不是全拷贝的对象，所以通过indexOf(item)，是怎么比较都找不到相同的
        //copy.splice(copy.indexOf(item), 1)
      }
      //console.log(copy)
      this.$emit('update:selectedItems', copy)
    },
    onAllChageItem(e){
      this.$emit('update:selectedItems', e.target.checked ? this.dataSource : [])
      //不要操作dom
      //单向数据流
    }
  },
  watch:{
    selectedItems(){
      if(this.selectedItems.length > 0){
        this.$refs.allChecked.indeterminate = true
      }
      if(this.selectedItems.length === 0){
        this.$refs.allChecked.checked = false
        this.$refs.allChecked.indeterminate = false
      }
      if(this.selectedItems.length === this.dataSource.length){
        this.$refs.allChecked.checked = true
        this.$refs.allChecked.indeterminate = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.gulu-table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-bottom:1px solid gray;
  &.bordered{
    border: 1px solid gray;
    td, th{
      border:1px solid gray;
    }
  }
  &.compact{
    td, th{
      padding: 4px;
    }
  }
  td,th{
    border-bottom: 1px solid grey;
    text-align: left;
    padding: 8px;
  }
  &.striped{
    tbody{
      > tr{
        &:nth-child(add){
          background: white;
        }
        &:nth-child(even){
          background: rgb(240, 240, 240);
        }
      }
    }
  }
}

</style>

<template>
  <div class="gulu-uploader">
      <div @click="onClickUpload">
          <slot></slot>
      </div>
      <div ref="temp" style="width: 0; height: 0; overflow: hidden;"></div>

      <ol>
          <li v-for="(item,index) in fileList" :key="index">
               <img :src="item.url" width="100" height="100">
              {{item.name}}
          </li>
      </ol>
  </div>
</template>

<script>
export default {
  name: 'GuluUpload',
  components:{},
  props:{
      name: {
          type: String,
          required: true
      },
      action:{
          type: String,
          required: true
      },
      method:{
          type: String,
          default: 'POST'
      },
      parseResponse:{
          type: Function,
          required: true
      },
      fileList: {
          type: Array,
          default: ()=>[]
      }
  },
  data(){
    return{
        url: 'about:blank'
    }
  },
  created(){
  },
  computed:{},
  methods:{
      onClickUpload(){
          let input = this.createInput()
          input.addEventListener('change', ()=>{
             let file = input.files[0]
              this.uploadFile(file)
             input.remove()
          })
          input.click()
      },
      uploadFile(file){
          let fromData = new FormData()
          fromData.append(this.name, file)
          this.doUploadFile(fromData, (response)=>{
              let {name, size, type} = file
              let url = this.parseResponse(response)
              this.url = url
              this.$emit('update:fileList', [...this.fileList, {name, type, size, url}])
          })
      },
      doUploadFile(fromData, success){
          var xhr = new XMLHttpRequest()
          xhr.open(this.method, this.action)
          //发送请求后的回调事件
          xhr.onload= ()=>{
              success(xhr.response)

              //console.log(xhr.response)
              // //为什么服务器不直接把对象传给前端
              // //http协议只支持字符串或者二进制，图片就是二进制
              // JSON.parse(xhr.response) //反序列化，字符串=》对象
              // let url = this.parseResponse(xhr.response)
              // this.url = url
          }
          xhr.send(fromData)
      },
      createInput(){
          let input = document.createElement('input')
          input.type = 'file'
          this.$refs.temp.appendChild(input)
          return input
      },
  },
  watch:{

  }
}
</script>
<style scoped lang="scss">

</style>

<template>
    <!-- <g-cascader :source="source"></g-cascader> -->
    <div>
        {{selectedList}}
        <g-table :columns="columns" :data-source="dataSource" :selected-items.sync="selectedList"></g-table>
    </div>
</template>
<script>
import Cascader from './cascader'
import GTable from './table'
import { constants } from 'fs';
export default{
    name: 'demo',
    components:{
        'g-cascader': Cascader,
        'g-table': GTable
    },
    data(){
        return{
            selectedList:[],
            dataSource: [
                {id: '1',name: '张三', score: 100},
                {id: '2',name: '李四', score: 0},
                {id: '3',name: '王五', score: 50},
                {id: '4',name: '赵六', score: 62},
                {id: '5',name: '赛亚', score: 25},
                {id: '6',name: '亚瑟', score: 65},
            ],
            columns: [
                {text: '姓名', field: 'name'},
                {text: '分数', field: 'score'}
            ]
            // source:[
            //     {
            //         name: '浙江',
            //         children:[
            //             {
            //                 name: '杭州',
            //                 children: [
            //                     {name: '上城'},
            //                     {name: '江干'},
            //                 ]
            //             },
            //             {
            //                 name: '嘉兴',
            //                 children: [
            //                     {name: '南湖'},
            //                     {name: '秀洲'},
            //                     {name: '嘉善'},
            //                 ]
            //             }
            //         ]
            //     },
            // ],
            }
    },
    methods:{
      
    }
}
</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --button-height: 32px;
    --font-size: 14px;
    --button-bg: white;
    --button-active-bg: #eee;
    --border-radius: 4px;
    --color: #999;
    --border-color: #999;
    --border-color-hover: #666;
}

#app {
    margin: 20px
}

body {
    font-size: var(--font-size)
}
</style>

<template>
    <g-cascader :source="source"></g-cascader>
</template>
<script>
import Cascader from './cascader'
export default{
    name: 'demo',
    components:{
        'g-cascader': Cascader
    },
    data(){
        return{
            source:[
                {
                    name: '浙江',
                    children:[
                        {
                            name: '杭州',
                            children: [
                                {name: '上城'},
                                {name: '江干'},
                            ]
                        },
                        {
                            name: '嘉兴',
                            children: [
                                {name: '南湖'},
                                {name: '秀洲'},
                                {name: '嘉善'},
                            ]
                        }
                    ]
                },
                {
                    name: '福建',
                    children:[
                        {
                            name: '福州',
                            children: [
                                {name: '鼓楼'},
                            ]
                        }
                    ]
                },
                {
                    name: '广东',
                    children:[
                        {
                            name: '广州',
                            children: [
                                {name: '越秀'},
                                {name: '天河'},
                            ]
                        },
                        {
                            name: '深圳',
                            children: [
                                {name: '南山'},
                                {name: '龙岗'},
                                {name: '宝安'},
                            ]
                        }
                    ]
                },
            ],
            }
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

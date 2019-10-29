<template>
<div id="layout-tree" class="rules-panel">
  <div class="rules-panel-title">
    <span >规则分类</span>
  </div>
    <el-tree  class="rulestree" :data="ruleTypeList" :current-node-key="queryCondition.ruleType" node-key="id" :default-expand-all="true" :props="defaultProps" :highlight-current="true" :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>

</div>   
</template>
<script>
    import commonAjax from 'components/js/common.js'
    import { mapState,mapActions } from 'vuex'
    export default{
        data(){
            return {
                screenHeight:document.documentElement.clientHeight,
                ruleTypeList:[{
                    name: '测试数据',
                    children: [{
                        name:'违规行为',
                        children: [{name: '权限审计'},{name:'终端审计'},{name:'权限审计'}]
                        },{
                            name: '恶意代码',
                            children:[{name:'蠕虫'},{name:'木马病毒'},{name:'僵尸网络'}]
                        },{
                            name: '攻击行为',
                            children:[{name:'****'}]
                        }]
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        mounted:function(){
            document.getElementById('layout-tree').style.height=document.documentElement.clientHeight-80+"px";//页面初始化
            window.onresize = () => {
                return (() => {
                        this.screenHeight = document.documentElement.clientHeight
                })()
            };
            commonAjax.req('/ssa/ruleManage2/getRuleTypeJson.do').then((data)=>{
                this.ruleTypeList.splice(0,1,data);
                this.setRuleTypeList(this.ruleTypeList[0].children);
                console.log(data)
            })
        },
        watch:{
            screenHeight (val) {
                this.screenHeight = val
                document.getElementById('layout-tree').style.height=this.screenHeight-80+"px";//检测窗口的大小，并赋值
            }
        },
        computed:{
            ...mapState({
                queryCondition:state=>state.context.queryCondition
            })
        },
        methods:{
            ...mapActions({
			    setRuleTypeList:'setRuleTypeList',
                getRuleList:'getRuleList'

            }),
            handleNodeClick:function(data){
                this.queryCondition.ruleType=data.id;
                this.getRuleList();
            }
        }
    }
</script>
<style>
    .bg-layout-tree { background-color: white; }
</style>
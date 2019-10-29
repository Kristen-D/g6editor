<template>
    <div>
            <el-popover
                ref="popover4"
                placement="right"
                width="70"
                trigger="click">
                <el-checkbox-group v-model="checkHeadCols" @change="setHeadCols(checkHeadCols)">
                    <el-checkbox
                        v-for="col in tableHeadCols"
                        :label="col.label" :disabled="col.disabled">
                    </el-checkbox>

                </el-checkbox-group>
            </el-popover>
        <el-row :gutter="10">
            <hr style="margin:5px;height:1px;border:0px;background-color:#D5D5D5;color:#D5D5D5;"/>

            <el-col :span="1"><el-button type="primary" @click="newRuleView">新增</el-button></el-col>
            <el-col :span="1"><el-button type="primary" @click="delMultiRuleScene">删除</el-button></el-col>
            <el-col :span="1" :offset="17"><el-button type="primary" v-popover:popover4><i class="fa fa-cog fa-lg"></i></el-button></el-col>
            <el-col :span="1"><el-button type="primary" @click="refresh"><i class="fa fa-refresh fa-lg"></i></el-button></el-col>
        </el-row>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default{
    data(){
        return {

            checkHeadCols:[]
        }
    },
    computed:{
    ...mapState({
       tableHeadCols:state=>state.content.tableHeadCols,
       queryCondition:state=>state.content.queryCondition,
       multipleSelection:state=>state.content.multipleSelection
    })},
     methods:{

            ...mapActions({
			    setEditPanel:'setEditPanel',
                setHeadCols:'setHeadCols',
                getRuleSceneList:'getRuleSceneList',
                delMultiRuleScene:'delMultiRuleScene',
                newRuleScene:'newRuleScene',
                setSceneConf:'setSceneConf'
            }),
            newRuleView:function(){
                var sceneConf={name:'', desc:'新增场景展示',rule:1,url:'http://about:blank',new:true};
                this.setSceneConf(sceneConf);
                this.setEditPanel(1);
            },
            refresh:function(){
                this.getRuleSceneList(this.queryCondition);
            }
    }
}
</script>
<style>
.el-checkbox {
    margin-left: 15px;
}
</style>
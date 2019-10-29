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
        <el-row :gutter="20">
            <hr style="margin:5px;height:1px;border:0px;background-color:#D5D5D5;color:#D5D5D5;"/>

            <el-col :md="2" :lg="1"><el-button type="primary" @click="newRule">新增</el-button></el-col>
            <!--el-col :md="2" :lg="1"><el-button type="primary">导入</el-button></el-col-->
            <el-col :md="2" :lg="1"><el-button type="primary" @click="delMultiRule">删除</el-button></el-col>
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
       tableHeadCols:state=>state.context.tableHeadCols,
       queryCondition:state=>state.context.queryCondition,
       multipleSelection:state=>state.context.multipleSelection
    })},
     methods:{

            ...mapActions({
			    setEditPanel:'setEditPanel',
                setHeadCols:'setHeadCols',
                getRuleInfo:'getRuleInfo',
                delMultiRule:'delMultiRule',
                newRuleInfo:'newRuleInfo',
                getRuleOutputCondition:'getRuleOutputCondition',
                getRuleConfig:'getRuleConfig'
            }),
            newRule:function(){
                this.newRuleInfo();
                this.setEditPanel(1);
            },
            refresh:function(){
                this.getRuleInfo(this.queryCondition);
            }
    }
}
</script>
<style>
.el-checkbox {
    margin-left: 15px;
}
</style>
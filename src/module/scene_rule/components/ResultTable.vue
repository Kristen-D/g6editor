<template>
    <div class='row'>
        <el-table :data="sceneList" border tooltip-effect="dark"  style="width: 100%"  :default-sort = "{prop: 'ruleId', order: 'descending'}"  @selection-change="handleSelectionChange">
                <el-table-column type="selection"  width="60"></el-table-column>

                <el-table-column 
                    v-for="col in showHeadCols"
                    :prop="col.prop" :label="col.label" :show-overflow-tooltip="true" :sortable="true">
                </el-table-column>

                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                        size="small" type="text"
                        @click="handleView(scope.$index, scope.row)">展示</el-button>
                        <el-button
                        size="small" type="text"
                        @click="handleSetting(scope.$index, scope.row)">设置</el-button>
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-row  type="flex" class="row-bg" justify="end" align="middle">
            <el-col :span="2"><span>每页显示</span></el-col>
            <el-col :span="7">
                <el-pagination
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryCondition.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="queryCondition.pageSize"
                layout="sizes, prev, pager, next"
                :total="total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
    export default {
        computed:{
            ...mapState({
                tableHeadCols:state=>state.content.tableHeadCols,
                checkHeadCols:state=>state.content.checkHeadCols,
                sceneList:state=>state.content.sceneList,
                queryCondition:state=>state.content.queryCondition,
                total:state=>state.content.total
               

        }),showHeadCols:function(){
            var index;
            var result=[];
            var check=this.checkHeadCols.join(";");

            for(index in this.tableHeadCols){

                if(check.indexOf(this.tableHeadCols[index].label)>=0){
                    result.push(this.tableHeadCols[index]);
                }
            }
            
            return result;
        }
        },
        methods:{
            ...mapActions({
			    setQueryCondition:'setQueryCondition',
                getRuleSceneList:'getRuleSceneList',
                setEditPanel:'setEditPanel',
                setEditRuleId:'setEditRuleId',
                getRuleById:'getRuleById',
                deleteRuleSceneById:'deleteRuleSceneById',
                setMultipleSelection:'setMultipleSelection',
                setSceneConf:'setSceneConf',
                setIsShowConf:'setIsShowConf'
            }),
            
            handleSelectionChange(val) {
                this.setMultipleSelection(val);
                //console.log(val[val.length-1].ruleId);
            }, 
            handleSizeChange(val) {
                this.queryCondition.pageSize=val;
                this.setQueryCondition(this.queryCondition);
                this.getRuleSceneList(this.queryCondition);
                console.log('每页 '+val+'条');
            },
            handleCurrentChange(val) {
                this.queryCondition.currentPage = val;
                this.setQueryCondition(this.queryCondition);
                 this.getRuleSceneList(this.queryCondition);
                console.log('当前页:'+val);
            },
            handleView(index,row){
                this.setEditPanel(1);
                var sceneConfig={};
                sceneConfig.name=row.sceneName;
                sceneConfig.id=row.id;
                sceneConfig.desc=row.sceneDesc;
                sceneConfig.rule=row.ruleId;
                sceneConfig.url=row.url;
                sceneConfig.new=false;
                this.setSceneConf(sceneConfig);
                this.setIsShowConf(false);
            },
            handleSetting(index,row){
                this.setEditPanel(1);
                var sceneConfig={};
                sceneConfig.name=row.sceneName;
                sceneConfig.id=row.id;
                sceneConfig.desc=row.sceneDesc;
                sceneConfig.rule=row.ruleId;
                sceneConfig.url=row.url;
                sceneConfig.new=false;
                this.setSceneConf(sceneConfig);
                this.setIsShowConf(true);
            },
            handleDelete(index,row){
                
                this.deleteRuleSceneById(row.id);
            }

        }
        

    }
</script>
<style>
    .el-pagination .el-select .el-input {
    width: 60px;
}
</style>
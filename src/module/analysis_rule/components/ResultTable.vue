<template>
    <div class='row'>
        <el-table :data="ruleList" border tooltip-effect="dark"  style="width: 100%"  :default-sort = "{prop: 'ruleId', order: 'ascending'}"  @selection-change="handleSelectionChange">
                <el-table-column type="selection"  width="60"></el-table-column>

                <el-table-column 
                    v-for="col in showHeadCols"
                    :prop="col.prop" :label="col.label" :show-overflow-tooltip="true" :sortable="true" :formatter="formatter">
                </el-table-column>

                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
                :total="ruleTotal">
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
                tableHeadCols:state=>state.context.tableHeadCols,
                checkHeadCols:state=>state.context.checkHeadCols,
                ruleList:state=>state.context.ruleList,
                queryCondition:state=>state.context.queryCondition,
                ruleTotal:state=>state.context.ruleTotal,
                subSystemList:state=>state.context.subSystemList

        }),
        showHeadCols:function(){
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
                getRuleInfo:'getRuleInfo',
                setEditPanel:'setEditPanel',
                setEditRuleId:'setEditRuleId',
                getRuleById:'getRuleById',
                deleteRuleById:'deleteRuleById',
                setMultipleSelection:'setMultipleSelection',
                getRuleConfig:'getRuleConfig',
                getRuleOutputCondition:'getRuleOutputCondition'
            }),
            
            handleSelectionChange(val) {
                this.setMultipleSelection(val);
                //console.log(val[val.length-1].ruleId);
            }, 
            handleSizeChange(val) {
                this.queryCondition.pageSize=val;
                this.setQueryCondition(this.queryCondition);
                this.getRuleInfo(this.queryCondition);
                console.log('每页 '+val+'条');
            },
            handleCurrentChange(val) {
                this.queryCondition.currentPage = val;
                this.setQueryCondition(this.queryCondition);
                 this.getRuleInfo(this.queryCondition);
                console.log('当前页:'+val);
            },
            handleEdit(index,row){
                console.log(row.ruleName);
                this.setEditRuleId(row.ruleId);
                this.setEditPanel(1);
                this.getRuleById();
                this.getRuleConfig();
                this.getRuleOutputCondition();
            },
            handleDelete(index,row){
                console.log(index);
                this.deleteRuleById(row.ruleId);
            },
            formatter(row,column){
                var property=column.property
                if(property=='status'){
                    if(row[property]==1)
                        return '正常'
                    else 
                        return '修改中'
                }else if(property=='subSystem'){
                    var subSystemId=row[property];
                    for(var i=0;i<this.subSystemList.length;i++){
                        if(this.subSystemList[i].value==subSystemId)
                            return this.subSystemList[i].name
                    }
                }else{
                    return  row[property]
                }
            }

        },
        mounted:function(){
            this.getRuleInfo(this.queryCondition);   
        }
        

    }
</script>
<style>
    .el-pagination .el-select .el-input {
    width: 60px;
}
</style>
<template>
    <div class='row'>
        <el-table :data="tableList" border tooltip-effect="dark"  style="width: 100%"  :default-sort = "{prop: 'staffId', order: 'ascending'}"  @selection-change="handleSelectionChange">
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
                :total="tableTotal">
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
                tableList:state=>state.content.tableList,
                queryCondition:state=>state.content.queryCondition,
                tableTotal:state=>state.content.tableTotal,
                listRank:state=>state.content.listRank
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
                getStaffList:'getStaffList',
                setEditPanel:'setEditPanel',
                getStaffById:'getStaffById',
                deleteStaffById:'deleteStaffById',
                setMultipleSelection:'setMultipleSelection',
                setStaff:'setStaff'
            }),
            
            handleSelectionChange(val) {
                this.setMultipleSelection(val);
               
            }, 
            handleSizeChange(val) {
                this.queryCondition.pageSize=val;
                
                this.getStaffList(this.queryCondition);
                
            },
            handleCurrentChange(val) {
                this.queryCondition.currentPage = val;
                
                this.getStaffList(this.queryCondition);
                
            },
            handleEdit(index,row){
                this.setEditPanel(1);
                this.setStaff(row);
            },
            handleDelete(index,row){
                this.deleteStaffById(row.id);
            },
            formatter(row,column){
                var property=column.property
                if(property=='rank'){
                    for(var i=0;i<this.listRank.length;i++){
                        if(this.listRank[i].value==row[property])
                            return this.listRank[i].name
                    }
                }else
                    return row[property]
            }

        },
        mounted:function(){
             
        }
        

    }
</script>
<style>
    .el-pagination .el-select .el-input {
    width: 60px;
}
</style>
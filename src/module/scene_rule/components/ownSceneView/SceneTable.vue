<template>
    <div class='row'>
        <el-table :data="sceneData" border tooltip-effect="dark"  style="width: 100%">
                <el-table-column 
                    v-for="col in showDataHeadCols"
                    :prop="col.value" :label="col.name" :show-overflow-tooltip="true" :sortable="true">
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
import {mapActions,mapState} from 'vuex'
export default{
       
        data:function(){
            return {
                queryCondition:{
                    currentPage:1,
                    pageSize:10
                }
            }},
        computed:{
            ...mapState({
                showDataHeadCols:state=>state.content.showDataHeadCols
            })
        },
        methods:{
                handleSizeChange:function(){
                    console.log("handleSizeChange... waiting");
                },
                handleCurrentChange:function(){
                    console.log("handleCurrentChange... waiting");
                }
            }
            
        
}
</script>
<style>
    
</style>
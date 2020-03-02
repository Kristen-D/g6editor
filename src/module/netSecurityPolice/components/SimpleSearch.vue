<template>
<el-form :inline="true" :model="staffInfo">
        <el-form-item label="姓名:">
            <el-input v-model="staffInfo.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="警衔:">
            
            <el-select v-model="staffInfo.rank" clearable>
                <el-option
                    v-for="item in listRank"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="警员编号:">
            <el-input v-model="staffInfo.code" placeholder="警员编号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="QueryStaffList">查询</el-button>
        </el-form-item>
</el-form>
</template>
<script>
import {mapActions,mapState} from 'vuex'
    export default{
        data(){
            return{
                staffInfo:{
                    name:'',
                    rank:'',
                    code:''
                }

            }
        },
        computed:{
            ...mapState({
                queryCondition:state=>state.content.queryCondition,
                listRank:state=>state.content.listRank

        })
        },
        methods:{
            ...mapActions({
			    setSearchPanel:'setSearchPanel',
                getStaffList:'getStaffList'
            }),
            QueryStaffList:function(){
                console.log('QueryStaffList');
                
                this.queryCondition.type="simple";
                this.queryCondition.name=this.staffInfo.name;
                this.queryCondition.rank=this.staffInfo.rank;
                this.queryCondition.code=this.staffInfo.code;
                this.queryCondition.currentPage=1;
                this.getStaffList(this.queryCondition);
            }
        }
    }
</script>
<style>
    
</style>
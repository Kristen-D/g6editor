<template>

    <el-form ref="queryCondition" :model="queryCondition" label-width="80px">
        <el-row :gutter="30">
             <el-col :span="8">
                <el-form-item label="规则名称">
                    <el-input v-model="queryCondition.ruleName" placeholder="规则名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="状态">
                    <el-select v-model="queryCondition.status" clearable placeholder="所有状态">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="暂停" value="2"></el-option>
                    <el-option label="异常" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
           <el-col :span="8">
                <el-form-item label="是否告警">
                    <el-select v-model="queryCondition.enableAlarm" clearable placeholder="所有">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>       
        <el-row :gutter="30"> 
            <el-col :span="8">
                <el-form-item label="事件类型">
                    <el-select v-model="queryCondition.eventTypes" multiple placeholder="所有事件">
                        <el-option
                            v-for="item in eventTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" :offset="8">
                <el-form-item>
                    <el-button type="primary" @click="complexQuery">搜索</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="4">
                <el-form-item>
                    <el-button type="text" v-on:click="setSearchPanel(0)">普通搜索<i class="el-icon-arrow-up el-icon--right"></i>
                    </el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
import {mapActions,mapState} from 'vuex'
    export default {
        data(){
            return{
                eventTypeList: [{
                    value: 1,
                    name: '性能告警'
                    }, {
                    value: 2,
                    name: '路由器错误消息'
                    }, {
                    value: 3,
                    name: 'web访问'
                    }, {
                    value: 4,
                    name: '网络链接'
                    }, {
                    value: 5,
                    name: '系统命令'
                    }]
               
            }
        },
        computed:{
        ...mapState({
            queryCondition:state=>state.context.queryCondition
        })
        },
        methods:{
            ...mapActions({
			    setSearchPanel:'setSearchPanel',
                getRuleList:'getRuleList'
            }),
            complexQuery:function(){
                this.queryCondition.currentPage=1;
                this.queryCondition.type='complex';
                console.log(this.queryCondition.eventTypes);
                this.getRuleList();
            }
        }
    }
</script>
<style>
.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}
.el-row {
    margin-bottom: 5px;
}
.el-date-editor--daterange.el-input {
    width: 100%;
}
</style>
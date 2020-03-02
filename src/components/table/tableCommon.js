export default {
  data() {
    return {
        total:0,
        loading: false,
        tableData:[],
    
        editRowIndex:-1,
        editRowTemp:{},
        multipleSelection:[],
        //默认ajax属性
        tableUrl:"",
        saveUrl:"",
        delUrl:"",
    }
  }
}

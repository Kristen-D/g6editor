
export default {
  data() {
    return {
       sourceData:[],
       lvData:{},
       pidData:{},
       idData:{},
       idKey:"c-tree-id",
    };
  },
  methods:{
    initDataByChildren(){
      let root = {};
      root[this.idKey] = this.rootIdKey;
      root[this.levelKey] = 0;
      this.initChildren(this.sourceData,root);
    //  console.log(this.pidData )
    },

    initChildren(clist,pitem){

      for (var i = 0,len = clist.length; i < len; i++) {
              let d = clist[i];
              d.isActive = false;
              let lv = pitem.lv+1;
              d[this.levelKey] = lv;
              let id = d[this.valueKey];
              d[this.idKey] = id;
              let pid = pitem[this.idKey];
              d[this.pidKey] = pid;
              let children = d[this.childrenKey];
              if(id == pid){
                console.error("ID与父ID不可相同,"+JSON.stringify(d));
                return;
              }
              if(this.loadData && this.maxLevel > lv)d.hasChild = true;
              else d.hasChild = Boolean(children);
              this.idData[id] = d;
              this.addDataByKey(d,pid,this.pidData);
              this.addDataByKey(d,lv,this.lvData);
            //  console.log(JSON.stringify(d))
              if(children&&children.length>0)this.initChildren(children,d);
      }
    },
    initDataBylevel(){

    },

    setPid(pid,d){
      if(!pid && pid !=0 ){
        if(this.rootIdKey) pid = this.rootIdKey;
        else pid = -1;
        d[this.pidKey] = pid;
      }
      return pid;
    },
    initDataByPid(){
       for (var i = 0,len = this.sourceData.length; i < len; i++) {
         let d = this.sourceData[i];
        d.isActive = false;
         let id = d[this.valueKey];
         d[this.idKey] = id;
         let pid = d[this.pidKey];
         pid = this.setPid(pid,d);

         if(id == pid){
           console.error("ID与父ID不可相同,"+JSON.stringify(d));
           return;
         }
         if(this.maxLevel >1)d.hasChild = true;
         else d.hasChild = false;
         this.idData[id] = d;

         this.addDataByKey(d,pid,this.pidData);
       }
       this.fmtDataByPid(this.rootIdKey,1);

    },
    fmtDataByPid(pid,lv){
       let data = this.pidData[pid];
       if(!data){
         if(lv == 1)console.error("pid:"+pid+",找不到该id对应数据");
         return;
       }
       if(lv!=1){
         let pdata = this.idData[pid];
         pdata.children = data;
         pdata.hasChild = true;
       }
       data.forEach(d=>{
         d.lv = lv;
         this.addDataByKey(d,lv,this.lvData);
         this.fmtDataByPid(d[this.valueKey],lv+1);
       })
    },
    addDataByKey(d,key,data){
      let dArry = data[key];
      if(!dArry){
        dArry = [];
        data[key] = dArry;
      }
      dArry.push(d);
    },

  }
}

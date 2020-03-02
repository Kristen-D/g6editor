 import chartAjax from '../../api/home-ajax.js'
import * as types from '../mutation-types'
const state = {
   gridBase:{
     "high":{
       id:"high",
       url:"1",
       active:true,
       showSort:true,
       columns:[{key:"id",name:"id"},{key:"events",name:"威胁事件"},{key:"store",name:"威胁来源"},
       {key:"grade",name:"威胁等级",
      fmt:function(val,row,index){
           var msg = "";
           if(val == 1) msg = "严重";
           else   msg = "普通";
           return msg;
         }
       }

     ]
     },
     "mid":{
       id:"mid",
       url:"1",
       active:false,
       columns:[{key:"id",name:"id"},{key:"events",name:"威胁事件2"},{key:"store",name:"威胁来源2"},{key:"grade",name:"威胁等级2"}]
     },
     "low":{
       id:"low",
       url:"1",
       active:false,
       columns:[{key:"id",name:"id"},{key:"events",name:"威胁事件3"},{key:"store",name:"威胁来源3"},{key:"grade",name:"威胁等级3"}]
     }


   }
}


export default {
  state
}

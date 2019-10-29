
<script>
import dataDetail from './DataDetail.vue'
import showPic from './ShowPic.vue'
import dataDetailHarmful from './DataDetailHarmful.vue'
export default {
  	components: {dataDetail,showPic,dataDetailHarmful},
    data(){
      return {
      }
    },
    props:['config'],
    methods:{
      getGridRef(){
         this.$refs[this.config.i];
      }
    },
    created:function(){
    //  console.log(  this.$scopedSlots.default)
      this.$options.render = h => h(this.config.component,
      {
        props: {
          data: this.config.data,
        },
        ref:this.config.i,
      });

    },
    mounted:function(){

    }
}
</script>

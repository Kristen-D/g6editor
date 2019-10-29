<template>
    <div v-if="show">
        <div style="background:url('/static/img/fullscreen.jpg');cursor: pointer;position: absolute;right:0px;top:0px;width:20px; height:20px;background-size:20px 20px;z-index:100"
            @click="toggleFullscreen()"></div>
        <el-carousel indicator-position="none" style="height:100%;position:absolute;width:100%;" :interval="interval" @change="change">
            <el-carousel-item v-for="(url, index) in urls" :key="url">
                <iframe :src="url" style="width:100%;height:100%;" frameborder="no" :ref="'iframe' + index"></iframe>
            </el-carousel-item>
            <!-- <el-carousel-item>
            <big-network-attack-gdnx>
            </big-network-attack-gdnx>
        </el-carousel-item>  -->
            <!-- <el-carousel-item>

            <big-oversea-attack-gdnx>
            </big-oversea-attack-gdnx>
        </el-carousel-item>
        <el-carousel-item>
            <big-threat-gdnx></big-threat-gdnx>
        </el-carousel-item> -->
        </el-carousel>
    </div>
</template>

<script>
    // import bigNetworkAttackGdnx from '../../big_networkAttack_gdnx/components/Context.vue'
    // import bigOverseaAttackGdnx from '../../big_oversea_attack_gdnx/components/Container.vue'
    // import bigThreatGdnx from '../../big-threat-gdnx/components/container.vue'
    import { toggleFullscreen } from '../service/fullscreen.js'
    import { getCarouselScrollInterval } from "../service/getData.js"

    export default {
        data() {
            return {
                interval: 3000,
                show: false,
                urls: ["/ssa/netattack_gdnx/begin.do",
                    "/ssa/bigGznxOffshoreAttack/begin.do",
                    "/ssa/bigThreadGdnx/begin.do"]
                // urls: [
                //     "/module/big_networkAttack_gdnx.html",
                //     "/module/big_oversea_attack_gdnx.html",
                //     "/module/big-threat-gdnx.html"
                // ]
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            async fetchData() {
                let result = await getCarouselScrollInterval()
                if (result.state) {
                    this.interval = result.data
                    this.show = true
                }
            },
            change(index) {
                let fetchData = this.$refs["iframe" + index][0].contentWindow.fetchData
                if (fetchData != null) {
                    fetchData.forEach(method => {
                        method();
                    });
                }
            },
            toggleFullscreen
        },
        components: {
            // bigNetworkAttackGdnx,
            // bigOverseaAttackGdnx,
            // bigThreatGdnx
        },
        name: "app"
    }
</script>
<style>
    .el-carousel__container {
        height: 100%;
        width: 100%;
    }
</style>
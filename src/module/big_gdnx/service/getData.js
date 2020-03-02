import common from 'components/js/common.js'


/**
 * 获取滚动间隔
 */
export const getCarouselScrollInterval = () => {
    return common.reqBackState("/ssa/bigGdnx/getCarouselScrollInterval.do")
}

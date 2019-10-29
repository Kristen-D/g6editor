export default class dateUtil {
  static getWeekCounts (year, month) {
    let firstWeekStart = new Date(year, month, 1).getDay()
    let nextMonthDays = new Date(year, month + 1, 32).getDate()

    // 处理下 周日
    let firstWeekStartNumber = firstWeekStart === 0 ? 7 : firstWeekStart
    
    return Math.ceil((32 - nextMonthDays - (7 - firstWeekStartNumber + 1)) / 7 + 1)
  }

  static getMonthCounts (year, month) {
    let nextMonthDays = new Date(year, month + 1, 32).getDate()
    return 32 - nextMonthDays
  }

  static getMonthData (year, month) {
    let result = [];
    let firstWeekStart = new Date(year, month, 1).getDay()

    if (firstWeekStart !== 0) { // 统计上个月还有的天数
      let lastMonthEndDay = new Date(year, month, 0).getDate()
      for (let i = firstWeekStart - 1; i > 0; i--) {
        result.push({
          month: month - 1,
          day: lastMonthEndDay - i
        })
      }
    }

    let weekCounts = dateUtil.getWeekCounts(year, month)
    let monthCounts = dateUtil.getMonthCounts(year, month)
    let lastMonthDays = result.length

    for (let i = lastMonthDays; i < weekCounts * 7; i++) {
      if (i - lastMonthDays < monthCounts + 1) {
        result.push({
          month: month,
          day: i - lastMonthDays + 1
        })
      } else {
        result.push({
          month: month + 1,
          day: i - lastMonthDays - monthCounts
        })
      }
    }

    return result
  }
}
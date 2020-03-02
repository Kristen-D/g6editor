<script>
export default {
  methods: {
    getPercentWithPrecision(valueList, idx, precision) {
      if (!valueList[idx]) { return 0 }
      let sum = valueList.reduce((acc, val) => {
        return acc + (isNaN(val) ? 0 : val)
      }, 0)
      if (sum === 0) { return 0 }
      console.log('sum', sum)// sum 9   
      let digits = Math.pow(10, precision)// digits 100   10的precision 次幂
      console.log('digits', digits)
      let votesPerQuota = valueList.map((val) => {
        return (isNaN(val) ? 0 : val) / sum * digits * 100 // 扩大比例，这样可以确保整数部分是已经确定的议席配额，小数部分是余额   
      })
      console.log('votesPerQuota', votesPerQuota)// votesPerQuota [ 2222.222222222222, 4444.444444444444, 3333.333333333333 ] 每一个项获得的议席配额，整数部分是已经确定的议席配额，小数部分是余额    
      let targetSeats = digits * 100 // targetSeats 10000 全部的议席    
      console.log('targetSeats', targetSeats)
      let seats = votesPerQuota.map((votes) => {
        // Assign automatic seats.    
        return Math.floor(votes)
      })
      console.log('seats', seats)// seats [ 2222, 4444, 3333 ] 获取配额的整数部分   
      let currentSum = seats.reduce((acc, val) => {
        return acc + val
      }, 0)
      console.log('currentSum', currentSum)// 9999 表示已经配额了9999个议席，还剩下一个议席    
      let remainder = votesPerQuota.map((votes, idx) => {
        return votes - seats[idx]
      })
      console.log('remainder', remainder)// [ 0.2222222222221717, 0.4444444444443434, 0.33333333333303017 ] 得到每一项的余额
      // Has remainding votes. 如果还有剩余的坐席就继续分配   
      while (currentSum < targetSeats) {
        // Find next largest remainder. 找到下一个最大的余额       
        let max = Number.NEGATIVE_INFINITY
        let maxId = null
        for (let i = 0, len = remainder.length; i < len; ++i) {
          if (remainder[i] > max) {
            max = remainder[i]
            maxId = i
          }
        }
        // max: 0.4444444444443434, maxId 1
        // Add a vote to max remainder.       
        ++seats[maxId]// 第二项，即4的占比的坐席增加1       
        remainder[maxId] = 0
        ++currentSum// 总的已分配的坐席数也加1   
      }
      return seats[idx] / digits
    }
  }


}
</script>

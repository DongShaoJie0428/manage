<template>
  <ve-line :data="chartData"/>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
        rows: [
          { 'cost': 1523, 'date': '01/01', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
          { 'cost': 1223, 'date': '01/02', 'profit': 1523, 'growthRate': 0.345, 'people': 100 },
          { 'cost': 2123, 'date': '01/03', 'profit': 1523, 'growthRate': 0.7, 'people': 100 },
          { 'cost': 4123, 'date': '01/04', 'profit': 1523, 'growthRate': 0.31, 'people': 100 },
          { 'cost': 3123, 'date': '01/05', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
          { 'cost': 7123, 'date': '01/06', 'profit': 1523, 'growthRate': 0.65, 'people': 100 }
        ]
      }
    }
  },
  created() {
    fetch('http://123.206.55.50:15000/users/commit')
      .then(res => res.json())
      .then(body => {
        console.log(body, '...body')
        const data = body[0].commit
        // 整理数据
        data.forEach((item, index) => {
          const date = item.date
          // item["1月"] = body[0].commit[data-1] && body[0].commit[data-1].commit
          for (let i = 1; i <= 12; i++) {
            item[`${i}月`] = body[i - 1].commit[date - 1] && body[i - 1].commit[date - 1].commit
          }
          // 删除commit
          delete item.commit
        })
        this.chartData = {
          columns: ['date', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          rows: data
        }
      })
  }
}
</script>

let messages = () => {
  let hour = new Date().getHours()
  switch(hour) {
    case 6:
    case 7:
    case 8:
    case 9:
      return '宝宝早上好，这么早就醒了，真是不容易呀'
    case 10:
    case 11:
      return '刚到公司？歇会儿吧，等会就该吃饭了'
    case 12:
    case 13:
      return '小兔兔，中午了，多吃点好吃的哦'
    case 14:
    case 15:
    case 16: '下午啦，工作再忙也要记得吃苹果，记得还有小饼的爱心坚果'
    case 17:
      return '起来走走，别一直坐着哦，和小饼一起跳起来'
    case 18: '小饼来提醒你补充水分了哦'
    case 19:
      return '赶紧去吃饭饭，不然大灰狼就来了'
    case 20:
    case 21:
      return '还没有回家吗？小饼在家想你了'
    case 22:
    case 23:
      return '要睡觉觉了，第二天才能美美的'
    case 0:
    case 1:
    case 2:
    case 3:
      return '这个点儿了还在看手机？打屁股'
    case 4:
    case 5:
  }
}
module.exports = {
  messages,
}
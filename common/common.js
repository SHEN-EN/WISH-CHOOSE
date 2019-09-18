export function getLastDay(aYear, aMonth){
  let new_date = new Date(aYear, aMonth, 0);
  //这里传入的0代表获取上一个月的最后一天；如果传1，则获得当月的第一天；
  return new_date.getDate();
}

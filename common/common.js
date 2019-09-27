export function getLastDay(aYear, aMonth){
  let new_date
  if (arguments[2]!=undefined) {
     new_date = new Date(aYear, aMonth-1, 0);    
  } else {
     new_date = new Date(aYear, aMonth, 0);
  }
  //这里传入的0代表获取当月的最后一天；如果传1，则获得当月的第一天；
  return new_date.getDate();
}
export function getLastWeek(aYear, aMonth){
  let new_date = new Date(aYear, aMonth-1, 0);
  //这里传入的0代表获取当月的最后一天；如果传1，则获得当月的第一天；
  return new_date.getDay();
}

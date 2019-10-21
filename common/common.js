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
export const wxuuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid
}
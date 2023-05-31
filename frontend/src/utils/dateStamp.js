function dateFormat(d) {
  const myDate = new Date(d);
  const year = myDate.getFullYear();
  const month =
    myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
  const date = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
  const hour = myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
  const min = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
  const sec = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
  const fullDate = `${year}-${month}-${date} ${hour}:${min}:${sec}`;
  return fullDate;
}
export default dateFormat;

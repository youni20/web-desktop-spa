function updateTime(){
  const date = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const time = date.toLocaleTimeString();
  const day = date.toLocaleDateString(undefined, options);
  document.getElementById('time').innerHTML = `${day} <br> ${time}`;
}

setInterval(updateTime, 1000)
updateTime()
console.log("Update Time function ran")

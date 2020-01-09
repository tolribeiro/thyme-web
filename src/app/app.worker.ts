/// <reference lib="webworker" />

var timerStart = true;
var myVar = null;
var d0 = 0;

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;

  function myTimer() {
    d0++;
    postMessage(d0);
  }

  if (timerStart) {
    // get current time
    // repeat myTimer(d0) every 100 ms
    myVar = setInterval(function(){myTimer()}, 100);
    // timer should not start anymore since it has been started
    timerStart = false;
  }
  
  
});

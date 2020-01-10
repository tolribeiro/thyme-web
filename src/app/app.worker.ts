/// <reference lib="webworker" />

var timerStart = true;
var timerVar = null;
var timec = new TimeC(0, 0, 0, 0);

function TimeC(now: number, hours: number, mins: number, secs: number) {
  this.now = now;
  this.hours = hours;
  this.mins = mins;
  this.secs = secs;
}

addEventListener('message', ({ data }) => {
  function tick() {
    timec.now++;
    var remain = timec.now;
    
    timec.hours = Math.floor(remain / 3600);
    remain -= timec.hours * 3600;

    timec.mins = Math.floor(remain / 60);
    remain -= timec.mins * 60;

    timec.secs = remain;
    postMessage(formatOutputTime());
  }

  function currentTime() {
    postMessage(formatOutputTime());
  }

  function formatOutputTime() {
    let hoursStr = '';
    if (shouldShowHour(timec.hours)) { // at least one unit
      hoursStr = setStrWithLeadingZero(timec.hours) + ':';
    }
    return hoursStr + setStrWithLeadingZero(timec.mins) + ':' + setStrWithLeadingZero(timec.secs);
  }

  function shouldShowHour(hrs: number) {
    return hrs > 0;
  }

  function setStrWithLeadingZero(n: number) {
    var nStr = n.toString();
    if (n <= 9) nStr = '0' + nStr; 
    return nStr
  }

  function clearIntervalTime() {
    clearInterval(timerVar);
    currentTime();
    timerStart = true;
  }

  function resetHms() {
    timec = new TimeC(0, 0, 0, 0);
  }

  if (data === 'Start' && timerStart) {
    timerVar = setInterval(function(){tick()}, 1000);
    timerStart = false;
  } else if (data === 'Stop') {
    clearIntervalTime();
  } else if (data === 'Reset') {
    resetHms()
    clearIntervalTime();
  }
  
});

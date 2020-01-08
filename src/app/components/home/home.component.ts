import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('formattedTime', {static: false}) formattedTime: any;
  now = 0;
  hours = 0;
  mins = 0;
  secs = 0;
  timer;
  hasStarted = false;
  hasStopped = false;
  initialTextBtn;
  formattedTimeStr;
  tasks = [];
  shouldAskForTag = false;
  taskDescFormatted: string;
  sessionInfo;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.changeBtnText();
    this.sessionInfo = this.deviceService.os + " (" + this.deviceService.os_version + "), " 
    + this.deviceService.browser + " " + parseInt(this.deviceService.browser_version);
  }

  start(isContinuing?: boolean) {
    this.timer = setInterval(this.tick.bind(this), 1000);
    this.hasStarted = !this.hasStarted;
    if (isContinuing) {
      this.initialTextBtn = 'Stop';
    } else {
      this.changeBtnText();
    }
  }

  changeBtnText() {
    if (!this.hasStarted) {
      this.initialTextBtn = "Start";
    } else if (this.hasStopped) {
      this.initialTextBtn = "Continue";
    } else if (this.hasStarted) {
      this.initialTextBtn = "Stop";
    }
  }

  tick() {
    this.now++;
    var remain = this.now;
    
    this.hours = Math.floor(remain / 3600);
    remain -= this.hours * 3600;

    this.mins = Math.floor(remain / 60);
    remain -= this.mins * 60;

    this.secs = remain;
  }

  reset () {
    this.now = 0;
    this.hours = 0;
    this.mins = 0;
    this.secs = 0;
    this.hasStarted = false;
    this.hasStopped = true;
    this.stop();
  }

  stop (isContinuing?: boolean) {
    clearInterval(this.timer);
    this.timer = null;
    this.hasStopped = !this.hasStopped;
    if (isContinuing) {
      this.initialTextBtn = 'Continue';
    } else {
      this.changeBtnText();
    }
  }

  handleBtnAction(event: any) {
    var btnTxt = event.target.innerText;
    if (btnTxt === 'Start') {
      this.start();
    } else if (btnTxt === 'Stop') {
      this.stop(true);
    } else if (btnTxt === 'Continue') {
      this.start(true);
    } else if (btnTxt === 'Reset') {
      this.reset();
    } else if (btnTxt === 'Finish') {
      this.finish();
    }
  }

  finish() {
    this.reset();
    this.formattedTimeStr = this.formattedTime.nativeElement.innerText;
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    var day = days[ now.getDay() ];
    var month = months[ now.getMonth() ];

    var taskTagStr = " - ";
    if (this.shouldAskForTag) {
      var taskTag = prompt("Enter a name for this task:");
      taskTagStr = " - " + taskTag + " - ";
    }
    this.taskDescFormatted = this.formattedTimeStr + taskTagStr + day + ", " + month + " " + now.getDate() + ", " + now.getFullYear() + " at " + this.addLeadingZero(h) + ":" + this.addLeadingZero(m) + ":" + this.addLeadingZero(s);
    this.tasks.push(this.taskDescFormatted);
  }

  handleTagCheck() {
    this.shouldAskForTag = !this.shouldAskForTag;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  addLeadingZero(n: any) {
    if (n <= 9) {
      return "0" + n.toString();
    }
    return n.toString();
  }

  export() {
    // var fileText = "I am the first part of the info being emailed.\r\nI am the second part.\r\nI am the third part.";
    var fileName = "thyme-tasks-"+ new Date().toLocaleString()  + ".txt";
    var taskLines = "";
    this.tasks.forEach(task => {
      taskLines += task + "\n";
    });
    this.saveTextAsFile(taskLines, fileName);
  }

  saveTextAsFile (data: BlobPart, filename: string) { 
    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    var blob = new Blob([data], {type: 'text/plain'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    // FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var e = document.createEvent('MouseEvents'),
          a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false);
      a.dispatchEvent(e);
    }
  }
}

import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Task } from 'src/app/models/task.interface';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
@Injectable()
export class TimerComponent implements OnInit {
  @ViewChild('formattedTime', {static: false}) formattedTime: any;
  bttnStrArr = [ButtonTitles.Start, ButtonTitles.Reset, ButtonTitles.Finish];
  worker = new Worker('../../app.worker', { type: 'module' });
  elapsedTime = '00:00';
  formattedTimeStr: string;
  shouldAskForTag = false;
  sessionInfo: string;
  taskDescFormatted: string;
  tasks: Task[] = [];

  constructor(private titleService: Title, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.titleService.setTitle(this.getElapsedTimeTitle());
    var retrievedTasks = this.localStorage.retrieve('');
    if (retrievedTasks !== null) {
      this.tasks = retrievedTasks;
    }
  }

  getElapsedTimeTitle() {
    return "(" + this.elapsedTime + ") - Thyme";
  }

  start() {
    this.postMessageToWorker(ButtonTitles.Start);
    if (this.bttnStrArr[0] === ButtonTitles.Start || this.bttnStrArr[0] === ButtonTitles.Continue) {
      this.bttnStrArr[0] = ButtonTitles.Stop;
    } 
  }

  reset () {
    this.postMessageToWorker(ButtonTitles.Reset);
    this.bttnStrArr[0] = ButtonTitles.Start;
  }

  stop () {
    this.postMessageToWorker(ButtonTitles.Stop);
    if (this.bttnStrArr[0] === ButtonTitles.Stop) {
      this.bttnStrArr[0] = ButtonTitles.Continue;
    } 
  }

  postMessageToWorker(message: string) {
    if (typeof Worker !== 'undefined') {
      this.worker.postMessage(message);
      this.worker.onmessage = ({ data }) => {
        this.elapsedTime = data;
        this.titleService.setTitle(this.getElapsedTimeTitle());
      };
    }
  }

  handleBtnAction(event: any) {
    var btnTxt = event.target.innerText;
    if (btnTxt === ButtonTitles.Start) {
      this.start();
    } else if (btnTxt === ButtonTitles.Stop) {
      this.stop();
    } else if (btnTxt === ButtonTitles.Continue) {
      this.start();
    } else if (btnTxt === ButtonTitles.Reset) {
      this.reset();
    } else if (btnTxt === ButtonTitles.Finish) {
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

    var taskTag;
    if (this.shouldAskForTag) {
      while (!taskTag) {
        taskTag = prompt("Enter a name for this task:");
      }
    }
    if (!taskTag) taskTag = '-';
    this.taskDescFormatted = this.formattedTimeStr + taskTag + day + ", " + month + " " + now.getDate() + ", " + now.getFullYear() + " at " + this.addLeadingZero(h) + ":" + this.addLeadingZero(m) + ":" + this.addLeadingZero(s);
    let task = new Task();
    task.time = this.formattedTimeStr;
    task.tag = taskTag;
    task.date = day + ', ' + month + " " + now.getDate() + ", " + now.getFullYear() + " at " + this.addLeadingZero(h) + ":" + this.addLeadingZero(m) + ":" + this.addLeadingZero(s);
    this.tasks.push(task);
    this.localStorage.store('', this.tasks);
    this.bttnStrArr[0] = ButtonTitles.Start;
  }

  addLeadingZero(n: any) {
    if (n <= 9) {
      return "0" + n.toString();
    }
    return n.toString();
  }

  handleTagCheck() {
    this.shouldAskForTag = !this.shouldAskForTag;
  }
}


enum ButtonTitles {
  Start = 'Start',
  Stop = 'Stop',
  Reset = 'Reset',
  Finish = 'Finish',
  Continue = 'Continue'
}


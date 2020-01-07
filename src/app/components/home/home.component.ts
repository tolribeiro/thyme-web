import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  now = 0;
  hours = 0;
  mins = 0;
  secs = 0;
  timer;
  constructor() { }

  ngOnInit() {
    this.start();
  }

  start() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    
    this.now++;
    var remain = this.now;
    
    this.hours = Math.floor(remain / 3600);
    remain -= this.hours * 3600;

    this.mins = Math.floor(remain / 60);
    remain -= this.mins * 60;

    this.secs = remain;

    // Update the display timer
    // if (hours < 10) { 
    //   hours = "0" + hours; 
    // }
    // if (mins < 10) { 
    //   mins = "0" + mins; 
    // }
    // if (secs < 10 ) { 
    //   secs = "0" + secs; 
    // }
    // console.log(hours + ":" + mins + ":" + secs);
    // console.log(this.now);
  }

  reset () {
    this.now = -1;
    this.tick();
  }

  stop () {
    clearInterval(this.timer);
    this.timer = null;
  }

}

import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  sessionInfo: string;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.getCurrentSession();
  }

  getCurrentSession() {
    this.sessionInfo = this.deviceService.os + " (" + this.deviceService.os_version + "), " 
    + this.deviceService.browser + " " + parseInt(this.deviceService.browser_version);
  }

}
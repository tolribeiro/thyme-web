import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input()
  listOfTasks = [];
  
  constructor() { }

  ngOnInit() {
  }

  deleteTask(index: number) {
    this.listOfTasks.splice(index, 1);
  }
}

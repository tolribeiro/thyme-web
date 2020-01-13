import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input()
  listOfTasks: Task[];
  
  constructor() { }

  ngOnInit() {
  }

  deleteTask(index: number) {
    this.listOfTasks.splice(index, 1);
  }
}

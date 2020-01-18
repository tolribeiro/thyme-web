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

  export() {
    var fileName = "thyme-tasks-"+ new Date().toLocaleString()  + ".txt";
    var taskLines = "";
    this.listOfTasks.forEach(task => {
      taskLines += task.time + " - " + task.tag + " - " + task.date + "\n";
    });
    this.saveTextAsFile(taskLines, fileName);
  }

  saveTextAsFile (data: BlobPart, filename: string) { 
    if (!data) {
      console.error('Console.save: No data')
      return;
    }

    if (!filename) filename = 'console.json'

    var blob = new Blob([data], {type: 'text/plain'});
    var e = document.createEvent('MouseEvents');
    var a = document.createElement('a');

    // FOR IE:
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var e = document.createEvent('MouseEvents');
      var a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false);
      a.dispatchEvent(e);
    }
  }
}

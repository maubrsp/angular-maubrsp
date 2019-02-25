import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { StateService } from '../../services/application/state.service';
// import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private stateService: StateService) {}
  ngOnInit() {}

  ngAfterViewInit() {}
}

import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import anime from 'animejs';
import { AppService } from '../../services/application/app.service';
import { StateService } from '../../services/application/state.service';
// import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, AfterViewInit {
  pageData: any;
  categories: any;
  currentPage: number = 0;
  totalPages: any[];
  dataWithError: any;
  preloaderVisible: boolean = true;
  selectedCategory: string = '';
  selectedCategoryName: string = '';
  showSelector: boolean = false;
  imagesPaths: any = { 320: '320x190', 768: '640x380', 1024: '708x418' };
  screenBreakPoints: any[] = [320, 520, 1024];
  currentBreakPoint: string = this.imagesPaths[this.screenBreakPoints[0]];
  isScrolled: boolean = false;
  listView: any = null;
  headerView: any = null;
  currentStep: number = 0;
  totalSteps: number = 2;

  constructor(private router: Router, private stateService: StateService) {}
  ngOnInit() {}

  ngAfterViewInit() {}
}

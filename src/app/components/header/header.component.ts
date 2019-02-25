import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  private isScrolled: boolean = false;

  private buttonText: string = 'Hello World!!!';
  private menuIconName: string = '#menu';
  private menuButtonMode: boolean = true;

  private _styles: Object;
  @Input()
  public get styles(): Object {
    return this._styles;
  }
  public set styles(value: Object) {
    this._styles = value;
  }

  private _appReady: boolean = false;
  @Input()
  public get appReady(): boolean {
    return this._appReady;
  }
  public set appReady(value: boolean) {
    console.log('init appReady', value);
    this._appReady = value;
    if (value === true) {
      this.showHeader();
    }
  }

  private _showMenu: boolean = false;
  @Input()
  public get showMenu(): boolean {
    return this._showMenu;
  }
  public set showMenu(value: boolean) {
    console.log('init showMenu', value);
    this._showMenu = value;
    this.showMenuAnime(value);
    if (value === true) {
      this.showHeader();
    }
  }

  @Output()
  public menuChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  changeMenu() {
    console.log('change menu');
    this.menuChange.emit();
  }

  onClickHandler(value) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop; //this.document.scrollingElement.scrollTop;
    // console.log('scrolling', number);
    if (number > 20) {
      if (this.isScrolled === false) {
        this.showHeader();
      }
      this.isScrolled = true;
    } else if (this.isScrolled && number < 10) {
      this.isScrolled = false;
    }
  }

  showMenuAnime(value: boolean) {
    anime({
      targets: ['#appheader'],
      paddingLeft: value === true ? [0, 400] : [400, 0],
      paddingTop: value === true ? [7, 5] : [5, 7],
      duration: 500,
      elasticity: 450,
      delay: 100
    });
  }

  showHeader() {
    anime({
      targets: ['#appheader'],
      opacity: 0,
      duration: 0,
      elasticity: 0
    });

    anime({
      targets: ['#appheader'],
      opacity: [0, 1],
      top: [-30, 0],
      duration: 500,
      elasticity: 150,
      delay: 100
    });
  }
}

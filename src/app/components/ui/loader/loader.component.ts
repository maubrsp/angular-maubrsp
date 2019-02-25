import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit, AfterContentInit {
  @Input()
  public loaderId: String = '';

  private _loadding: Boolean = false;
  @Input()
  public get loading(): Boolean {
    return this._loadding;
  }
  public set loading(value: Boolean) {
    this.changeLoader(value);
  }

  @Output()
  public loadEnd: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.hide(0, false);
  }

  changeLoader(value: Boolean) {
    const delay = 800;
    value === false ? this.hide(delay, true) : this.show(delay);
  }

  show(delay: number) {
    this._loadding = true;
    setTimeout(() => {
      anime(
        {
          targets: ['#testloader'],
          scale: {
            value: [0, 1],
            duration: delay,
            elasticity: 500,
            easing: 'easeInOutElastic'
          },
          opacity: {
            value: [0.5, 1],
            duration: delay,
            delay: 0,
            easing: 'easeInExpo'
          },
          rotate: {
            value: [-100, 0],
            duration: delay,
            delay: delay * 0.2,
            easing: 'easeInOutElastic'
          },
          complete: function(anim) {
            // TODO avaliar
          }
        },
        100
      );
    });
  }

  hide(delay: number, notify: boolean) {
    const that = this;
    anime({
      targets: ['#testloader'],
      scale: {
        value: 0,
        duration: delay,
        easing: 'easeInOutExpo'
      },
      opacity: {
        value: 0,
        duration: delay,
        delay: 0,
        easing: 'easeInOutExpo'
      },
      rotate: {
        value: [-200, 0],
        duration: delay * 0.6,
        delay: delay * 0.2,
        easing: 'easeInOutElastic'
      },
      complete: function(anim) {
        if (notify) that.hideCompleteHandler();
      }
    });
  }

  hideCompleteHandler() {
    this._loadding = false;
    this.loadEnd.emit(this._loadding);
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  defaultButtonVars,
  changeLayoutState
} from '../../../core/utils/style.utils';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {
  private _styles: Object;
  @Input()
  public get styles(): Object {
    return this._styles;
  }
  public set styles(value: Object) {
    this._styles = value;
  }

  private currentStyles: Object = defaultButtonVars();

  private _currentState: string = 'normal';
  @Input()
  public get currentState(): string {
    return this._currentState;
  }

  public set currentState(value: string) {
    this.setState(value);
  }

  @Input()
  public text: string = 'hello button!';

  @Input()
  public svgId: string = null;

  @Output()
  public onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.currentState = this.currentState;
  }

  mouseOverHandler(event) {
    this.currentState = 'hovered';
  }
  mouseOutHandler(event) {
    this.currentState = 'normal';
  }
  mouseClickHandler(event) {
    this.onClick.emit();
  }

  setState(value: string) {
    this._currentState = value;
    if (!this.styles) return;
    const duration: number = value === 'normal' ? 500 : 900;
    const elasticity: number = value === 'normal' ? 20 : 200;
    const easing: string =
      value === 'normal' ? '"spring(1, 80, 10, 0)"' : 'inOutElastic';

    changeLayoutState(
      this.currentStyles,
      this.styles,
      value,
      duration,
      elasticity,
      easing,
      () => {
        this.currentStyles['borderStyle'] = this.styles['borderStyle'][
          this.currentState
        ];
      }
    );
  }
}

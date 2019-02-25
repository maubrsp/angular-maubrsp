import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  changeLayoutState,
  defaultButtonVars
} from '../../../core/utils/style.utils';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass']
})
export class IconComponent implements OnInit {
  private _styles: Object;
  @Input()
  public get styles(): Object {
    return this._styles;
  }
  public set styles(value: Object) {
    this._styles = value;
    if (value && value !== null) {
      this.currentState = this.currentState;
    }
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
  public iconChar: string = null;

  @Input()
  public svgId: string = null;

  @Input()
  public buttonMode: boolean = true;

  @Output()
  public onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  ngOnInit() {}

  mouseOverHandler(event) {
    if (!this.buttonMode) return;
    this.currentState = 'hovered';
  }
  mouseOutHandler(event) {
    if (!this.buttonMode) return;
    this.currentState = 'normal';
  }
  mouseClickHandler(event) {
    if (!this.buttonMode) return;
    this.onClick.emit();
  }

  setState(value: string) {
    if (!this.styles) return;
    this._currentState = value;
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menubuton',
  templateUrl: './menubuton.component.html',
  styleUrls: ['./menubuton.component.sass']
})
export class MenubutonComponent implements OnInit {
  @Input()
  public borderRadius: number = 0;

  @Input()
  public currentState: string = 'normal';

  @Input()
  public backgroundColors: Object = {
    normal: '#eeeeee',
    disable: '#cccccc',
    hovered: '#868686'
  };

  @Input()
  public text: string = 'click me!';

  @Input()
  public routerLinkPath: string;

  @Input()
  public iconChar: string = 'WO';

  @Output()
  public menuChange: EventEmitter<any> = new EventEmitter<any>();

  public hasIcon: boolean = this.iconChar !== null ? true : false;

  private backgroundColor: any = this.backgroundColors[this.currentState];

  private iconColor: string = '#cccccc';
  private iconSvg: string = '#user-picture';

  constructor() {}

  ngOnInit() {}
}

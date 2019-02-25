import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import anime from 'animejs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  private _menu: Array<any> = [];
  @Input()
  public get menu(): Array<any> {
    return this._menu;
  }
  public set menu(value: Array<any>) {
    this._menu = value;
  }

  @Input()
  list: Array<any>;

  private _showMenu: boolean = false;
  @Input()
  public get showMenu(): boolean {
    return this._showMenu;
  }
  public set showMenu(value: boolean) {
    this._showMenu = value;
    this.showMenuAnime(value);
  }

  private iconColor: string = '#cccccc';
  private iconSvg: string = '#user-picture';

  constructor(private router: Router) {}

  ngOnInit() {}

  showMenuAnime(value: boolean) {
    anime({
      targets: ['#sidemenu'],
      width: value === true ? [0, 400] : [400, 0],
      duration: 500,
      elasticity: 450,
      delay: 100
    });
  }

  public menuChange(event) {
    console.log(' >>> ', this.showMenu);
  }

  go(rotes) {
    this.router.navigateByUrl('/' + rotes.path);
  }
}

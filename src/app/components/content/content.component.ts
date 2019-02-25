import { Component, OnInit, Input } from '@angular/core';
import anime from 'animejs';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {
  private _showMenu: boolean = false;
  @Input()
  public get showMenu(): boolean {
    return this._showMenu;
  }
  public set showMenu(value: boolean) {
    this._showMenu = value;
    if (!this.showPage) return;
    this.showMenuAnime(value);
  }

  private _showPage: boolean = false;
  @Input()
  public get showPage(): boolean {
    return this._showPage;
  }
  public set showPage(value: boolean) {
    this._showPage = value;
    this.showPageAnime(value);
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  showMenuAnime(value: boolean) {
    anime({
      targets: ['#appContent'],
      opacity: value === true ? [1, 0.5] : [0.5, 1],
      duration: 300,
      elasticity: 50,
      delay: 1
    });
  }

  showPageAnime(value: boolean) {
    // TODO validar o fluxo de dados e ações
    // anime({
    //   targets: ['#appContent'],
    //   opacity: value === true ? [0, 1] : [1, 0],
    //   duration: value === true ? 800 : 300,
    //   elasticity: 50,
    //   delay: value === true ? 5500 : 1
    // });
  }
}

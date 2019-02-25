import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass']
})
export class DropdownComponent implements OnInit {
  public selectedCategory: string = '';
  public selectedCategoryName: string = '';
  public showSelector: boolean = false;
  private placeHolder: string = 'Selecione';
  @Input()
  list: Array<any>;

  constructor() {}

  ngOnInit() {}

  /*
    View Interactions
  */
  onCategoryClick(event) {
    if (event) event.stopPropagation();
    if (event) event.preventDefault();
    this.showSelector = !this.showSelector;
  }

  onBodyClick = event => {
    if (this.showSelector === false) return;
    this.showSelector = false;
  };

  onCategoryChange(category) {
    this.selectedCategory = category.value;
    this.selectedCategoryName = category.label;
    // this.pageData = null
    // this.preloaderVisible = true
  }
}

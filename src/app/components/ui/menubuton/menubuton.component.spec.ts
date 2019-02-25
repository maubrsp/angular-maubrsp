import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubutonComponent } from './menubuton.component';

describe('MenubutonComponent', () => {
  let component: MenubutonComponent;
  let fixture: ComponentFixture<MenubutonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubutonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgEksiPage } from './app.po';

describe('ng-eksi App', () => {
  let page: NgEksiPage;

  beforeEach(() => {
    page = new NgEksiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

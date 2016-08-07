import { BnbPage } from './app.po';

describe('bnb App', function() {
  let page: BnbPage;

  beforeEach(() => {
    page = new BnbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

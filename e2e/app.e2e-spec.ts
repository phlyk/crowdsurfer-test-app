import { CrowdSurferTestPage } from './app.po';

describe('crowd-surfer-test App', () => {
  let page: CrowdSurferTestPage;

  beforeEach(() => {
    page = new CrowdSurferTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

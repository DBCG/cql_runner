import { CodemirrorRunnerPage } from './app.po';

describe('codemirror-runner App', () => {
  let page: CodemirrorRunnerPage;

  beforeEach(() => {
    page = new CodemirrorRunnerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

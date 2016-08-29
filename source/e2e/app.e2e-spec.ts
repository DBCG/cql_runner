import { CqlEditorPage } from './app.po';

describe('cql-editor App', function() {
  let page: CqlEditorPage;

  beforeEach(() => {
    page = new CqlEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

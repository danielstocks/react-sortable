jest.autoMockOff();

describe('import test', () => {

  it('should import sortable', () => {

    // when
    var sortable = require('../src').sortable;

    // then
    expect(sortable).not.toBeUndefined();
  });


  // Sortable with uppercase S for compatibility reasons
  // danielstocks/react-sortable/issues/57
  // TODO: remove with release 2.0.0
  it('should import Sortable (uppercase S)', () => {

    // when
    var SortableUppercase = require('../src').Sortable;

    // then
    expect(SortableUppercase).not.toBeUndefined();
  });

});

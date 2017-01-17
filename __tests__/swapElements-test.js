jest.autoMockOff();

describe('swap elements in array', () => {

  it('swaps two elements based on indexFrom and indexTo', () => {
    var items = ["Gold", "Crimson", "Hotpink", "Blueviolet", "Cornflowerblue"];
    const {swapArrayElements} = require('../src/SortableComposition');
    expect(swapArrayElements(items, 1, 2)).toEqual(["Gold", "Hotpink", "Crimson", "Blueviolet", "Cornflowerblue"]);
  });

  it('leaves array the same if indexFrom and indexTo are the same', () => {
    var items = ["Gold", "Crimson", "Hotpink", "Blueviolet", "Cornflowerblue"];
    const {swapArrayElements} = require('../src/SortableComposition');
    expect(swapArrayElements(items, 0, 0)).toEqual(["Gold", "Crimson", "Hotpink", "Blueviolet", "Cornflowerblue"]);
  });

});


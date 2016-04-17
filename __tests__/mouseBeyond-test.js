jest.autoMockOff();

describe('checks if mouse pointer has reached over the berakpoint in element', () => {

  const elementPos = 100;
  const elementSize = 400;

  it('gives false if mouse is outside of element', () => {
    const {isMouseBeyond} = require('../src/SortableComposition');
    const mousePos = 0;
    expect(isMouseBeyond(mousePos, elementPos, elementSize)).toBe(false);
  });

  it('gives false if mouse is inside of element, but still hasn\'t reached the breakpoint', () => {
    const {isMouseBeyond} = require('../src/SortableComposition');
    const mousePos = 300;
    expect(isMouseBeyond(mousePos, elementPos, elementSize)).toBe(false);
  });

  it('gives true if mouse is inside of element and has just reached the breakpoint', () => {
    const {isMouseBeyond} = require('../src/SortableComposition');
    const mousePos = 301;
    expect(isMouseBeyond(mousePos, elementPos, elementSize)).toBe(true);
  });

  it('gives true if mouse is on the edge of element, already over the breakpoint', () => {
    const {isMouseBeyond} = require('../src/SortableComposition');
    const mousePos = 500;
    expect(isMouseBeyond(mousePos, elementPos, elementSize)).toBe(true);
  });


});


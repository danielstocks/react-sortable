# React Sortable Demo

It uses current **master** branch of react-sortable.

Checkout packages.json.

##Installation

`npm i`

##Run

Open index.html in your browser.

## Development

Before doing any changes please open `./example-real-world/js/SortableGridItem.js` and `./example-real-world/js/SortableListItem.js`.
Replace line `import { Sortable } from 'react-sortable';` with `import { SortableComposition as Sortable }  from '../../src/SortableComposition';`.

Then any change you will make in `./src/SortableComposition` wiil be saved by wenbpack into `./demo/bundle.js`.
Run `npm start` command to generate new builds.

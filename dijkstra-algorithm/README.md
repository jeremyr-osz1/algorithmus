# Dijkstra and A* Visualization

This is a simple HTML/CSS/JS app to visualize shortest paths using Dijkstra and A* on a fixed graph.

## Run

```bash
npm install # Install dependencies
npm start   # Start the app
```

Despite being a static HTML app, we use a simple Node.js server to serve the files to prevent cors issues when loading the javascript modules.

## Documentation

Install dev dependencies and generate both doc outputs:

```bash
npm install
npm run docs
```

This generates:
- `docs/documentation` (documentation.js)
- `docs/jsdoc` (JSDoc)

## Tests

Run Cypress tests:

```bash
npm run test
```

## Data

- Coordinates are embedded in `app.js` (from `koordinaten.csv`).
- The adjacency matrix is embedded in `app.js` (from `adjazenz-matrix.txt`).

# Dijkstra and A* Visualization

This is a simple HTML/CSS/JS app to visualize shortest paths using Dijkstra and A* on a fixed graph.

## Run

Open `index.html` in a browser (local files must be allowed to load the PDF background).

## Documentation

Install dev dependencies and generate both doc outputs:

```bash
npm install
npm run docs
```

This generates:
- `docs/documentation` (documentation.js)
- `docs/jsdoc` (JSDoc)

## Data

- Coordinates are embedded in `app.js` (from `koordinaten.csv`).
- The adjacency matrix is embedded in `app.js` (from `adjazenz-matrix.txt`).

# Test Cases

## GUI / UX

- Start and target dropdowns show all node ids from 0 to 32.
- Switching the algorithm radio buttons changes which stats are updated.
- Step slider updates its label and affects animation speed.
- Disabling "Zwischenschritte" shows only the final path.
- The run button is disabled while animation is running and re-enabled after.

## Algorithm Behavior

- For the same start/target, Dijkstra and A* produce the same shortest distance.
- If start == target, the distance is 0 and the path contains a single node.
- When no path exists (if edges are removed), the distance displays "keine Verbindung".

## Unit Tests (Pseudo)

1. Haversine distance symmetry
   - Input: a, b
   - Expect: haversineKm(a, b) === haversineKm(b, a)

2. Dijkstra path for trivial case
   - Input: start == target
   - Expect: path length = 1 and distance = 0

3. A* heuristic admissibility on same node
   - Input: a, a
   - Expect: heuristic(a, a) === 0

"use strict";

import { heuristic } from "./math.js";
import { buildPath } from "./graph.js";

/**
 * A* algorithm with step logging.
 * @param {number} startId
 * @param {number} targetId
 * @param {Array} adjacency
 * @param {Array} nodes
 * @returns {Object} return - The result object containing distance, path, steps, and edges examined.
 * @returns {number} return.distance - The total distance of the found path or Infinity if no path exists.
 * @returns {number[]} return.path - An array of node IDs representing the path from start to target.
 * @returns {object[]} return.steps - An array of step objects, each containing 'from' and 'to' node IDs.
 * @returns {number} return.edgesExamined - The total number of edges examined during the search.
 */
export function aStar(startId, targetId, adjacency, nodes) {
  const size = adjacency.length;
  const openSet = new Set([startId]);
  const cameFrom = Array(size).fill(null);
  const gScore = Array(size).fill(Infinity);
  const fScore = Array(size).fill(Infinity);
  const steps = [];
  let edgesExamined = 0;

  gScore[startId] = 0;
  fScore[startId] = heuristic(nodes[startId], nodes[targetId]);

  while (openSet.size > 0) {
    let current = null;
    let bestScore = Infinity;

    openSet.forEach((nodeId) => {
      if (fScore[nodeId] < bestScore) {
        bestScore = fScore[nodeId];
        current = nodeId;
      }
    });

    if (current === null) {
      break;
    }

    if (current === targetId) {
      break;
    }

    openSet.delete(current);

    adjacency[current].forEach((neighbor) => {
      edgesExamined += 1;
      steps.push({ from: current, to: neighbor.to });
      const tentative = gScore[current] + neighbor.weight;
      if (tentative < gScore[neighbor.to]) {
        cameFrom[neighbor.to] = current;
        gScore[neighbor.to] = tentative;
        fScore[neighbor.to] =
          tentative + heuristic(nodes[neighbor.to], nodes[targetId]);
        openSet.add(neighbor.to);
      }
    });
  }

  return {
    distance: gScore[targetId],
    path: buildPath(cameFrom, startId, targetId),
    steps,
    edgesExamined,
  };
}

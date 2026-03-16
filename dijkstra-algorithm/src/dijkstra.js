"use strict";

import { buildPath } from "./graph.js";

/**
 * Dijkstra algorithm with step logging.
 * @param {number} startId
 * @param {number} targetId
 * @param {Array} adjacency
 * @returns {{distance:number, path:number[], steps:object[], edgesExamined:number}}
 */
export function dijkstra(startId, targetId, adjacency) {
    const size = adjacency.length;
    const dist = Array(size).fill(Infinity);
    const prev = Array(size).fill(null);
    const visited = Array(size).fill(false);
    const steps = [];
    let edgesExamined = 0;

    dist[startId] = 0;

    for (let i = 0; i < size; i += 1) {
        let current = null;
        let currentDist = Infinity;

        for (let j = 0; j < size; j += 1) {
            if (!visited[j] && dist[j] < currentDist) {
                currentDist = dist[j];
                current = j;
            }
        }

        if (current === null) {
            break;
        }

        if (current === targetId) {
            break;
        }

        visited[current] = true;

        adjacency[current].forEach((neighbor) => {
            edgesExamined += 1;
            steps.push({ from: current, to: neighbor.to });
            const alt = dist[current] + neighbor.weight;
            if (alt < dist[neighbor.to]) {
                dist[neighbor.to] = alt;
                prev[neighbor.to] = current;
            }
        });
    }

    return {
        distance: dist[targetId],
        path: buildPath(prev, startId, targetId),
        steps,
        edgesExamined
    };
}

"use strict";

import { haversineKm } from "./math.js";

/**
 * Build nodes, edges, and adjacency list with weights from raw data.
 * @param {Array<{id:number, lat:number, lon:number}>} coordinates
 * @param {Array<Array<number>>} adjacencyMatrix
 * @returns {Object} An object containing the graph data structures.
 * @returns {Array<{id:number, lat:number, lon:number}>} return.nodes - The array of node objects.
 * @returns {Array<Array<{to:number, weight:number}>>} return.adjacency - The adjacency list with weights.
 * @returns {Array<{from:number, to:number, weight:number}>} return.edges - The array of edge objects with weights.
 */
export function buildGraph(coordinates, adjacencyMatrix) {
    const nodes = coordinates.map((entry) => ({
        id: entry.id,
        lat: entry.lat,
        lon: entry.lon
    }));

    const adjacency = nodes.map(() => []);
    const edges = [];

    for (let i = 0; i < adjacencyMatrix.length; i += 1) {
        for (let j = i + 1; j < adjacencyMatrix[i].length; j += 1) {
            if (adjacencyMatrix[i][j] === 1) {
                const weight = haversineKm(nodes[i], nodes[j]);
                adjacency[i].push({ to: j, weight });
                adjacency[j].push({ to: i, weight });
                edges.push({ from: i, to: j, weight });
            }
        }
    }

    return { nodes, adjacency, edges };
}

/**
 * Build path from prev array.
 * @param {Array<number|null>} prev
 * @param {number} startId
 * @param {number} targetId
 * @returns {number[]} The path from startId to targetId, or empty if no path exists.
 */
export function buildPath(prev, startId, targetId) {
    const path = [];
    let current = targetId;

    if (startId === targetId) {
        return [startId];
    }

    while (current !== null) {
        path.unshift(current);
        if (current === startId) {
            break;
        }
        current = prev[current];
    }

    if (path[0] !== startId) {
        return [];
    }

    return path;
}

/**
 * Normalize an edge key (small-big).
 * @param {number} from
 * @param {number} to
 * @returns {string} A string key representing the edge, normalized so that the smaller ID comes first.
 */
export function edgeKey(from, to) {
    return from < to ? `${from}-${to}` : `${to}-${from}`;
}

/**
 * Collect edge keys from steps up to a limit.
 * @param {Array<{from:number, to:number}>} steps
 * @param {number} limit
 * @returns {Set<string>} A set of edge keys representing the edges used in the steps up to the limit.
 */
export function collectStepEdges(steps, limit) {
    const keys = new Set();
    const max = Math.min(limit, steps.length);

    for (let i = 0; i < max; i += 1) {
        const step = steps[i];
        keys.add(edgeKey(step.from, step.to));
    }

    return keys;
}

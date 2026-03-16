"use strict";

import { haversineKm } from "./math.js";

/**
 * Build nodes, edges, and adjacency list with weights from raw data.
 * @param {Array<{id:number, lat:number, lon:number}>} coordinates
 * @param {number[][]} adjacencyMatrix
 * @returns {{nodes: Array, adjacency: Array, edges: Array}}
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
 * @param {Array} prev
 * @param {number} startId
 * @param {number} targetId
 * @returns {number[]}
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
 * @returns {string}
 */
export function edgeKey(from, to) {
    return from < to ? `${from}-${to}` : `${to}-${from}`;
}

/**
 * Collect edge keys from steps up to a limit.
 * @param {Array} steps
 * @param {number} limit
 * @returns {Set<string>}
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

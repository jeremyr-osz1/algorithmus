"use strict";

import { collectStepEdges } from "./graph.js";

/**
 * Compute node screen positions based on lat/lon bounds.
 * @param {Array<{id:number, lat:number, lon:number}>} nodes
 * @param {number} width
 * @param {number} height
 * @param {number} padding
 * @returns {Map<number, {x:number, y:number}>}
 */
export function computePositions(nodes, width, height, padding) {
    const lats = nodes.map((node) => node.lat);
    const lons = nodes.map((node) => node.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const latRange = maxLat - minLat;
    const lonRange = maxLon - minLon;
    const usableWidth = Math.max(1, width - padding * 2);
    const usableHeight = Math.max(1, height - padding * 2);
    const scale = Math.min(
        lonRange === 0 ? usableWidth : usableWidth / lonRange,
        latRange === 0 ? usableHeight : usableHeight / latRange
    );
    const offsetX = (width - lonRange * scale) / 2;
    const offsetY = (height - latRange * scale) / 2;

    const positions = new Map();

    nodes.forEach((node) => {
        const x = offsetX + (node.lon - minLon) * scale;
        const y = offsetY + (maxLat - node.lat) * scale;
        positions.set(node.id, { x, y });
    });

    return positions;
}

/**
 * Draw all base edges.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} edges
 * @param {Map<number, {x:number, y:number}>} positions
 * @param {string} color
 * @param {number} width
 */
export function drawEdges(ctx, edges, positions, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash([]);

    edges.forEach((edge) => {
        const from = positions.get(edge.from);
        const to = positions.get(edge.to);

        if (!from || !to) {
            return;
        }

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    });
}

/**
 * Draw edge keys with dashed lines.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Set<string>} keys
 * @param {Map<number, {x:number, y:number}>} positions
 * @param {string} color
 * @param {number} width
 * @param {number[]} dash
 */
export function drawEdgeKeys(ctx, keys, positions, color, width, dash) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash);

    keys.forEach((key) => {
        const parts = key.split("-");
        const fromId = Number(parts[0]);
        const toId = Number(parts[1]);
        const from = positions.get(fromId);
        const to = positions.get(toId);

        if (!from || !to) {
            return;
        }

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    });

    ctx.setLineDash([]);
}

/**
 * Draw a path as a solid line.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number[]} path
 * @param {Map<number, {x:number, y:number}>} positions
 * @param {string} color
 * @param {number} width
 */
export function drawPath(ctx, path, positions, color, width) {
    if (!path || path.length < 2) {
        return;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash([]);

    ctx.beginPath();
    const first = positions.get(path[0]);
    if (!first) {
        return;
    }
    ctx.moveTo(first.x, first.y);

    for (let i = 1; i < path.length; i += 1) {
        const point = positions.get(path[i]);
        if (!point) {
            continue;
        }
        ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();
}

/**
 * Draw nodes and labels.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Array<{id:number}>} nodes - The array of nodes to draw.
 * @param {Map<number, {x:number, y:number}>} positions - The positions of the nodes.
 * @param {Object} highlights - The highlighted nodes.
 * @param {number|null} highlights.startId - The start node ID or null.
 * @param {number|null} highlights.targetId - The target node ID or null.
 */
export function drawNodes(ctx, nodes, positions, highlights) {
    const { startId, targetId } = highlights || {};
    ctx.lineWidth = 2;
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    nodes.forEach((node) => {
        const pos = positions.get(node.id);
        if (!pos) {
            return;
        }

        let fillColor = "#f8fafc";
        let strokeColor = "#1f2933";
        let textColor = "#111827";

        if (node.id === startId) {
            fillColor = "#16a34a";
            strokeColor = "#14532d";
            textColor = "#ffffff";
        } else if (node.id === targetId) {
            fillColor = "#dc2626";
            strokeColor = "#7f1d1d";
            textColor = "#ffffff";
        }

        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.strokeText(String(node.id), pos.x, pos.y);
        ctx.fillStyle = textColor;
        ctx.lineWidth = 2;
        ctx.fillText(String(node.id), pos.x, pos.y);
    });
}

/**
 * Draw the full graph including optional step visualization and paths.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} viewport
 * @param {number} viewport.width - The width of the canvas.
 * @param {number} viewport.height - The height of the canvas.
 * @param {Array} edges - The array of edges in the graph.
 * @param {Array} nodes - The array of nodes in the graph.
 * @param {Map<number, {x:number, y:number}>} positions - The positions of the nodes.
 * @param {Object} options - The options for drawing the graph.
 * @param {boolean} [options.showSteps=false] - Whether to visualize algorithm steps.
 * @param {number} [options.stepIndex=0] - The current step index to visualize.
 * @param {Array} [options.dijkstraSteps=[]] - The recorded steps of Dijkstra's algorithm.
 * @param {Array} [options.astarSteps=[]] - The recorded steps of A* algorithm.
 * @param {Array} [options.dijkstraPath=[]] - The final path found by Dijkstra's algorithm.
 * @param {Array} [options.astarPath=[]] - The final path found by A* algorithm.
 * @param {string} [options.mode="both"] - Which algorithm to visualize ("dijkstra", "astar", or "both").
 * @param {number|null} [options.startId=null] - The start node ID to highlight.
 * @param {number|null} [options.targetId=null] - The target node ID to highlight.
 */
export function drawGraph(ctx, viewport, edges, nodes, positions, options) {
    const {
        showSteps = false,
        stepIndex = 0,
        dijkstraSteps = [],
        astarSteps = [],
        dijkstraPath = [],
        astarPath = [],
        mode = "both",
        startId = null,
        targetId = null
    } = options || {};

    ctx.clearRect(0, 0, viewport.width, viewport.height);

    drawEdges(ctx, edges, positions, "#94a3b8", 1);

    if (showSteps) {
        const dijkstraKeys = collectStepEdges(dijkstraSteps, stepIndex);
        const astarKeys = collectStepEdges(astarSteps, stepIndex);

        if (mode !== "astar") {
            drawEdgeKeys(ctx, dijkstraKeys, positions, "#2563eb", 2, [6, 4]);
        }

        if (mode !== "dijkstra") {
            drawEdgeKeys(ctx, astarKeys, positions, "#f97316", 2, [6, 4]);
        }
    }

    if (mode !== "astar") {
        drawPath(ctx, dijkstraPath, positions, "#1d4ed8", 4);
    }

    if (mode !== "dijkstra") {
        drawPath(ctx, astarPath, positions, "#ea580c", 4);
    }

    drawNodes(ctx, nodes, positions, { startId, targetId });
}

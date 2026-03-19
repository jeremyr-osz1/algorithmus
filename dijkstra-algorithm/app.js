"use strict";

import { buildGraph } from "./src/graph.js";
import { dijkstra } from "./src/dijkstra.js";
import { aStar } from "./src/astar.js";
import { computePositions, drawGraph } from "./src/renderer.js";

/**
 * Raw coordinates from koordinaten.csv.
 * Note: The CSV header says lon;lat, but values are lat;lon.
 */
const coordinates = [
    { id: 0, lat: 51.7715434, lon: 14.3384649 },
    { id: 1, lat: 51.7713221, lon: 14.3408949 },
    { id: 2, lat: 51.7696548, lon: 14.3412477 },
    { id: 3, lat: 51.7711254, lon: 14.3440264 },
    { id: 4, lat: 51.7705285, lon: 14.350131 },
    { id: 5, lat: 51.7682279, lon: 14.3576932 },
    { id: 6, lat: 51.766604, lon: 14.3581074 },
    { id: 7, lat: 51.7645259, lon: 14.3582908 },
    { id: 8, lat: 51.7625026, lon: 14.3585917 },
    { id: 9, lat: 51.7624201, lon: 14.3530582 },
    { id: 10, lat: 51.7622369, lon: 14.3512985 },
    { id: 11, lat: 51.7618278, lon: 14.3489667 },
    { id: 12, lat: 51.7625955, lon: 14.3457449 },
    { id: 13, lat: 51.7624286, lon: 14.3435046 },
    { id: 14, lat: 51.7634474, lon: 14.3431303 },
    { id: 15, lat: 51.7646481, lon: 14.3429569 },
    { id: 16, lat: 51.7646733, lon: 14.3413606 },
    { id: 17, lat: 51.7657243, lon: 14.342997 },
    { id: 18, lat: 51.765716, lon: 14.3416717 },
    { id: 19, lat: 51.7658011, lon: 14.3470791 },
    { id: 20, lat: 51.7648394, lon: 14.3470382 },
    { id: 21, lat: 51.7636765, lon: 14.3472444 },
    { id: 22, lat: 51.7657976, lon: 14.3491528 },
    { id: 23, lat: 51.7648185, lon: 14.3492802 },
    { id: 24, lat: 51.7629565, lon: 14.349629 },
    { id: 25, lat: 51.7626278, lon: 14.3497847 },
    { id: 26, lat: 51.7630784, lon: 14.3530594 },
    { id: 27, lat: 51.763197, lon: 14.3578804 },
    { id: 28, lat: 51.7644098, lon: 14.3530416 },
    { id: 29, lat: 51.7647684, lon: 14.35287 },
    { id: 30, lat: 51.7651805, lon: 14.3527472 },
    { id: 31, lat: 51.7656119, lon: 14.3540883 },
    { id: 32, lat: 51.7680772, lon: 14.3568 }
];

/**
 * Adjacency matrix from adjazenz-matrix.txt.
 * 1 means there is an undirected edge between nodes.
 */
const adjacencyMatrix = [
  // 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  0
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  1
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  2
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  3
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  4
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  5
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], //  6
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //  7
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  8
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], //  9
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 15
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 16
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 17
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 18
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 19
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 20
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 21
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 22
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], // 23
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], // 24
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 25
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0], // 26
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // 27
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], // 28
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0], // 29
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], // 30
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], // 31
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]  // 32
];

const appState = {
    nodes: [],
    adjacency: [],
    edges: [],
    positions: new Map(),
    results: {
        dijkstra: null,
        astar: null
    },
    animation: {
        timer: null,
        stepIndex: 0,
        running: false
    },
    ui: {
        startSelect: null,
        targetSelect: null,
        showSteps: null,
        stepDelay: null,
        stepDelayValue: null,
        runButton: null,
        mapCanvas: null,
        mapInner: null,
        dijkstraDistance: null,
        dijkstraTime: null,
        dijkstraEdges: null,
        astarDistance: null,
        astarTime: null,
        astarEdges: null
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initGraph();
    cacheUi();
    setupUi();
    setupResize();
    resizeCanvas();
    renderGraph({ ...getSelectedIds() });
});

/**
 * Build nodes, edges, and adjacency list with weights.
 */
function initGraph() {
    const graph = buildGraph(coordinates, adjacencyMatrix);
    appState.nodes = graph.nodes;
    appState.adjacency = graph.adjacency;
    appState.edges = graph.edges;
}

/**
 * Cache UI elements for quick access.
 */
function cacheUi() {
    appState.ui.startSelect = document.getElementById("startSelect");
    appState.ui.startSelect.addEventListener("change", () => {
        redrawCurrent();
    });
    appState.ui.targetSelect = document.getElementById("targetSelect");
    appState.ui.targetSelect.addEventListener("change", () => {
        redrawCurrent();
    });
    appState.ui.showSteps = document.getElementById("showSteps");
    appState.ui.stepDelay = document.getElementById("stepDelay");
    appState.ui.stepDelayValue = document.getElementById("stepDelayValue");
    appState.ui.runButton = document.getElementById("runButton");
    appState.ui.mapCanvas = document.getElementById("mapCanvas");
    appState.ui.mapInner = document.querySelector(".map-inner");
    appState.ui.dijkstraDistance = document.getElementById("dijkstraDistance");
    appState.ui.dijkstraTime = document.getElementById("dijkstraTime");
    appState.ui.dijkstraEdges = document.getElementById("dijkstraEdges");
    appState.ui.astarDistance = document.getElementById("astarDistance");
    appState.ui.astarTime = document.getElementById("astarTime");
    appState.ui.astarEdges = document.getElementById("astarEdges");
}

/**
 * Wire up UI controls.
 */
function setupUi() {
    fillNodeSelects();
    appState.ui.stepDelay.addEventListener("input", updateDelayLabel);
    appState.ui.runButton.addEventListener("click", onRunClick);
    updateDelayLabel();
}

/**
 * Resize handling for the canvas.
 */
function setupResize() {
    const resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
        redrawCurrent();
    });

    resizeObserver.observe(appState.ui.mapInner);
    window.addEventListener("resize", () => {
        resizeCanvas();
        redrawCurrent();
    });
}

/**
 * Populate start and target dropdowns.
 */
function fillNodeSelects() {
    const startSelect = appState.ui.startSelect;
    const targetSelect = appState.ui.targetSelect;

    startSelect.innerHTML = "";
    targetSelect.innerHTML = "";

    appState.nodes.forEach((node) => {
        const optionA = document.createElement("option");
        optionA.value = node.id;
        optionA.textContent = `Punkt ${node.id}`;
        startSelect.appendChild(optionA);

        const optionB = document.createElement("option");
        optionB.value = node.id;
        optionB.textContent = `Punkt ${node.id}`;
        targetSelect.appendChild(optionB);
    });

    startSelect.value = "0";
    targetSelect.value = "32";
}

/**
 * Update the label showing step delay.
 */
function updateDelayLabel() {
    appState.ui.stepDelayValue.textContent = `${appState.ui.stepDelay.value} ms`;
}

/**
 * Handle the run button click.
 */
function onRunClick() {
    stopAnimation();

    const startId = Number(appState.ui.startSelect.value);
    const targetId = Number(appState.ui.targetSelect.value);
    const mode = document.querySelector("input[name='algorithm']:checked").value;
    
    if (!mode) {
        alert("Bitte wählen Sie mindestens einen Algorithmus aus.");
        return;
    }

    if (startId === targetId) {
        alert("Start- und Zielpunkt müssen unterschiedlich sein.");
        return;
    }

    if (!isNodeValid(startId) || !isNodeValid(targetId)) {
        alert("Ausgewählte Start- oder Zielpunkt-ID ist ungültig.");
        return;
    }

    const showSteps = appState.ui.showSteps.checked;
    const delay = Number(appState.ui.stepDelay.value);

    appState.results.dijkstra = null;
    appState.results.astar = null;

    if (mode === "dijkstra" || mode === "both") {
        appState.results.dijkstra = runDijkstra(startId, targetId);
        updateStats(appState.results.dijkstra, "dijkstra");
    } else {
        updateStats(null, "dijkstra");
    }

    if (mode === "astar" || mode === "both") {
        appState.results.astar = runAStar(startId, targetId);
        updateStats(appState.results.astar, "astar");
    } else {
        updateStats(null, "astar");
    }

    if (showSteps) {
        startAnimation(mode, delay);
    } else {
        drawFinalPaths();
    }
}

/**
 * Run Dijkstra and return a result object.
 * @param {number} startId
 * @param {number} targetId
 * @returns {{distance:number, timeMs:number, edgesExamined:number, path:number[], steps:object[]}}
 */
function runDijkstra(startId, targetId) {
    const startTime = performance.now();
    const result = dijkstra(startId, targetId, appState.adjacency);
    const endTime = performance.now();

    return {
        distance: result.distance,
        timeMs: endTime - startTime,
        edgesExamined: result.edgesExamined,
        path: result.path,
        steps: result.steps
    };
}

/**
 * Run A* and return a result object.
 * @param {number} startId
 * @param {number} targetId
 * @returns {{distance:number, timeMs:number, edgesExamined:number, path:number[], steps:object[]}}
 */
function runAStar(startId, targetId) {
    const startTime = performance.now();
    const result = aStar(startId, targetId, appState.adjacency, appState.nodes);
    const endTime = performance.now();

    return {
        distance: result.distance,
        timeMs: endTime - startTime,
        edgesExamined: result.edgesExamined,
        path: result.path,
        steps: result.steps
    };
}

/**
 * Update statistic fields for a given algorithm.
 * @param {object|null} result
 * @param {"dijkstra"|"astar"} key
 */
function updateStats(result, key) {
    const distanceEl = appState.ui[`${key}Distance`];
    const timeEl = appState.ui[`${key}Time`];
    const edgesEl = appState.ui[`${key}Edges`];

    if (!result) {
        distanceEl.textContent = "—";
        timeEl.textContent = "—";
        edgesEl.textContent = "—";
        return;
    }

    if (!Number.isFinite(result.distance)) {
        distanceEl.textContent = "keine Verbindung";
        timeEl.textContent = `${result.timeMs.toFixed(2)} ms`;
        edgesEl.textContent = `${result.edgesExamined}`;
        return;
    }

    distanceEl.textContent = `${result.distance.toFixed(3)} km`;
    timeEl.textContent = `${result.timeMs.toFixed(2)} ms`;
    edgesEl.textContent = `${result.edgesExamined}`;
}

/**
 * Prepare and start the step animation.
 * @param {string} mode
 * @param {number} delay
 */
function startAnimation(mode, delay) {
    const dijkstraSteps = appState.results.dijkstra
        ? appState.results.dijkstra.steps
        : [];
    const astarSteps = appState.results.astar
        ? appState.results.astar.steps
        : [];

    const maxSteps = Math.max(dijkstraSteps.length, astarSteps.length);

    appState.animation.running = true;
    appState.animation.stepIndex = 0;
    appState.ui.runButton.disabled = true;

    const tick = () => {
        if (!appState.animation.running) {
            return;
        }

        renderGraph({
            showSteps: true,
            stepIndex: appState.animation.stepIndex,
            dijkstraSteps,
            astarSteps,
            dijkstraPath: appState.results.dijkstra
                ? appState.results.dijkstra.path
                : [],
            astarPath: appState.results.astar ? appState.results.astar.path : [],
            mode,
            ...getSelectedIds()
        });

        if (appState.animation.stepIndex >= maxSteps) {
            stopAnimation();
            return;
        }

        appState.animation.stepIndex += 1;
        appState.animation.timer = window.setTimeout(tick, delay);
    };

    tick();
}

/**
 * Stop any running animation.
 */
function stopAnimation() {
    if (appState.animation.timer) {
        window.clearTimeout(appState.animation.timer);
    }

    appState.animation.running = false;
    appState.animation.timer = null;
    appState.ui.runButton.disabled = false;
}

/**
 * Redraw using current results after resize.
 */
function redrawCurrent() {
    if (appState.animation.running) {
        return;
    }

    if (appState.results.dijkstra || appState.results.astar) {
        drawFinalPaths();
    } else {
        renderGraph({ ...getSelectedIds() });
    }
}

/**
 * Draw final paths without steps.
 */
function drawFinalPaths() {
    renderGraph({
        showSteps: false,
        dijkstraPath: appState.results.dijkstra
            ? appState.results.dijkstra.path
            : [],
        astarPath: appState.results.astar ? appState.results.astar.path : [],
        ...getSelectedIds()
    });
}

/**
 * Resize the canvas and recompute positions.
 */
function resizeCanvas() {
    const canvas = appState.ui.mapCanvas;
    const rect = appState.ui.mapInner.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    appState.positions = computePositions(appState.nodes, rect.width, rect.height, 24);
}

/**
 * Draw the graph, steps, and paths.
 * @param {object} options
 */
function renderGraph(options) {
    const canvas = appState.ui.mapCanvas;
    const ctx = canvas.getContext("2d");
    const rect = appState.ui.mapInner.getBoundingClientRect();
    drawGraph(ctx, { width: rect.width, height: rect.height }, appState.edges, appState.nodes, appState.positions, options);
}

/**
 * Read the currently selected node ids.
 * @returns {Object} An object containing the selected node IDs.
 * @returns {number|null} return.startId - The start node ID or null if invalid.
 * @returns {number|null} return.targetId - The target node ID or null if invalid.
 */
function getSelectedIds() {
    if (!appState.ui.startSelect || !appState.ui.targetSelect) {
        return { startId: null, targetId: null };
    }

    if (!isNodeValid(Number(appState.ui.startSelect.value)) ||
        !isNodeValid(Number(appState.ui.targetSelect.value))) {
        return { startId: null, targetId: null };
    }

    return {
        startId: Number(appState.ui.startSelect.value),
        targetId: Number(appState.ui.targetSelect.value)
    };
}

/**
 * Checks if a node id exists in the graph.
 * @param {number} id 
 * @returns {boolean}
 */
function isNodeValid(id) {
    return !isNaN(id) && appState.nodes.some((node) => node.id === id);
}



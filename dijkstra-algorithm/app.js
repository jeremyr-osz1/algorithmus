"use strict";

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
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
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
    buildGraph();
    cacheUi();
    setupUi();
    setupResize();
    resizeCanvas();
    drawGraph({ ...getSelectedIds() });
});

/**
 * Build nodes, edges, and adjacency list with weights.
 */
function buildGraph() {
    appState.nodes = coordinates.map((entry) => ({
        id: entry.id,
        lat: entry.lat,
        lon: entry.lon
    }));

    appState.adjacency = appState.nodes.map(() => []);
    appState.edges = [];

    for (let i = 0; i < adjacencyMatrix.length; i += 1) {
        for (let j = i + 1; j < adjacencyMatrix[i].length; j += 1) {
            if (adjacencyMatrix[i][j] === 1) {
                const weight = haversineKm(appState.nodes[i], appState.nodes[j]);
                appState.adjacency[i].push({ to: j, weight });
                appState.adjacency[j].push({ to: i, weight });
                appState.edges.push({ from: i, to: j, weight });
            }
        }
    }
}

/**
 * Cache UI elements for quick access.
 */
function cacheUi() {
    appState.ui.startSelect = document.getElementById("startSelect");
    appState.ui.targetSelect = document.getElementById("targetSelect");
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

        drawGraph({
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
        drawGraph({ ...getSelectedIds() });
    }
}

/**
 * Draw final paths without steps.
 */
function drawFinalPaths() {
    drawGraph({
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

    computePositions(rect.width, rect.height, 24);
}

/**
 * Compute node screen positions based on lat/lon bounds.
 * @param {number} width
 * @param {number} height
 * @param {number} padding
 */
function computePositions(width, height, padding) {
    const lats = appState.nodes.map((node) => node.lat);
    const lons = appState.nodes.map((node) => node.lon);
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

    appState.positions.clear();

    appState.nodes.forEach((node) => {
        const x = offsetX + (node.lon - minLon) * scale;
        const y = offsetY + (maxLat - node.lat) * scale;
        appState.positions.set(node.id, { x, y });
    });
}

/**
 * Draw the graph, steps, and paths.
 * @param {object} options
 */
function drawGraph(options) {
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

    const canvas = appState.ui.mapCanvas;
    const ctx = canvas.getContext("2d");
    const rect = appState.ui.mapInner.getBoundingClientRect();

    ctx.clearRect(0, 0, rect.width, rect.height);

    drawEdges(ctx, appState.edges, "#94a3b8", 1);

    if (showSteps) {
        const dijkstraKeys = collectStepEdges(dijkstraSteps, stepIndex);
        const astarKeys = collectStepEdges(astarSteps, stepIndex);

        if (mode !== "astar") {
            drawEdgeKeys(ctx, dijkstraKeys, "#2563eb", 2, [6, 4]);
        }

        if (mode !== "dijkstra") {
            drawEdgeKeys(ctx, astarKeys, "#f97316", 2, [6, 4]);
        }
    }

    if (mode !== "astar") {
        drawPath(ctx, dijkstraPath, "#1d4ed8", 4);
    }

    if (mode !== "dijkstra") {
        drawPath(ctx, astarPath, "#ea580c", 4);
    }

    drawNodes(ctx, { startId, targetId });
}

/**
 * Draw all base edges.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} edges
 * @param {string} color
 * @param {number} width
 */
function drawEdges(ctx, edges, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash([]);

    edges.forEach((edge) => {
        const from = appState.positions.get(edge.from);
        const to = appState.positions.get(edge.to);

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
 * @param {string} color
 * @param {number} width
 * @param {number[]} dash
 */
function drawEdgeKeys(ctx, keys, color, width, dash) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash);

    keys.forEach((key) => {
        const parts = key.split("-");
        const fromId = Number(parts[0]);
        const toId = Number(parts[1]);
        const from = appState.positions.get(fromId);
        const to = appState.positions.get(toId);

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
 * @param {string} color
 * @param {number} width
 */
function drawPath(ctx, path, color, width) {
    if (!path || path.length < 2) {
        return;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash([]);

    ctx.beginPath();
    const first = appState.positions.get(path[0]);
    if (!first) {
        return;
    }
    ctx.moveTo(first.x, first.y);

    for (let i = 1; i < path.length; i += 1) {
        const point = appState.positions.get(path[i]);
        if (!point) {
            continue;
        }
        ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();
}

/**
 * Draw nodes and labels.
 * @param {CanvasRenderingContext2D} ctx
 */
function drawNodes(ctx, highlights) {
    const { startId, targetId } = highlights || {};
    ctx.lineWidth = 2;
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    appState.nodes.forEach((node) => {
        const pos = appState.positions.get(node.id);
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
 * Read the currently selected node ids.
 * @returns {{startId:number|null, targetId:number|null}}
 */
function getSelectedIds() {
    if (!appState.ui.startSelect || !appState.ui.targetSelect) {
        return { startId: null, targetId: null };
    }

    return {
        startId: Number(appState.ui.startSelect.value),
        targetId: Number(appState.ui.targetSelect.value)
    };
}

/**
 * Collect edge keys from steps up to a limit.
 * @param {Array} steps
 * @param {number} limit
 * @returns {Set<string>}
 */
function collectStepEdges(steps, limit) {
    const keys = new Set();
    const max = Math.min(limit, steps.length);

    for (let i = 0; i < max; i += 1) {
        const step = steps[i];
        keys.add(edgeKey(step.from, step.to));
    }

    return keys;
}

/**
 * Normalize an edge key (small-big).
 * @param {number} from
 * @param {number} to
 * @returns {string}
 */
function edgeKey(from, to) {
    return from < to ? `${from}-${to}` : `${to}-${from}`;
}

/**
 * Dijkstra algorithm with step logging.
 * @param {number} startId
 * @param {number} targetId
 * @param {Array} adjacency
 * @returns {{distance:number, path:number[], steps:object[], edgesExamined:number}}
 */
function dijkstra(startId, targetId, adjacency) {
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

/**
 * A* algorithm with step logging.
 * @param {number} startId
 * @param {number} targetId
 * @param {Array} adjacency
 * @param {Array} nodes
 * @returns {{distance:number, path:number[], steps:object[], edgesExamined:number}}
 */
function aStar(startId, targetId, adjacency, nodes) {
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
        edgesExamined
    };
}

/**
 * Build path from prev array.
 * @param {Array} prev
 * @param {number} startId
 * @param {number} targetId
 * @returns {number[]}
 */
function buildPath(prev, startId, targetId) {
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
 * Haversine distance between two points in km.
 * @param {{lat:number, lon:number}} a
 * @param {{lat:number, lon:number}} b
 * @returns {number}
 */
function haversineKm(a, b) {
    const radius = 6371;
    const dLat = toRadians(b.lat - a.lat);
    const dLon = toRadians(b.lon - a.lon);
    const lat1 = toRadians(a.lat);
    const lat2 = toRadians(b.lat);

    const h =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return radius * c;
}

/**
 * Straight-line heuristic for A*.
 * @param {{lat:number, lon:number}} a
 * @param {{lat:number, lon:number}} b
 * @returns {number}
 */
function heuristic(a, b) {
    return haversineKm(a, b);
}

/**
 * Convert degrees to radians.
 * @param {number} value
 * @returns {number}
 */
function toRadians(value) {
    return (value * Math.PI) / 180;
}

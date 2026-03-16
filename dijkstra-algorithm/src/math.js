"use strict";

/**
 * Convert degrees to radians.
 * @param {number} value
 * @returns {number}
 */
export function toRadians(value) {
    return (value * Math.PI) / 180;
}

/**
 * Haversine distance between two points in km.
 * @param {Object} a
 * @param {number} a.lat
 * @param {number} a.lon
 * @param {Object} b
 * @param {number} b.lat
 * @param {number} b.lon
 * @returns {number} Distance in kilometers
 */
export function haversineKm(a, b) {
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
 * Straight-line heuristic for A* (haversine distance).
 * @param {Object} a
 * @param {number} a.lat
 * @param {number} a.lon
 * @param {Object} b
 * @param {number} b.lat
 * @param {number} b.lon
 * @returns {number} Distance in kilometers
 */
export function heuristic(a, b) {
    return haversineKm(a, b);
}

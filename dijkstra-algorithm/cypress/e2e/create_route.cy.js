
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

function get_random_point() {
    const random_index = Math.floor(Math.random() * coordinates.length);
    return coordinates[random_index];
}

describe('check amount of points', () => {
    it('passes', () => {
        cy.visit('http://127.0.0.1:5500/dijkstra-algorithm/index.html')
        cy.get('#startSelect option').should('have.length', coordinates.length);
    })

    it('passes', () => {
        cy.visit('http://127.0.0.1:5500/dijkstra-algorithm/index.html')
        cy.get('#targetSelect option').should('have.length', coordinates.length);
    })
})

describe('test random route dijkstra', () => {
    it('passes', () => {
        cy.visit('http://127.0.0.1:5500/dijkstra-algorithm/index.html')
        const start = get_random_point();
        const end = get_random_point();
        cy.get('#startSelect').select(start.id);
        cy.get('#targetSelect').select(end.id);
        cy.get('#algoDijkstra').check();
        cy.get('#runButton').click();
        cy.wait(3000);
    })
})

describe('test random route astar', () => {
    it('passes', () => {
        cy.visit('http://127.0.0.1:5500/dijkstra-algorithm/index.html')
        const start = get_random_point();
        const end = get_random_point();
        cy.get('#startSelect').select(start.id);
        cy.get('#targetSelect').select(end.id);
        cy.get('#algoAStar').check();
        cy.get('#runButton').click();
        cy.wait(3000);
    })
})

describe('test random route both', () => {
    it('passes', () => {
        cy.visit('http://127.0.0.1:5500/dijkstra-algorithm/index.html')
        const start = get_random_point();
        const end = get_random_point();
        cy.get('#startSelect').select(start.id);
        cy.get('#targetSelect').select(end.id);
        cy.get('#algoBoth').check();
        cy.get('#runButton').click();
        cy.wait(3000);
    })
})
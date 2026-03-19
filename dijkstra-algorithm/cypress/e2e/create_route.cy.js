const APP_URL = 'http://127.0.0.1:5500/dijkstra-algorithm/index.html';
const NODE_COUNT = 33;
const DISTANCE_PATTERN = /^\d+\.\d{3} km$/;
const TIME_PATTERN = /^\d+\.\d{2} ms$/;
const EDGE_COUNT_PATTERN = /^\d+$/;

function visitApp() {
    cy.visit(APP_URL);
}

function configureRoute({
    start = '0',
    target = '32',
    mode = 'dijkstra',
    showSteps = false,
    delay = '0'
} = {}) {
    cy.get('#startSelect').select(String(start));
    cy.get('#targetSelect').select(String(target));
    cy.get(`input[name="algorithm"][value="${mode}"]`).check();

    if (showSteps) {
        cy.get('#showSteps').check();
        cy.get('#stepDelay').invoke('val', String(delay)).trigger('input');
    } else {
        cy.get('#showSteps').uncheck();
    }
}

function runRoute(options = {}) {
    configureRoute(options);
    cy.get('#runButton').click();
}

function assertEmptyStats(prefix) {
    cy.get(`#${prefix}Distance`).should('have.text', '—');
    cy.get(`#${prefix}Time`).should('have.text', '—');
    cy.get(`#${prefix}Edges`).should('have.text', '—');
}

function assertFilledStats(prefix) {
    cy.get(`#${prefix}Distance`).invoke('text').should('match', DISTANCE_PATTERN);
    cy.get(`#${prefix}Time`).invoke('text').should('match', TIME_PATTERN);
    cy.get(`#${prefix}Edges`).invoke('text').should('match', EDGE_COUNT_PATTERN);
    cy.get(`#${prefix}Edges`).invoke('text').then((text) => {
        expect(Number(text)).to.be.greaterThan(0);
    });
}

describe('route calculation flows', () => {
    beforeEach(() => {
        visitApp();
    });

    it('shows every graph node in both dropdowns', () => {
        cy.get('#startSelect option').should('have.length', NODE_COUNT);
        cy.get('#targetSelect option').should('have.length', NODE_COUNT);
    });

    it('loads with sensible defaults for route configuration', () => {
        cy.get('#startSelect').should('have.value', '0');
        cy.get('#targetSelect').should('have.value', '32');
        cy.get('#algoDijkstra').should('be.checked');
        cy.get('#showSteps').should('be.checked');
        cy.get('#stepDelayValue').should('have.text', '300 ms');
        assertEmptyStats('dijkstra');
        assertEmptyStats('astar');
    });

    it('updates the delay label when the step slider changes', () => {
        cy.get('#stepDelay').invoke('val', '750').trigger('input');
        cy.get('#stepDelayValue').should('have.text', '750 ms');
    });

    it('blocks route calculation when start and target are identical', () => {
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });

        cy.get('#targetSelect').select('0');
        cy.get('#runButton').click();

        cy.get('@alert').should('have.been.calledOnceWithExactly', 'Start- und Zielpunkt müssen unterschiedlich sein.');
        cy.get('#runButton').should('not.be.disabled');
        assertEmptyStats('dijkstra');
        assertEmptyStats('astar');
    });

    it('keeps the algorithm selection mutually exclusive', () => {
        cy.get('#algoDijkstra').should('be.checked');
        cy.get('#algoAStar').check().should('be.checked');
        cy.get('#algoDijkstra').should('not.be.checked');
        cy.get('#algoBoth').check().should('be.checked');
        cy.get('#algoAStar').should('not.be.checked');
    });
    
    it('calculates and displays stats for Dijkstra\'s algorithm', () => {
        runRoute({ mode: 'dijkstra', showSteps: false });
        cy.get('#runButton').should('not.be.disabled');
        assertFilledStats('dijkstra');
        assertEmptyStats('astar');
    });

    it('calculates and displays stats for A* algorithm', () => {
        runRoute({ mode: 'astar', showSteps: false });
        cy.get('#runButton').should('not.be.disabled');
        assertEmptyStats('dijkstra');
        assertFilledStats('astar');
    });
    
    it('calculates and displays stats for both algorithms in comparison mode', () => {
        runRoute({ mode: 'both', showSteps: false });
        cy.get('#runButton').should('not.be.disabled');
        assertFilledStats('dijkstra');
        assertFilledStats('astar');
    });

    it('switches the populated stats when the selected algorithm changes', () => {
        runRoute({ mode: 'dijkstra', showSteps: false });

        cy.get('#runButton').should('not.be.disabled');
        assertFilledStats('dijkstra');
        assertEmptyStats('astar');

        runRoute({ mode: 'astar', showSteps: false });

        cy.get('#runButton').should('not.be.disabled');
        assertEmptyStats('dijkstra');
        assertFilledStats('astar');
    });

    it('shows matching shortest distances for Dijkstra and A* in comparison mode', () => {
        runRoute({ mode: 'both', showSteps: false });

        assertFilledStats('dijkstra');
        assertFilledStats('astar');

        cy.get('#dijkstraDistance').invoke('text').then((distance) => {
            cy.get('#astarDistance').should('have.text', distance);
        });
    });

    it('disables the run button during animated visualization and re-enables it afterwards', () => {
        configureRoute({ mode: 'both', showSteps: true, delay: '50' });

        cy.get('#runButton').click();
        cy.get('#runButton').should('be.disabled');
        cy.get('#runButton', { timeout: 10000 }).should('not.be.disabled');

        assertFilledStats('dijkstra');
        assertFilledStats('astar');
    });
});


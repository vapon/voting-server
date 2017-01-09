import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds records to the state', () => {
            const state = Map();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        })
    });

    describe('next', () => {
        it('next two records for a voting', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));

        });
    });

    describe('vote', () => {
        it('creates voting result for the record', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List()
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 1
                    }),
                }),

                entries: List()
            }));
        });
        it('adds voting result for the record', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 1,
                        '28 Days Later': 2
                    }),
                }),

                entries: List()
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 2,
                        '28 Days Later': 2
                    }),
                }),

                entries: List()
            }));
        });
    });
});
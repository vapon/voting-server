import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next } from '../src/core';

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
});
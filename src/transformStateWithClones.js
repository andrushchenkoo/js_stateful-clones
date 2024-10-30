'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    currentState = { ...currentState };

    if (action.type === 'addProperties') {
      const { extraData } = action;

      Object.assign(currentState, extraData);
    } else if (action.type === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }
    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;

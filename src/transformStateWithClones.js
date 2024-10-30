/* eslint-disable no-fallthrough */
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

    switch (action.type) {
      case 'addProperties': {
        const { extraData } = action;

        Object.assign(currentState, extraData);
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
      }

      default: {
        return `Unknown action type: ${action.type}`;
      }
    }
    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;

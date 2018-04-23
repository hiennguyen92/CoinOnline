import { combineReducers } from 'redux';

import {
  ADD_COIN, EDIT_COIN, DELETE_COIN, VisibilityFilters, UPDATE_SETTING, SHOW_SETTING, REMOVE_ALL
} from '../actions/actions';

const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function settings(state = {
  nation: 'usd'
}, action) {
  switch (action.type) {
    // case INITIAL_SETTING:
    //     return {
    //         'nation' : 'gbp',
    //     };
    case UPDATE_SETTING:
      return {
        nation: action.nation,
        storage: action.storage
      };
    case SHOW_SETTING:
      return state;
    default:
      return state;
  }
}

function coins(state = [], action) {
  switch (action.type) {
    case ADD_COIN:
      return [
        ...state,
        {
          text: action.text,
          numbers: action.numbers,
          balance: action.balance,
          description: action.description || '',
          deleted: false
        }
      ];
    case EDIT_COIN:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          text: action.text,
          numbers: action.numbers,
          balance: action.balance,
          description: action.description,
          deleted: false
        }),
        ...state.slice(action.index + 1)
      ];
    case DELETE_COIN:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          deleted: true
        }),
        ...state.slice(action.index + 1)
      ];
    case REMOVE_ALL:
      state = [];
      return state;
    default:
      return state;
  }
}

const reducers = combineReducers({
  coins,
  settings
});

export default {
  reducer: reducers
};

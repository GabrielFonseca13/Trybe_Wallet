import {
  FETCH_CURRENCIES,
  SAVE_EXPENSE,
  SOMA_TOTAL_DESPESA,
  SAVE_CAMBIO,
} from '../actions/index';

const INITIAL_STATE = {

  value: 0,
  currencies: ['BRL'],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case SOMA_TOTAL_DESPESA:
    return {
      ...state,
      value: state.value + action.payload,
    };

  case SAVE_CAMBIO:
    return {
      ...state,
      expenses: action.payload,
    };

  default:
    return state;
  }
};

export default walletReducer;

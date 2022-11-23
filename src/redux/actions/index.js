export const USER_EMAIL = 'USER_EMAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SOMA_TOTAL_DESPESA = 'SOMA_TOTAL_DESPESA';
export const SAVE_CAMBIO = 'SAVE_CAMBIO';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveUser = (payload) => (
  {
    type: USER_EMAIL,
    payload,
  }
);

export const fetchCurrencies = (payload) => (
  {
    type: FETCH_CURRENCIES,
    payload,
  }
);

export const saveExpenseReducer = (payload) => (
  {
    type: SAVE_EXPENSE,
    payload,
  }
);

export const somaTotalAction = (payload) => (
  {
    type: SAVE_EXPENSE,
    payload,
  }
);

export const saveCambioAction = (payload) => (
  {
    type: SAVE_CAMBIO,
    payload,
  }
);

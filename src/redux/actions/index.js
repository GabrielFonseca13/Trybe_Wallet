export const USER_EMAIL = 'USER_EMAIL';

export const saveUser = (payload) => (
  {
    type: USER_EMAIL,
    payload,
  }
);

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const fetchCurrencies = (payload) => (
  {
    type: FETCH_CURRENCIES,
    payload,
  }
);

const INITIAL_STATE = {
  valor: 0,
  moeda: ['BRL'],
  metodoPagamento: [],
  tag: [],
  descricao: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default walletReducer;

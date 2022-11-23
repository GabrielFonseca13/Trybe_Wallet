import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExpenseReducer } from '../redux/actions';
import getCurrencies from '../services/services';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    // exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const fetchcurrencies = await getCurrencies();
    const arrayCurrencies = Object.keys(fetchcurrencies)
      .filter((currencie) => currencie !== 'USDT');
    dispatch(fetchCurrencies(arrayCurrencies));
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const fetchCambio = await getCurrencies();
    delete fetchCambio.USDT;
    const expenseDatas = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: fetchCambio,
    };
    dispatch(saveExpenseReducer(expenseDatas));
    this.setState((state) => ({
      id: state.id + 1,
      value: '',
      description: '',
    }));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    const metodoDePagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoria = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <div>
        <h5>
          WalletForm
        </h5>
        <div>
          <label htmlFor="value">
            Valor da Despesa:
            <input
              type="text"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da Despesa:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda da Despesa:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {
                currencies
                  .map((currencieOption, index) => (
                    <option key={ index } value={ currencieOption }>
                      {currencieOption}
                    </option>
                  ))
              }
            </select>
          </label>

          <label htmlFor="method">
            Método de Pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              {
                metodoDePagamento
                  .map((metodo, index) => (
                    <option key={ index } value={ metodo }>
                      {metodo}
                    </option>
                  ))
              }
            </select>
          </label>
          <label htmlFor="tag">
            TAG:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              {
                categoria
                  .map((category, index) => (
                    <option key={ index } value={ category }>
                      {category}
                    </option>
                  ))
              }
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

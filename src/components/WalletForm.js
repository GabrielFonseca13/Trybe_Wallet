import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import getCurrencies from '../services/services';

class WalletForm extends Component {
  state = {
    valorDaDespesa: 0,
    descricaoDaDespesa: '',
    metodoDePagamento: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
    tag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
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

  render() {
    const {
      valorDaDespesa,
      descricaoDaDespesa,
      metodoDePagamento,
      tag,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div>
        <h5>
          WalletForm
        </h5>
        <div>
          <label htmlFor="valorDaDespesa">
            Valor da Despesa:
            <input
              type="text"
              name="valorDaDespesa"
              id="valorDaDespesa"
              data-testid="value-input"
              value={ valorDaDespesa }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricaoDaDespesa">
            Descrição da Despesa:
            <input
              type="text"
              name="descricaoDaDespesa"
              id="descricaoDaDespesa"
              data-testid="description-input"
              value={ descricaoDaDespesa }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="moedaDaDespesa">
            Moeda da Despesa:
            <select
              name="moedaDaDespesa"
              id="moedaDaDespesa"
              data-testid="currency-input"
            >
              {
                currencies
                  .map((currencieOption, index) => (
                    <option key={ index }>
                      {currencieOption}
                    </option>
                  ))
              }
            </select>
          </label>

          <label htmlFor="metodoDePagamento">
            Método de Pagamento:
            <select
              name="metodoDePagamento"
              id="metodoDePagamento"
              data-testid="method-input"
            >
              <option value="">
                {metodoDePagamento[0]}
              </option>
              <option value="">
                {metodoDePagamento[1]}
              </option>
              <option value="">
                {metodoDePagamento[2]}
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            TAG:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
            >
              <option value="">
                {tag[0]}
              </option>
              <option value="">
                {tag[1]}
              </option>
              <option value="">
                {tag[2]}
              </option>
              <option value="">
                {tag[3]}
              </option>
              <option value="">
                {tag[4]}
              </option>
            </select>
          </label>
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

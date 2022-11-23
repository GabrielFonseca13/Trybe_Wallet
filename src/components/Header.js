import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalSum = () => {
    const { expenses } = this.props;
    // console.log(expenses);
    const sim = expenses.reduce((acc, curr) => {
      const currencyToMatch = curr.currency;
      acc += curr.value * curr.exchangeRates[currencyToMatch].ask;
      console.log(acc);
      console.log(curr);
      return acc;
    }, 0);
    return parseFloat(sim).toFixed(2);
  };

  render() {
    const { email, currencies, expenses } = this.props;
    const value = Number(this.totalSum());
    return (
      <div>
        <h4>
          Header
        </h4>
        <p data-testid="email-field">
          Email:
          {' '}
          { email }
        </p>
        <p data-testid="total-field">
          { expenses.length === 0 ? '0.00' : value }
        </p>
        <p data-testid="header-currency-field">
          Moeda:
          {' '}
          { currencies[0] }

        </p>
        {/* <button
          onClick={ () => {
            const um = '1';
            const dois = '2';
            console.log(um + dois);
          } }
        >
          teste
        </button> */}
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // value: PropTypes.number.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // exchangeRates
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  value: state.wallet.value,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

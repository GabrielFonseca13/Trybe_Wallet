import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, valor, moeda } = this.props;
    return (
      <div>
        <h4>
          Header
        </h4>
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <p data-testid="total-field">
          Despesa Total:
          {' '}
          { valor }
        </p>
        <p data-testid="header-currency-field">
          Moeda:
          {' '}
          {moeda[0]}

        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  moeda: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  valor: state.wallet.valor,
  moeda: state.wallet.moeda,
});

export default connect(mapStateToProps)(Header);

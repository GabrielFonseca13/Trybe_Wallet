import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.buttonValidation());
  };

  buttonValidation = () => {
    const { email, password } = this.state;
    const minPasswordSize = 6;
    const fmtEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/i;
    const emailValidate = fmtEmail.test(email);
    if (password.length >= minPasswordSize && emailValidate) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    const { dispatch, history } = this.props;
    return (
      <div>
        <h1>
          Login
        </h1>
        <form>
          <div data-testid="page-login">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                id="email"
                data-testid="email-input"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              id="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ btnDisabled }
            onClick={ () => dispatch(saveUser(email), history.push('/carteira')) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);

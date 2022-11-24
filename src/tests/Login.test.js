import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes da Página de login', () => {
  it('Testa se os elementos estao na tela.', () => {
    renderWithRouterAndRedux(<App />);

    const loginTitle = screen.getByRole('heading', { name: /Login/i, level: 1 });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    expect(loginTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
  it('Testa se os elementos funcionam', () => {
    // const EMAIL_FAIL_TEST = 'EMAIL_INVÁLIDO';
    const EMAIL_TEST = 'email@teste.com';
    const PASSWORD_TEST = '123456';
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    expect(submitButton).toBeDisabled();

    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(passwordInput, PASSWORD_TEST);

    expect(submitButton).not.toBeDisabled();

    userEvent.click(submitButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

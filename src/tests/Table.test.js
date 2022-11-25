import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_TESTE = 'EMAIL_TESTE@TESTE.COM';
const PASSWORD_TEST = 'password';

describe('Testes da Página Wallet', () => {
  it('Testa se os componentes renderizam na tela ao iniciar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('./carteira');
    });

    const emailField = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');
    const currencyTotalExpenses = screen.getByTestId('header-currency-field');
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencySelect = screen.getByTestId('currency-input');
    const methodSelect = screen.getByTestId('method-input');
    const categorySelect = screen.getByTestId('tag-input');
    const addExpenseButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(emailField).toBeInTheDocument();
    expect(totalExpenses).toBeInTheDocument();
    expect(currencyTotalExpenses).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencySelect).toBeInTheDocument();
    expect(methodSelect).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Testa se os elementos funcionam', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, EMAIL_TESTE);
    userEvent.type(passwordInput, PASSWORD_TEST);

    expect(emailInput).toHaveValue(EMAIL_TESTE);
    expect(passwordInput).toHaveValue(PASSWORD_TEST);

    userEvent.click(submitButton);

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(valueInput, '111.11');
    userEvent.type(descriptionInput, 'Teste Description');
    userEvent.click(addExpenseButton);
  });
  it('Testa se a API foi chamada com o endpoint correto', () => {
  });
  it('Testa se é renderizado a nova despesa na tela', () => {
  });
  it('Testa se o Botão apaga a despesa', () => {
  });
});

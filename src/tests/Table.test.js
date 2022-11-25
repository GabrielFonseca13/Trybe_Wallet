import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

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
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<App />);

    expect(global.fetch).toHaveBeenCalledTimes(0);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, EMAIL_TESTE);
    userEvent.type(passwordInput, PASSWORD_TEST);

    expect(emailInput).toHaveValue(EMAIL_TESTE);
    expect(passwordInput).toHaveValue(PASSWORD_TEST);

    userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toBeInTheDocument();

    const totalExpenses = screen.getByTestId('total-field');
    expect(totalExpenses).toBeInTheDocument();
    expect(totalExpenses).toHaveTextContent('0.00');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(valueInput, '111.11');
    userEvent.type(descriptionInput, 'Teste Description');
    userEvent.click(addExpenseButton);

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const valueTable = await screen.findByText('111.11');
    const descriptionTable = await screen.findByText('Teste Description');

    expect(valueTable).toBeInTheDocument();
    expect(descriptionTable).toBeInTheDocument();

    expect(totalExpenses).toHaveTextContent('528.12');

    const deleteButton = screen.getByRole('button', { name: 'Editar/Excluir' });
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);

    expect(valueTable).not.toBeInTheDocument();
    expect(descriptionTable).not.toBeInTheDocument();
    expect(totalExpenses).toHaveTextContent('0.00');
  });
});

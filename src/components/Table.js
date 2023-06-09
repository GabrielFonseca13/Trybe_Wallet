import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCambioAction } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { dispatch, expenses } = this.props;
    const updatedArray = expenses.filter((expense) => expense.id !== id);
    console.log('expenses', expenses);
    console.log('updated', updatedArray);
    dispatch(saveCambioAction(updatedArray));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => ((
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td>
                  {
                    (Number(expense.value * expense.exchangeRates[expense.currency].ask))
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Editar/Excluir
                  </button>
                </td>
              </tr>
            )))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

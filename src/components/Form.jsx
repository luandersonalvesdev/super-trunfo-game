import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  renderInputSuperTrunfo = () => {
    const { onInputChange, cardTrunfo } = this.props;
    return (
      <input
        data-testid="trunfo-input"
        type="checkbox"
        name="cardTrunfo"
        onChange={ onInputChange }
        checked={ cardTrunfo }
      />
    );
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      hasTrunfo,
      isSaveButtonDisabled,
      onSaveButtonClick,
      onInputChange,
    } = this.props;
    return (
      <form>
        <label>
          Nome da carta:
          <input
            data-testid="name-input"
            type="text"
            name="cardName"
            onChange={ onInputChange }
            value={ cardName }
          />
        </label>

        <label>
          Descrição da carta:
          <textarea
            data-testid="description-input"
            name="cardDescription"
            cols="30"
            rows="10"
            onChange={ onInputChange }
            value={ cardDescription }
          />
        </label>

        <label>
          Ataque:
          <input
            data-testid="attr1-input"
            type="number"
            name="cardAttr1"
            onChange={ onInputChange }
            value={ cardAttr1 }
          />
        </label>

        <label>
          Defesa:
          <input
            data-testid="attr2-input"
            type="number"
            name="cardAttr2"
            onChange={ onInputChange }
            value={ cardAttr2 }
          />
        </label>

        <label>
          Agilidade:
          <input
            data-testid="attr3-input"
            type="number"
            name="cardAttr3"
            onChange={ onInputChange }
            value={ cardAttr3 }
          />
        </label>

        <label>
          Imagem:
          <input
            data-testid="image-input"
            type="text"
            name="cardImage"
            onChange={ onInputChange }
            value={ cardImage }
          />
        </label>

        <label>
          Raridade:
          <select
            name="cardRare"
            data-testid="rare-input"
            onChange={ onInputChange }
            value={ cardRare }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>

        {
          hasTrunfo
            ? <p>Você já tem um Super Trunfo em seu baralho</p>
            : (
              <label>
                Super Trunfo
                {' '}
                {this.renderInputSuperTrunfo()}
              </label>)
        }

        <button
          data-testid="save-button"
          onClick={ onSaveButtonClick }
          disabled={ isSaveButtonDisabled }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

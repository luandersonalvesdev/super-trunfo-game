import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css'

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
        <h2>Adicione uma nova carta</h2>
        <div className="container-intro-new-card">
          <label>
            <span>Nome da carta</span>
            <input
              data-testid="name-input"
              type="text"
              name="cardName"
              onChange={ onInputChange }
              value={ cardName }
              maxLength={20}
            />
          </label>

          <label>
            <span>Descrição da carta</span>
            <textarea
              data-testid="description-input"
              name="cardDescription"
              cols="30"
              rows="10"
              onChange={ onInputChange }
              value={ cardDescription }
              maxLength={120}
            />
          </label>
        </div>

      <div className="container-attrs">
        <label>
          <span>Ataque</span>
          <input
            data-testid="attr1-input"
            type="number"
            name="cardAttr1"
            onChange={ onInputChange }
            value={ cardAttr1 }
          />
        </label>

        <label>
          <span>Defesa</span>
          <input
            data-testid="attr2-input"
            type="number"
            name="cardAttr2"
            onChange={ onInputChange }
            value={ cardAttr2 }
          />
        </label>

        <label>
          <span>Agilidade</span>
          <input
            data-testid="attr3-input"
            type="number"
            name="cardAttr3"
            onChange={ onInputChange }
            value={ cardAttr3 }
          />
        </label>
      </div>
        

        <label className="label-img">
          <span>Imagem</span>
          <input
            data-testid="image-input"
            type="text"
            name="cardImage"
            onChange={ onInputChange }
            value={ cardImage }
          />
        </label>

        <label className="container-rare">
          <span>Raridade</span>
          <select
            name="cardRare"
            data-testid="rare-input"
            onChange={ onInputChange }
            value={ cardRare }
          >
            <option value="Normal">Normal</option>
            <option value="Raro">Raro</option>
            <option value="Muito raro">Muito raro</option>
          </select>
        </label>

      <div className="container-final">
        {
          hasTrunfo
            ? <span>Você já tem um Super Trunfo</span>
            : (
              <label>
                {this.renderInputSuperTrunfo()}
                <span>Super Trunfo</span>
              </label>)
        }

        <button
          data-testid="save-button"
          onClick={ onSaveButtonClick }
          disabled={ isSaveButtonDisabled }
        >
          Salvar
        </button>
      </div>
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

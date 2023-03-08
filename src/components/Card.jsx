import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../components/Card.css';

export default class Card extends Component {
  fCheckHasOnDeck = () => {
    const { hasOnDeck, fDeleteCard, cardName } = this.props;
    if (hasOnDeck) {
      return (
        <button
          id={ cardName }
          data-testid="delete-button"
          onClick={ fDeleteCard }
        >
          Excluir
        </button>);
    }
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
      cardTrunfo,
      hasOnDeck,
    } = this.props;
    return (
      <div className="card">
        <div className="card-inside">
          <h2 data-testid="name-card">{cardName}</h2>
          <div className="container-img">
            <img src={ cardImage } alt={ cardName } data-testid="image-card" />
          </div>
          <h3 className="description-card" data-testid="description-card">{cardDescription}</h3>
          <div className="container-attr">
            <div>
              <span>Ataque</span>
              <p data-testid="attr1-card">{cardAttr1}</p>
            </div>
            <div>
              <span>Defesa</span>
              <p data-testid="attr2-card">{cardAttr2}</p>
            </div>
            <div>
              <span>Agilidade</span>
              <p data-testid="attr3-card">{cardAttr3}</p>
            </div>
          </div>
          <div className="container-final">
            <span data-testid="rare-card">{cardRare}</span>
            {
              cardTrunfo && <span id="super" data-testid="trunfo-card">Super Trunfo</span>
            }
            {
              hasOnDeck && this.fCheckHasOnDeck()
            }
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasOnDeck: PropTypes.bool,
  fDeleteCard: PropTypes.func,
};

Card.defaultProps = {
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardRare: 'normal',
  cardTrunfo: false,
  hasOnDeck: false,
  fDeleteCard: null,
};

import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

const MAX_ATTR = 210;
const MAX_PER_ATTR = 90;

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    allCards: [],
    filteredAllCards: [],
    filterTrunfo: false,
  };

  fValidateSaveBtn = () => {
    const { cardName, cardImage, cardDescription, cardAttr1, cardAttr2,
      cardAttr3 } = this.state;
    const validateSaveBtn = !!cardName.length
    && !!cardDescription.length
    && !!cardImage.length
    && (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)) <= MAX_ATTR
    && Number(cardAttr1) <= MAX_PER_ATTR
    && Number(cardAttr2) <= MAX_PER_ATTR
    && Number(cardAttr3) <= MAX_PER_ATTR
    && Number(cardAttr1) >= 0
    && Number(cardAttr2) >= 0
    && Number(cardAttr3) >= 0;

    if (validateSaveBtn) {
      this.setState(() => ({
        isSaveButtonDisabled: false,
      }));
      return;
    }

    this.setState(() => ({
      isSaveButtonDisabled: true,
    }));
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({
      [name]: value,
    }), this.fValidateSaveBtn);
  };

  checkHasTrunfo = () => {
    const {
      allCards,
    } = this.state;

    const cardTrunfo = allCards.some((card) => card.cardTrunfo);

    if (cardTrunfo) {
      this.setState(() => ({
        hasTrunfo: true,
        cardTrunfo: false,
      }));
    } else {
      this.setState(() => ({
        hasTrunfo: false,
      }));
    }
  };

  onSaveButtonClick = (e) => {
    e.preventDefault();
    const { cardName, cardDescription, cardImage, cardAttr1, cardAttr2, cardAttr3,
      cardRare, allCards, cardTrunfo } = this.state;
    const newCard = { cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      allCards,
      cardTrunfo,
      hasOnDeck: true,
    };

    this.setState((prev) => ({
      allCards: [...prev.allCards, newCard],
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      filteredAllCards: [...prev.allCards, newCard],
    }), this.checkHasTrunfo);
  };

  fDeleteCard = ({ target: { id } }) => {
    const { allCards } = this.state;
    const newAllCards = allCards;
    allCards.forEach((card) => {
      if (card.cardName === id) {
        const indexof = allCards.indexOf(card);
        newAllCards.splice(indexof, 1);
        this.setState(() => ({
          allCards: newAllCards,
          filteredAllCards: newAllCards,
        }), this.checkHasTrunfo);
      }
    });
  };

  fFilterByName = ({ target: { value } }) => {
    const { allCards } = this.state;
    const filtered = allCards.filter((card) => card.cardName.includes(value));
    this.setState(() => ({
      filteredAllCards: filtered,
    }));
  };

  fFilterByRare = ({ target: { value } }) => {
    const { allCards } = this.state;
    const filtered = allCards.filter((card) => {
      if (value === 'todas') {
        return true;
      }
      if (card.cardRare === value) {
        return true;
      }
      return null;
    });
    this.setState(() => ({
      filteredAllCards: filtered,
    }));
  };

  fFilterBySuperTrunfo = ({ target: { checked } }) => {
    const { allCards } = this.state;
    if (checked) {
      const filtered = allCards.filter((card) => card.cardTrunfo);
      this.setState(() => ({
        filteredAllCards: filtered,
        filterTrunfo: true,
      }));
      return;
    }
    this.setState(() => ({
      filteredAllCards: allCards,
      filterTrunfo: false,
    }));
  };

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled, filteredAllCards,
      filterTrunfo } = this.state;

    return (
      <>
        <div>
          <h1>Tryunfo</h1>
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
            fTest={ this.fTest }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </div>

        <input
          type="text"
          data-testid="name-filter"
          onChange={ this.fFilterByName }
          disabled={ filterTrunfo }
        />

        <select
          name=""
          data-testid="rare-filter"
          onChange={ this.fFilterByRare }
          disabled={ filterTrunfo }
        >
          <option value="todas">todas</option>
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>

        <label>
          Super Trunfo
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            onChange={ this.fFilterBySuperTrunfo }
          />
        </label>

        <div className="container-card">
          {
            filteredAllCards.map((card, i) => (
              <Card
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
                hasOnDeck={ card.hasOnDeck }
                key={ i }
                fDeleteCard={ this.fDeleteCard }
              />))
          }
        </div>
      </>
    );
  }
}

export default App;

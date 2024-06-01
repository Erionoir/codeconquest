document.addEventListener('DOMContentLoaded', () => {
    const cards = [
      { id: 1, name: 'For Loop', solution: 'for' },
      { id: 2, name: 'If Statement', solution: 'if' },
      { id: 3, name: 'Function', solution: 'function' },
      { id: 4, name: 'While Loop', solution: 'while' },
      { id: 5, name: 'Array Method', solution: 'array' },
      { id: 6, name: 'Object Method', solution: 'object' },
      { id: 7, name: 'Switch Statement', solution: 'switch' },
      { id: 8, name: 'Class', solution: 'class' },
      { id: 9, name: 'Promise', solution: 'promise' },
      { id: 10, name: 'Async/Await', solution: 'async' },
      // Add more cards as needed
    ];
  
    const problems = [
      { id: 1, description: 'Iterate over an array', solution: 'for' },
      { id: 2, description: 'Check a condition', solution: 'if' },
      { id: 3, description: 'Create reusable code', solution: 'function' },
      { id: 4, description: 'Repeat until condition', solution: 'while' },
      { id: 5, description: 'Manipulate array', solution: 'array' },
      { id: 6, description: 'Access object properties', solution: 'object' },
      { id: 7, description: 'Conditional execution', solution: 'switch' },
      { id: 8, description: 'Blueprint of objects', solution: 'class' },
      { id: 9, description: 'Handle async operations', solution: 'promise' },
      { id: 10, description: 'Async code', solution: 'async' },
      // Add more problems as needed
    ];
  
    const cardsContainer = document.getElementById('cards');
    const problemsContainer = document.getElementById('problems');
    const deckContainer = document.getElementById('deck');
    const resetButton = document.getElementById('reset-button');
    let resetCount = 3;
    let deck = [...cards];
    let hand = [];
  
    function getRandomCards(num) {
      const shuffled = deck.sort(() => 0.5 - Math.random());
      return shuffled.splice(0, num);
    }
  
    function renderCards() {
      cardsContainer.innerHTML = '';
      hand = getRandomCards(5);
      hand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.solution = card.solution;
        cardElement.textContent = card.name;
        cardElement.addEventListener('click', handleCardClick);
        cardsContainer.appendChild(cardElement);
      });
    }
  
    function renderProblems() {
      problemsContainer.innerHTML = '';
      problems.forEach(problem => {
        const problemElement = document.createElement('div');
        problemElement.classList.add('problem');
        problemElement.dataset.solution = problem.solution;
        problemElement.textContent = problem.description;
        problemElement.addEventListener('click', handleProblemClick);
        problemsContainer.appendChild(problemElement);
      });
    }
  
    function updateDeck() {
      deckContainer.textContent = `Deck (${deck.length})`;
    }
  
    let selectedCard = null;
  
    function handleCardClick(event) {
      const cardElement = event.target;
      if (cardElement.classList.contains('selected')) {
        cardElement.classList.remove('selected');
        selectedCard = null;
      } else {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));
        cardElement.classList.add('selected');
        selectedCard = cardElement.dataset.solution;
      }
    }
  
    function handleProblemClick(event) {
      const problemElement = event.target;
      const problemSolution = problemElement.dataset.solution;
  
      if (selectedCard === problemSolution) {
        problemElement.classList.add('solved');
        problemElement.textContent += ' - Solved!';
        problemElement.style.opacity = '0';
        setTimeout(() => problemElement.remove(), 500);
        document.querySelectorAll('.card').forEach(card => {
          if (card.classList.contains('selected')) {
            card.classList.add('solved');
            setTimeout(() => card.remove(), 500);
          }
        });
        selectedCard = null;
        setTimeout(() => drawCard(), 500);
      } else {
        alert('Incorrect solution! Try again.');
      }
    }
  
    function handleReset() {
      if (resetCount > 0) {
        resetCount--;
        shuffleAnimation();
        setTimeout(() => {
          renderCards();
          resetButton.textContent = `Reset Hand (${resetCount})`;
        }, 1000);
      } else {
        alert('No more resets left!');
      }
    }
  
    function shuffleAnimation() {
      document.querySelectorAll('.card').forEach(card => {
        card.style.animation = 'shuffle 1s';
        setTimeout(() => card.style.animation = '', 1000);
      });
    }
  
    function drawCard() {
      if (deck.length > 0) {
        const newCard = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.solution = newCard.solution;
        cardElement.textContent = newCard.name;
        cardElement.addEventListener('click', handleCardClick);
        cardElement.style.opacity = '0';
        cardsContainer.appendChild(cardElement);
        setTimeout(() => {
          cardElement.style.opacity = '1';
          updateDeck();
        }, 500);
      }
    }
  
    resetButton.addEventListener('click', handleReset);
  
    function setupGame() {
      renderCards();
      renderProblems();
      updateDeck();
    }
  
    setupGame();
  });
  
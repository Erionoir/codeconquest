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
    { id: 11, name: 'Arrow Function', solution: 'arrow' },
    { id: 12, name: 'Template Literal', solution: 'template' },
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
    { id: 11, description: 'Shorter function syntax', solution: 'arrow' },
    { id: 12, description: 'String interpolation', solution: 'template' },
    // Add more problems as needed
  ];

  const cardsContainer = document.getElementById('cards');
  const problemsContainer = document.getElementById('problems');
  const deckContainer = document.getElementById('deck');
  const resetButton = document.getElementById('reset-button');
  const settingsButton = document.getElementById('settings-button');
  const settingsContainer = document.getElementById('settings-container');
  const settingsCloseButton = document.getElementById('settings-close');

  settingsButton.addEventListener('click', () => {
    settingsContainer.style.display = 'flex';
    settingsContainer.style.animation = 'fadeIn 0.3s forwards';
  });

  settingsCloseButton.addEventListener('click', () => {
    settingsContainer.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => {
      settingsContainer.style.display = 'none';
    }, 300);
  });

  settingsCloseButton.addEventListener('click', () => {
    settingsContainer.style.display = 'none';
  });
  let resetCount = 3;
  let deck = [...cards];
  let hand = [];

  document.getElementById('play-button').addEventListener('click', () => {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
  });

  function getRandomCards(num) {
    const shuffled = deck.sort(() => 0.5 - Math.random());
    return shuffled.splice(0, num);
  }

  function renderCards() {
    cardsContainer.innerHTML = '';
    hand = getRandomCards(5);
  
    const problemSolutions = Array.from(problemsContainer.children).map(problem => problem.dataset.solution);
    if (!hand.some(card => problemSolutions.includes(card.solution))) {
      const cardWithSolution = deck.find(card => problemSolutions.includes(card.solution));
      if (cardWithSolution) {
        hand[0] = cardWithSolution;
      }
    }
  
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
    problems.slice(0, 5).forEach(problem => {
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
  let deckModal;

  deckContainer.addEventListener('mouseenter', () => {
    deckModal = document.createElement('div');
    deckModal.classList.add('deck-modal');
    deck.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.textContent = card.name;
      deckModal.appendChild(cardElement);
    });
    document.body.appendChild(deckModal);
  });

  deckContainer.addEventListener('mouseleave', () => {
    if (deckModal) {
      deckModal.remove();
    }
  });
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

let spawnedProblems = [];

function renderProblem() {
  const cardSolutions = deck.map(card => card.solution);
  const problemWithSolution = problems.find(problem => cardSolutions.includes(problem.solution) && !spawnedProblems.includes(problem.id));
  
  if (problemWithSolution) {
    spawnedProblems.push(problemWithSolution.id);
    const problemElement = document.createElement('div');
    problemElement.classList.add('problem');
    problemElement.dataset.solution = problemWithSolution.solution;
    problemElement.textContent = problemWithSolution.description;
    problemElement.addEventListener('click', handleProblemClick);
    problemsContainer.appendChild(problemElement);
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
    problemsContainer.removeChild(event.target);
    if (problemsContainer.children.length < 5) {
      renderProblem();
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

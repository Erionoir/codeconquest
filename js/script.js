document.addEventListener('DOMContentLoaded', () => {
  const cards = [
    { id: 1, name: 'For Loop', solution: 'for', description: 'Used to repeat a block of code a known number of times.', usage: 'for (let i = 0; i < array.length; i++) { /* code */ }' },
    { id: 2, name: 'If Statement', solution: 'if', description: 'Used to execute a block of code if a specified condition is true.', usage: 'if (condition) { /* code */ }' },
    { id: 3, name: 'Function', solution: 'function', description: 'Used to define a reusable block of code.', usage: 'function functionName(parameters) { /* code */ }' },
    { id: 4, name: 'While Loop', solution: 'while', description: 'Used to repeat a block of code as long as a specified condition is true.', usage: 'while (condition) { /* code */ }' },
    { id: 5, name: 'Array Method', solution: 'array', description: 'Used to perform operations on arrays.', usage: 'array.method()' },
    { id: 6, name: 'Object Method', solution: 'object', description: 'Used to perform operations on objects.', usage: 'object.method()' },
    { id: 7, name: 'Switch Statement', solution: 'switch', description: 'Used to perform different actions based on different conditions.', usage: 'switch(expression) { case x: /* code */ break; case y: /* code */ break; default: /* code */ }' },
    { id: 8, name: 'Class', solution: 'class', description: 'Used to create a blueprint for objects.', usage: 'class ClassName { constructor() { /* code */ } }' },
    { id: 9, name: 'Promise', solution: 'promise', description: 'Used to handle asynchronous operations.', usage: 'new Promise((resolve, reject) => { /* code */ })' },
    { id: 10, name: 'Async/Await', solution: 'async', description: 'Used to write asynchronous code in a synchronous manner.', usage: 'async function functionName() { await /* code */ }' },
    { id: 11, name: 'Arrow Function', solution: 'arrow', description: 'Used to define a function with a shorter syntax.', usage: 'const functionName = (parameters) => { /* code */ }' },
    { id: 12, name: 'Template Literal', solution: 'template', description: 'Used to embed expressions within string literals.', usage: 'const string = `Text with ${expression}`;' },
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

  const dictionaryButton = document.getElementById('dictionary-button');
  const dictionaryCloseButton = document.getElementById('dictionary-close');
  const dictionaryContainer = document.getElementById('code-dictionary-container');

  dictionaryButton.addEventListener('click', () => {
    dictionaryContainer.style.display = 'block';
    dictionaryContainer.style.animation = 'fadeIn 0.3s forwards';
  });
  
  dictionaryCloseButton.addEventListener('click', () => {
    dictionaryContainer.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => {
      dictionaryContainer.style.display = 'none';
    }, 300);
  });

  document.getElementById('play-button').addEventListener('click', function() {
    document.getElementById('game-container').classList.add('fade-in');
  });

  function populateCodeDictionary() {
    const dictionaryContainer = document.getElementById('code-dictionary');
    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('dictionary-card');
      cardElement.textContent = `${card.name}: ${card.solution}`;
      cardElement.dataset.id = card.id;
      cardElement.dataset.name = card.name;
      cardElement.dataset.solution = card.solution;
      cardElement.dataset.description = card.description;
      cardElement.dataset.usage = card.usage;
      dictionaryContainer.appendChild(cardElement);
    });
    problems.forEach(problem => {
      const problemElement = document.createElement('div');
      problemElement.classList.add('dictionary-card');
      problemElement.textContent = `${problem.description}: ${problem.solution}`;
      problemElement.dataset.id = problem.id;
      problemElement.dataset.description = problem.description;
      problemElement.dataset.solution = problem.solution;
      dictionaryContainer.appendChild(problemElement);
    });
  }

  populateCodeDictionary();

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

  function updateGraveyard() {
    const graveyardContainer = document.getElementById('graveyard');
    graveyardContainer.textContent = `Graveyard (${removedCards.length})`;
    let graveyardModal;
  
    graveyardContainer.addEventListener('mouseenter', () => {
      graveyardModal = document.createElement('div');
      graveyardModal.classList.add('graveyard-modal');
      removedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.textContent = card.name;
        graveyardModal.appendChild(cardElement);
      });
      document.body.appendChild(graveyardModal);
    });
  
    graveyardContainer.addEventListener('mouseleave', () => {
      if (graveyardModal) {
        graveyardModal.remove();
      }
    });
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
      // Handle card usage and update the graveyard
      const card = hand.find(handCard => handCard.solution === selectedCard);
      if (card) {
        handleCardUsage(card);
      }
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

  let removedCards = [];

  function handleReset() {
    if (resetCount > 0) {
      resetCount--;
      shuffleAnimation();
      setTimeout(() => {
        deck = cards.filter(card => !removedCards.includes(card));
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

  function handleCardUsage(card) {
    // Find the index of the card in the hand
    const cardIndex = hand.findIndex(handCard => handCard.id === card.id);

    // If the card is in the hand, remove it
    if (cardIndex !== -1) {
      hand.splice(cardIndex, 1);
    }

    // Add the card to the removedCards array
    removedCards.push(card);

    // Update the graveyard
    updateGraveyard();
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

document.addEventListener('DOMContentLoaded', () => {
  const cards = [
    { id: 1, name: 'For Loop', solution: 'for', description: 'Used to repeat a block of code a known number of times.', usage: 'for (let i = 0; i < array.length; i++) { /* code */ }' },
    { id: 2, name: 'If Statement', solution: 'if', description: 'Used to check a condition and execute code based on the result.', usage: 'if (condition) { /* code */ }' },
    { id: 3, name: 'Function', solution: 'function', description: 'Used to define a reusable block of code.', usage: 'function name(parameters) { /* code */ }' },
    { id: 4, name: 'While Loop', solution: 'while', description: 'Used to repeat a block of code while a condition is true.', usage: 'while (condition) { /* code */ }' },
    { id: 5, name: 'Array Method', solution: 'array', description: 'Used to manipulate arrays.', usage: 'array.method()' },
    { id: 6, name: 'Object Method', solution: 'object', description: 'Used to manipulate objects.', usage: 'object.method()' },
    { id: 7, name: 'Switch Statement', solution: 'switch', description: 'Used to perform different actions based on different conditions.', usage: 'switch(expression) { case x: /* code */ break; }' },
    { id: 8, name: 'Class', solution: 'class', description: 'Used to create a blueprint for objects.', usage: 'class ClassName { constructor() { /* code */ } }' },
    { id: 9, name: 'Promise', solution: 'promise', description: 'Used to handle asynchronous operations.', usage: 'new Promise((resolve, reject) => { /* code */ })' },
    { id: 10, name: 'Async/Await', solution: 'async', description: 'Used to write asynchronous code in a synchronous manner.', usage: 'async function name() { await promise; }' },
    { id: 11, name: 'Arrow Function', solution: 'arrow', description: 'Used to write shorter function syntax.', usage: 'const name = (parameters) => { /* code */ }' },
    { id: 12, name: 'Template Literal', solution: 'template', description: 'Used to embed expressions in strings.', usage: 'const text = `string ${expression}`;' },
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
  let lives = 3; // P9a11
  let timer = 30; // Pba45
  let timerInterval; // Pba45

  document.getElementById('play-button').addEventListener('click', () => {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    startTimer(); // P6dfa
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
      decreaseLives(); // Pbc67
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

  function updateLivesIndicator() { // P4c81
    const livesCountElement = document.getElementById('lives-count');
    livesCountElement.textContent = lives;
  }

  function decreaseLives() { // Pbc67
    lives--;
    updateLivesIndicator();
    if (lives === 0) {
      endGame();
    }
  }

  function endGame() { // Pdc01
    alert('Game Over! You have no more lives left.');
    // Add any additional logic to end the game, such as resetting the game or showing a game over screen
    document.getElementById('title-screen').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
    clearInterval(timerInterval);
  }

  function updateTimer() { // P38f4
    const timerCountElement = document.getElementById('timer-count');
    timerCountElement.textContent = timer;
  }

  function startTimer() { // Pb05d
    timerInterval = setInterval(() => {
      timer--;
      updateTimer();
      if (timer === 0) {
        decreaseLives();
        timer = 30;
      }
    }, 1000);
  }

  resetButton.addEventListener('click', handleReset);

  function setupGame() {
    renderCards();
    renderProblems();
    updateDeck();
    updateLivesIndicator(); // P4c81
    updateTimer(); // P38f4
  }

  setupGame();

  // Add event listener to .dictionary-card elements to display title and description when clicked
  document.querySelectorAll('.dictionary-card').forEach(card => {
    card.addEventListener('click', () => {
      const entryTitle = document.getElementById('entry-title');
      const entryContent = document.getElementById('entry-content');
      const descriptionContent = document.getElementById('description-content');

      entryTitle.textContent = card.dataset.name;
      entryContent.textContent = card.dataset.solution;
      descriptionContent.textContent = card.dataset.description;

      document.querySelectorAll('.dictionary-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Add event listener to window resize event to adjust layout dynamically
  window.addEventListener('resize', () => {
    renderCards();
    renderProblems();
  });

  // Add touch event handling for mobile interactions
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('touchstart', handleCardClick);
  });

  document.querySelectorAll('.problem').forEach(problem => {
    problem.addEventListener('touchstart', handleProblemClick);
  });
});

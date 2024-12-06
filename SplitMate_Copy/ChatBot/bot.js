const chatBox = document.getElementById('chat-box');
const predefinedQuestions = [
  "How can I track my expenses?",
  "How do I split a bill?",
  "What is the dashboard for?",
  "How do I add a member?",
  "What should I do if I can't log in?",
  "How do I update my settings?",
  "How do I logout?"
];

window.onload = function () {
  displayPredefinedQuestions();
};

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();

  if (message) {
    // Display user message
    displayMessage('You', message);

    // Process bot response
    const botResponse = getBotResponse(message);
    setTimeout(() => displayMessage('Bot', botResponse), 500);

    // Clear input field
    userInput.value = '';
  }
}

const button = document.getElementById('myButton');
    // Add an event listener for the "keydown" event
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // Trigger button click
        button.click();
      }
    });


function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.className = sender === 'You' ? 'user-message' : 'bot-message';
  messageElement.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function getBotResponse(query) {
  query = query.toLowerCase(); // Convert input to lowercase for easier matching

  const responses = [
    { pattern: /hi|hello|hey/, response: "Hello! How can I assist you today?" },
    { pattern: /expenses|track/, response: "You can track your expenses in the 'Expenses' tab." },
    { pattern: /split bill/, response: "To split a bill, navigate to the 'Split Bills' section in the app." },
    { pattern: /dashboard/, response: "The dashboard shows an overview of your expenses." },
    { pattern: /add member/, response: "To add a member, go to the 'Members' section and click 'Add Member'." },
    { pattern: /login issue|can't log in/, response: "If you're facing login issues, please ensure your credentials are correct or reset your password." },
    { pattern: /settings/, response: "You can update your settings in the 'Settings' tab." },
    { pattern: /logout/, response: "To logout, click the 'Logout' button in the top right corner of the dashboard." }
  ];

  // Check for matching patterns
  for (const entry of responses) {
    if (entry.pattern.test(query)) {
      return entry.response;
    }
  }

  // Dynamic fallback for unrecognized queries
  return `I'm not sure about that yet, but I'm learning! Can you rephrase or try asking about expenses, settings, or dashboard?`;
}

function displayPredefinedQuestions() {
  const predefinedQuestionsContainer = document.createElement('div');
  predefinedQuestionsContainer.className = 'predefined-questions';

  predefinedQuestions.forEach((question) => {
    const questionButton = document.createElement('button');
    questionButton.className = 'question-button';
    questionButton.textContent = question;

    // Add click event listener to each button
    questionButton.addEventListener('click', () => {
      displayMessage('You', question);
      const botResponse = getBotResponse(question);
      setTimeout(() => displayMessage('Bot', botResponse), 500);
    });

    predefinedQuestionsContainer.appendChild(questionButton);
  });

  chatBox.appendChild(predefinedQuestionsContainer);
}

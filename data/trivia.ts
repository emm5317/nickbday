export interface TriviaQuestion {
  id: number;
  question: string;
  answers: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  funFact?: string;
  category: 'childhood' | 'favorites' | 'habits' | 'moments' | 'random';
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    category: 'childhood',
    question: "What was Nick's first job?",
    answers: ['Lifeguard', 'Grocery bagger', 'Lawn mowing', 'Pizza delivery'],
    correctIndex: 0,
    funFact: 'TODO: Add fun fact',
  },
  {
    id: 2,
    category: 'favorites',
    question: "What is Nick's go-to Halloween costume two years in a row?",
    answers: ['Walter White', 'Top Gun Maverick', 'Mario (with Luigi)', 'Chevy Chase Clark'],
    correctIndex: 0,
    funFact: 'TODO: Add fun fact',
  },
  {
    id: 3,
    category: 'habits',
    question: 'Which of these does Nick do every single morning?',
    answers: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
    correctIndex: 0,
    funFact: 'TODO: Add fun fact',
  },
  {
    id: 4,
    category: 'moments',
    question: "What is Nick's most-used phrase?",
    answers: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
    correctIndex: 0,
    funFact: 'TODO: Add fun fact',
  },
  {
    id: 5,
    category: 'random',
    question: "Nick's favorite movie is?",
    answers: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
    correctIndex: 0,
    funFact: 'TODO: Add fun fact',
  },
  // TODO: Add questions 6-30
  // Category distribution target:
  //   childhood: 8, favorites: 7, habits: 5, moments: 6, random: 4
];

// --- Open-Ended Questions (narrative response) ---

export interface OpenEndedQuestion {
  id: string;
  question: string;
  category: 'childhood' | 'favorites' | 'habits' | 'moments' | 'random';
}

export const OPEN_ENDED_QUESTIONS: OpenEndedQuestion[] = [
  {
    id: 'oe1',
    category: 'moments',
    question: "What's your funniest memory with Nick?",
  },
  {
    id: 'oe2',
    category: 'favorites',
    question: "What's Nick's most annoying habit — and why do you secretly love it?",
  },
  {
    id: 'oe3',
    category: 'moments',
    question: 'If Nick had a catchphrase, what would it be?',
  },
  {
    id: 'oe4',
    category: 'random',
    question: "What's the most 'Nick' thing Nick has ever done?",
  },
  {
    id: 'oe5',
    category: 'childhood',
    question: 'What do you think Nick was like as a kid? Describe him in 3 words.',
  },
  {
    id: 'oe6',
    category: 'favorites',
    question: "What's the one thing Nick would never leave Vegas without doing?",
  },
  {
    id: 'oe7',
    category: 'moments',
    question: 'Describe the best trip or adventure you and Nick have been on together.',
  },
  {
    id: 'oe8',
    category: 'habits',
    question: "What's Nick's signature move on a night out?",
  },
  {
    id: 'oe9',
    category: 'random',
    question: 'If Nick had to survive a zombie apocalypse, what would be his secret weapon?',
  },
  {
    id: 'oe10',
    category: 'moments',
    question: 'Write a short toast to Nick for his 30th. What do you want him to know?',
  },
];

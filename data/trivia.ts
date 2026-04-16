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
    category: 'childhood',
    question: 'What was his first job?',
  },
  {
    id: 'oe2',
    category: 'childhood',
    question: 'What was his favorite food growing up?',
  },
  {
    id: 'oe3',
    category: 'favorites',
    question: 'What is one thing he always orders at a bar or restaurant?',
  },
  {
    id: 'oe4',
    category: 'favorites',
    question: 'If he had to survive on one gas station snack forever, what would he choose?',
  },
  {
    id: 'oe5',
    category: 'habits',
    question: "What is something he swears he's good at but probably isn't?",
  },
  {
    id: 'oe6',
    category: 'random',
    question: 'What reality show would he be weirdly good at?',
  },
  {
    id: 'oe7',
    category: 'favorites',
    question: 'What fictional world would he most want to live in?',
  },
  {
    id: 'oe8',
    category: 'random',
    question: 'What object best represents his personality?',
  },
  {
    id: 'oe9',
    category: 'random',
    question: 'If he were a dog breed, what breed would he be?',
  },
  {
    id: 'oe10',
    category: 'random',
    question: 'If he were a sandwich, what would be on it?',
  },
  {
    id: 'oe11',
    category: 'favorites',
    question: 'If he could only eat foods of one color for a month, what color would he choose?',
  },
  {
    id: 'oe12',
    category: 'random',
    question: 'If he got dropped into a medieval village, what role would he end up with?',
  },
  {
    id: 'oe13',
    category: 'habits',
    question: 'What would his roommate complaint list say?',
  },
  {
    id: 'oe14',
    category: 'random',
    question: 'If he had to name a racehorse after himself, what would the name be?',
  },
  {
    id: 'oe15',
    category: 'random',
    question: 'What would his pirate name be?',
  },
];

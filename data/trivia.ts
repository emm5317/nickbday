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

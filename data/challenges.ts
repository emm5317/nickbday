export interface Challenge {
  id: string;
  label: string;
  description: string;
  requiresPhoto: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export const CHALLENGES: Challenge[] = [
  { id: 'c00', icon: '\u{1F4F8}', label: 'Group Selfie', description: 'Get all 5 of you in one photo.', requiresPhoto: true, difficulty: 'easy' },
  { id: 'c01', icon: '\u{1F3B2}', label: 'Craps Table', description: 'All 5 of you play craps together for at least one round.', requiresPhoto: false, difficulty: 'easy' },
  { id: 'c02', icon: '\u{1F942}', label: 'Champagne Toast', description: 'Toast to Nick with actual champagne (not prosecco).', requiresPhoto: true, difficulty: 'easy' },
  { id: 'c03', icon: '\u{1F3B0}', label: 'Slots Win', description: 'Anyone in the group hits a slots win of $20+.', requiresPhoto: true, difficulty: 'medium' },
  { id: 'c04', icon: '\u{1F30A}', label: 'Pool Time', description: 'Everyone gets in the pool at the same time.', requiresPhoto: true, difficulty: 'easy' },

  { id: 'c05', icon: '\u{1F3A4}', label: 'Nick Karaokes', description: 'Get Nick to sing at least one full song.', requiresPhoto: false, difficulty: 'hard' },
  { id: 'c06', icon: '\u{1F354}', label: 'Late Night Grub', description: 'Group gets fast food together after 2 AM.', requiresPhoto: true, difficulty: 'medium' },
  { id: 'c07', icon: '\u{1F3C6}', label: 'Blackjack Win', description: 'Someone at the table wins a hand of $50+.', requiresPhoto: false, difficulty: 'medium' },
  { id: 'c08', icon: '\u{1F4F9}', label: 'Nick Speech', description: 'Film Nick giving an impromptu birthday speech.', requiresPhoto: true, difficulty: 'medium' },
  { id: 'c09', icon: '\u{1F305}', label: 'Sunrise Spotted', description: 'Someone is still awake to see the Vegas sunrise.', requiresPhoto: true, difficulty: 'hard' },

  { id: 'c10', icon: '\u{1F483}', label: 'Dance Floor', description: 'Full group on the dance floor at the same time.', requiresPhoto: true, difficulty: 'medium' },
  { id: 'c11', icon: '\u{1F355}', label: 'Pizza Run', description: 'Group pizza order delivered to the room.', requiresPhoto: true, difficulty: 'easy' },
  { id: 'c12', icon: '\u{1F382}', label: "Nick's Bday", description: 'FREE \u2014 Happy Birthday Nick!', requiresPhoto: false, difficulty: 'easy' },
  { id: 'c13', icon: '\u{1F3B3}', label: 'Lucky Bet', description: 'Hit a lucky moment \u2014 slots, roulette, any game.', requiresPhoto: false, difficulty: 'medium' },
  { id: 'c14', icon: '\u{1F969}', label: 'Steakhouse Dinner', description: 'Group has a proper steakhouse dinner together.', requiresPhoto: true, difficulty: 'easy' },

  { id: 'c15', icon: '\u{1F3A1}', label: 'Bellagio Fountain', description: 'Group photo at the Bellagio fountains.', requiresPhoto: true, difficulty: 'easy' },
  { id: 'c16', icon: '\u{1F3A9}', label: 'Nick Dress Up', description: 'Get Nick wearing something ridiculous (hat, boa, etc).', requiresPhoto: true, difficulty: 'medium' },
  { id: 'c17', icon: '\u{1F91D}', label: 'Make a Friend', description: 'Group adopts a stranger into the crew for 30+ min.', requiresPhoto: false, difficulty: 'hard' },
  { id: 'c18', icon: '\u{1F379}', label: 'Signature Cocktail', description: 'Everyone orders a different cocktail and does a taste test.', requiresPhoto: true, difficulty: 'easy' },
  { id: 'c19', icon: '\u{1F303}', label: 'Vegas Sign Photo', description: 'Group photo at the Welcome to Las Vegas sign.', requiresPhoto: true, difficulty: 'medium' },

  { id: 'c20', icon: '\u{1F3AA}', label: 'Show / Experience', description: 'Group attends any Vegas show or experience together.', requiresPhoto: false, difficulty: 'medium' },
  { id: 'c21', icon: '\u{1F4AA}', label: 'Nick Worm Challenge', description: 'Get Nick to attempt The Worm on the dance floor.', requiresPhoto: true, difficulty: 'hard' },
  { id: 'c22', icon: '\u{1F381}', label: 'Secret Gift', description: 'Someone gives Nick a surprise birthday gift during trip.', requiresPhoto: true, difficulty: 'easy' },
  { id: 'c23', icon: '\u{1F0CF}', label: 'Poker Hand', description: 'Anyone plays at least one hand of actual poker.', requiresPhoto: false, difficulty: 'medium' },
  { id: 'c24', icon: '\u{1F31F}', label: 'Full Group Dinner', description: 'All 5 of you at the same dinner table at the same time.', requiresPhoto: true, difficulty: 'easy' },
];

export const FREE_SPACE_INDEX = 12;

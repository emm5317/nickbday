// TODO: Implement A/B/C/D answer button with colored letter circle
interface AnswerButtonProps {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  state: 'default' | 'correct' | 'wrong' | 'disabled';
  onPress: () => void;
}

export function AnswerButton(_props: AnswerButtonProps) {
  return null;
}

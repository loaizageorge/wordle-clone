/**
 * inactive => tile not filled out yet
 * close => letter is in guess, but wrong spot
 * correct => letter is in correct spot
 * wrong => letter is not in guess
 */
export enum LetterPositionEnum {
  correct = 'correct',
  wrong = 'wrong',
  close = 'close',
  inactive = 'inactive',
}

export const getColorFromLetterState = (type: LetterPositionEnum) => {
  switch (type) {
    case LetterPositionEnum.correct:
      return 'green';
    case LetterPositionEnum.close:
      return 'yellow';
    case LetterPositionEnum.wrong:
      return 'grey';
    case LetterPositionEnum.inactive:
      return 'white';
    default:
      return 'white';
  }
};

export interface IGuessedLetters {
  letter: string,
  type: LetterPositionEnum
}

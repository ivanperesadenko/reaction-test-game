export type EndGameModalData = Readonly<{
  score: {
    player: number;
    computer: number;
  };
  isWin: boolean;
}>;

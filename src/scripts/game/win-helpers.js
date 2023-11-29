const getPieceCount = (color) => {
  const pieces = document.querySelectorAll(`.${color}-piece`);
  return pieces.length;
};

const checkGameOver = () => {
  console.log('checkGameOver');
  const whiteCount = getPieceCount('white');
  console.log('whiteCount:', whiteCount);
  const blackCount = getPieceCount('black');
  console.log('blackCount:', blackCount);
  return whiteCount === 0 || blackCount === 0;
};

const getWinner = () => {
  console.log('getWinner');
  const whiteCount = getPieceCount('white');
  console.log('whiteCount:', whiteCount);
  const blackCount = getPieceCount('black');
  console.log('blackCount:', blackCount);
  return whiteCount > blackCount ? 'You' : 'The computer';
};

export { checkGameOver, getWinner };

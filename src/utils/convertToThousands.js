const convertToThousands = starCount => {
  if (typeof starCount !== 'number') {
    return undefined;
  }
  if (starCount && starCount > 1000) {
    return `${(starCount / 1000).toFixed(1)}k`;
  }
  return starCount;
};

export default convertToThousands;
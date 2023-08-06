function mergeAndSortPositions(positionsArray) {

  positionsArray.sort((a, b) => a.start - b.start);

  const mergedPositions = [positionsArray[0]];
  let currentIndex = 0;

  for (const position of positionsArray) {
    if (position.start >= mergedPositions[currentIndex].end) {
      mergedPositions.push({ start: position.start, end: position.end });
      currentIndex++;
    } else if (position.end > mergedPositions[currentIndex].end) {
      mergedPositions[currentIndex].end = position.end;
    }
  }

  return mergedPositions;
}

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  if (
    !htmlContent ||
    !plainText ||
    !plainTextPositions ||
    plainTextPositions.length == 0 ||
    !isNaN(htmlContent) ||
    !isNaN(plainText)
  ) {
    return htmlContent;
  }

  const MarkOpen = "<mark>";
  const MarkClose = "</mark>";
  let i = 0;
  let j = 0;
  let k = 0;
  let result = "";

  const Positions = mergeAndSortPositions(plainTextPositions);

  while (i < htmlContent.length) {
    if (k < Positions.length && Positions[k].start == j && htmlContent[i] == plainText[j]) result += MarkOpen;
    result += htmlContent[i];

    if (k < Positions.length && Positions[k].end == j + 1) {
      result += MarkClose;
      k++;
    }
    if (htmlContent[i] === plainText[j]) j++;
    i++;
  }

  return result;
}
const text=highlightHTMLContent("<div><p>Help</p><span>Peoples</span></div>", "Help Peoples", [
  { start: 0, end: 4 },
      { start: 5, end: 11 },
    ]);
console.log(text);

module.exports = highlightHTMLContent;
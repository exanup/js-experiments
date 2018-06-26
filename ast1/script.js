var animation2 = function () {
  function rollAnimation2(patternCharacter, maxRepeat) {
    var maxChars = 6;
    var charCount = 1;
    var isIncrementing = true;
    var lineCount = 1;

    var animateFuncIntervalRef = setInterval(function () {
      isIncrementing = getIncrementStatus(isIncrementing, charCount, maxChars);
      var line = generateLine(charCount, patternCharacter);
      charCount += (isIncrementing ? 1 : -1);
      console.log(line);

      if (finishedPatternRepeat(lineCount, maxRepeat, maxChars)) {
        console.log("Finished repeating pattern for " + maxRepeat + " times.");
        clearInterval(animateFuncIntervalRef);
      }

      lineCount++;
    }, 100);
  }

  function getIncrementStatus(isIncrementing, charCount, maxChars) {
    if (isIncrementing && charCount >= maxChars) {
      isIncrementing = false;
    } else if (charCount <= 1) {
      isIncrementing = true;
    }
    return isIncrementing;
  }

  function generateLine(charCount, patternCharacter) {
    var line = "";
    for (var i = 0; i < charCount; i++) {
      line += patternCharacter;
    }
    return line;
  }

  function finishedPatternRepeat(lineCount, maxRepeat, maxChars) {
    return lineCount > maxRepeat * (maxChars * 2 - 2);
  }

  rollAnimation2("__", 5);
}();



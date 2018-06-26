var objectTest = function () {
  var me = {
    name: "Anup Dhakal",
    address: "Gwarko",
    email: "anupdhakal2000@gmail.com",
    interests: ["Programming", "Futsal", "Football"],
    education: {
      college: "Kantipur Engineering College",
      level: "B.E.",
      program: "B.C.T."
    }
  };
  console.log(me);
};

///////////////////////////////////////////////////////////////////////////////////////////////////

var testPattern1 = function () {
  function printPattern(n) {
    for (var i = 0; i < n; i++) {
      var line = '';
      for (var j = i; j < n; j++) {
        line += '*';
      }
      console.log(line);
    }
  }
  printPattern(5);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

var customFind = function () {
  function searchById(fruits, id) {
    var requiredFruit = null;
    for (var i = 0; i < fruits.length; i++) {
      if (fruits[i].id === id) {
        requiredFruit = fruits[i];
        break;
      }
    }
    return (requiredFruit !== null ? requiredFruit.name : null);
  }
  var fruits = [{
      id: 1,
      name: 'apple',
      color: 'red'
    },
    {
      id: 2,
      name: 'banana',
      color: 'yellow'
    }
  ];
  console.log(searchById(fruits, 1));
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

var callBackTest = function () {
  function getData(success) {
    setTimeout(function () {
      var data = {
        id: 1,
        name: 'Pikachu'
      };
      success(data);
    }, 1000);
  }
  getData(function (data) {
    console.log(data);
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

var customMap = function () {
  function looper(numbers, callback) {
    var newNumbers = [];
    for (var i = 0; i < numbers.length; i++) {
      var newNum = callback(numbers[i]);
      newNumbers.push(newNum);
    }
    return newNumbers;
  }
  var numbers = [1, 2, 3, 4];
  var output = looper(numbers, function (num) {
    return num * 2;
  });
  console.log(output);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var timeoutTest = function () {
  function counter() {
    for (var i = 0; i < 10; i++) {
      setTimeout(function (index) {
        return function () {
          console.log(index);
        }
      }(i), 1000) // recreates variables form outer scope as local
    }
  }
  counter();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var animation = function () {
  function rollAnimation(maxRepeat) {
    var n = 5; // number of asterisks
    var timeoutKeeper = 1;
    var intervalUnit = 100;
    for (var charCount = 0; charCount < maxRepeat; charCount++) {
      for (var i = 1; i <= n; i++) {
        var line = '';
        for (var j = 0; j < i; j++) {
          line += '*';
        }
        setTimeout(
          function (line) {
            return function () {
              console.log(line);
            }
          }(line), timeoutKeeper * intervalUnit);
        timeoutKeeper++;
      }
      for (var i = 0; i < n; i++) {
        var line = '';
        for (var j = i; j < n; j++) {
          line += '*';
        }
        setTimeout(
          function (line) {
            return function () {
              console.log(line);
            }
          }(line), timeoutKeeper * intervalUnit);
        timeoutKeeper++;
      }
    }
  }
  rollAnimation(20);
};

///////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////////

var divColorTest = function () {
  var index = 0;
  var colors = ["red", "blue", "green", "yellow"];
  box = document.getElementById('colorfulBox');
  box.style.display = "block";
  box.addEventListener("click", function (e) {
    box.style.backgroundColor = colors[index];
    index = [index + 1] % colors.length;
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

var graph = function () {
  var data = generateData(100, 500);

  plotData(data);

  function generateData(charCount, dataMax) {
    var data = [];
    for (var i = 0; i < charCount; i++) {
      var left = parseInt(Math.random() * dataMax);
      var top = parseInt(Math.random() * dataMax);
      var datum = {
        top: top,
        left: left
      };
      data.push(datum);
    }
    return data;
  }

  function plotData(data) {
    document.getElementById('graph').style.display = "block";
    data.forEach(function (datum) {
      plotPoint(datum);
    });
  };

  function plotPoint(datum) {
    var graphDiv = document.getElementById('graph');
    var listContainer = document.getElementById('deleted-list');
    var point = document.createElement("div");
    point.style.left = datum.left + "px";
    point.style.top = datum.top + "px";
    graphDiv.appendChild(point);

    point.addEventListener("click", function (e) {
      graphDiv.removeChild(point);

      var deletedItem = document.createElement("li");
      var content = document.createTextNode(datum.left + ', ' + datum.top);
      deletedItem.appendChild(content);
      listContainer.appendChild(deletedItem);
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
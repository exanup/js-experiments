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
}();

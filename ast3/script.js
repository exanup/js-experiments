var sliderPage = function () {
  var $slider = document.getElementById('slider');

  var imgWidth = 800;
  var imgCount = 4;

  var minMargin = -imgWidth * (imgCount - 1);
  var maxMargin = 0;
  var currentMargin = maxMargin;

  var delay = 1;
  var slideStep = 10;

  var intervalSet = false;

  var sliderClickHandler = function (e) {
    e.preventDefault();
    $target = e.target;

    if ($target.id === 'btn-prev') {
      if (currentMargin >= maxMargin) {
        currentMargin = -imgCount * imgWidth;
      }
    } else {
      if (currentMargin <= minMargin) {
        currentMargin = imgWidth;
      }
    }

    var i = 0;
    if (!intervalSet) {
      var slideIntervalRef = setInterval(function () {
        intervalSet = true;

        if (i < imgWidth) {
          i += slideStep;
          var sign = ($target.id === 'btn-prev' ? 1 : -1);
          currentMargin = currentMargin + sign * slideStep;
          $slider.style.marginLeft = currentMargin + 'px';
        } else {
          clearInterval(slideIntervalRef);
          intervalSet = false;
        }
      }, delay);
    }
  };

  var prevBtn = document.getElementById('btn-prev');
  var nextBtn = document.getElementById('btn-next');

  prevBtn.addEventListener('click', sliderClickHandler);
  nextBtn.addEventListener('click', sliderClickHandler);

}();

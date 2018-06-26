var sliderPage = function () {
  var prevBtn = document.getElementById('btn-prev');
  var nextBtn = document.getElementById('btn-next');

  var slider = document.getElementById('slider');

  var imgWidth = 800;
  var imgCount = 4;

  var minMargin = -imgWidth * (imgCount - 1);
  var maxMargin = 0;
  var currentMargin = maxMargin;

  var delay = 1;
  var slideStep = 10;

  nextBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (currentMargin <= minMargin) {
      currentMargin = imgWidth;
    }

    var i = 0;
    var slideLeftIntervalRef = setInterval(function () {
      if (i < imgWidth) {
        i += slideStep;
        currentMargin = currentMargin - slideStep;
        slider.style.marginLeft = currentMargin + 'px';
      } else {
        clearInterval(slideLeftIntervalRef);
      }
    }, delay);
  });


  prevBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (currentMargin >= maxMargin) {
      currentMargin = -3200;
    }

    var i = 0;
    var slideRightIntervalRef = setInterval(function () {
      if (i < imgWidth) {
        i += slideStep;
        currentMargin = currentMargin + slideStep;
        slider.style.marginLeft = currentMargin + 'px';
      } else {
        clearInterval(slideRightIntervalRef);
      }
    }, delay);
  });
}();
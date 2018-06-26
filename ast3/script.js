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

  var intervalSet = false;

  nextBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (currentMargin <= minMargin) {
      currentMargin = imgWidth;
    }

    var i = 0;
    if (!intervalSet) {
      var slideLeftIntervalRef = setInterval(function () {
        intervalSet = true;

        if (i < imgWidth) {
          i += slideStep;
          currentMargin = currentMargin - slideStep;
          slider.style.marginLeft = currentMargin + 'px';
        } else {
          clearInterval(slideLeftIntervalRef);
          intervalSet = false;
        }
      }, delay);
    }
  });

  var fun1 = function (e) {
    e.preventDefault();

    if (currentMargin >= maxMargin) {
      currentMargin = -imgCount * imgWidth;
    }

    var i = 0;
    if (!intervalSet) {
      var slideRightIntervalRef = setInterval(function () {
        intervalSet = true;

        if (i < imgWidth) {
          i += slideStep;
          currentMargin = currentMargin + slideStep;
          slider.style.marginLeft = currentMargin + 'px';
        } else {
          clearInterval(slideRightIntervalRef);
          intervalSet = false;
        }
      }, delay);
    }
  };

  prevBtn.addEventListener('click', fun1);

}();


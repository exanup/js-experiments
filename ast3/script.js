var sliderPage = (function() {
  var $slider = document.getElementById('slider');

  var imgWidth = 800;
  var imgCount = 4;

  var minMargin = -imgWidth * (imgCount - 1);
  var maxMargin = 0;
  var currentMargin = maxMargin;

  var slideStep = 35;

  var intervalSet = false;

  var sliderClickHandler = function(e) {
    e.preventDefault();
    $target = this;

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

    var animate = function() {
      intervalSet = true;

      if (i >= imgWidth) {
        intervalSet = false;
        return;
      }

      var newSlideStep = slideStep;
      i += newSlideStep;

      if (i > imgWidth) {
        newSlideStep = imgWidth - (i - newSlideStep);
      }

      var sign = $target.id === 'btn-prev' ? 1 : -1;

      currentMargin = currentMargin + sign * newSlideStep;

      $slider.style.marginLeft = currentMargin + 'px';

      requestAnimationFrame(animate);
    };

    if (!intervalSet) {
      requestAnimationFrame(animate);
    }
  };

  var prevBtn = document.getElementById('btn-prev');
  var nextBtn = document.getElementById('btn-next');

  prevBtn.addEventListener('click', sliderClickHandler);
  nextBtn.addEventListener('click', sliderClickHandler);
})();

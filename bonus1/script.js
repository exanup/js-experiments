/* LIBRARY FUNCTIONS */
const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data);

const logger = (arg, ...rest) => {
  if (rest.length === 0) {
    console.log(arg);
    return arg;
  }

  console.log(arg, ...rest);
  return [arg, ...rest];
};

const tryNextAnimationFrame = callback => {
  // return window.setTimeout(callback, 1000); // ~1 fps - for debugging purpose
  // return window.setTimeout(callback, 34); // ~30 fps
  return window.requestAnimationFrame(callback); // ~60 fps
};

/* APPLICATION CONSTANTS */
const EVENTS = {
  TICK: 0,
  CLICK_SLIDE_LEFT: 1,
  CLICK_SLIDE_RIGHT: 2
};

/* APPLICATION HELPERS */
const getNewImageConfig = ({ width = 800, height = 600, count = 4 } = {}) => ({
  width,
  height,
  count
});

const getNewAnimation = ({
  direction = -1,
  currentMargin = 0,
  currentIterator = 0,
  isRunningManual = false,
  isDuringInterval = true
} = {}) => ({
  direction,
  currentMargin,
  currentIterator,
  isRunningManual,
  isDuringInterval,
  lastAutoStoppedFrameOn: Date.now()
});

const getNewSlider = ({
  sliderId = 'slider',
  btnPrevId = 'btnPrev',
  btnNextId = 'btnNext',
  imageConfig = {},
  minMargin = 0,
  maxMargin = 0,
  animation = {},
  autoAnimateRestInterval = 1000,
  slideStep = 40
} = {}) => ({
  $slider: document.getElementById(sliderId),
  $btnPrev: document.getElementById(btnPrevId),
  $btnNext: document.getElementById(btnNextId),
  imageConfig,
  minMargin,
  maxMargin,
  animation,
  autoAnimateRestInterval,
  slideStep
});

const attemptManualUpdate = direction => model =>
  canMoveToDirection(direction)(model)
    ? compose(
        setAsManuallyRunning,
        setDirectionAndCorrectIterator(direction)
      )(model)
    : model;

const setDirectionAndCorrectIterator = direction => model => ({
  ...model,
  animation: {
    ...model.animation,
    direction: direction,
    currentIterator: getValidIterator(direction)(model)
  }
});

const getValidIterator = direction => model =>
  model.animation.currentIterator === 0 ||
  model.animation.direction === direction
    ? model.animation.currentIterator
    : model.imageConfig.width - model.animation.currentIterator;

const isAtRightMostImage = model =>
  model.animation.currentMargin <= model.minMargin;

const isAtLeftMostImage = model =>
  model.animation.currentMargin >= model.maxMargin;

const setAsManuallyRunning = model => ({
  ...model,
  animation: {
    ...model.animation,
    isRunningManual: true,
    isDuringInterval: false
  }
});

const setAsAutoAnimationInRestInterval = model => ({
  ...model,
  animation: {
    ...model.animation,
    currentIterator: 0,
    isRunningManual: false,
    isDuringInterval: true,
    lastAutoStoppedFrameOn: Date.now()
  }
});

const isNextIteratorInvalid = model =>
  model.animation.currentIterator + model.slideStep > model.imageConfig.width;

const invertDirectionIfNeeded = model => ({
  ...model,
  animation: {
    ...model.animation,
    direction:
      (isAtRightMostImage(model) && model.animation.direction === -1) ||
      (isAtLeftMostImage(model) && model.animation.direction === 1)
        ? -1 * model.animation.direction
        : model.animation.direction
  }
});

const canMoveToDirection = direction => model =>
  (direction === -1 && !isAtRightMostImage(model)) ||
  (direction === 1 && !isAtLeftMostImage(model));

const calculateNewMargin = currentMargin => direction => newSlideStep =>
  currentMargin + direction * newSlideStep;

const getValidNextIterator = model =>
  isNextIteratorInvalid(model)
    ? model.imageConfig.width
    : model.animation.currentIterator + model.slideStep;

const getValidNextSlideStep = model =>
  isNextIteratorInvalid(model)
    ? model.imageConfig.width - model.animation.currentIterator
    : model.slideStep;

const finishedMovingOneSlide = model =>
  model.animation.currentIterator >= model.imageConfig.width;

const updateAnimation = model =>
  model.animation.isRunningManual
    ? updateAnimationForManualClick(model)
    : updateAnimationForAutoPlay(model);

const updateAnimationForManualClick = model => {
  if (finishedMovingOneSlide(model)) {
    return setAsAutoAnimationInRestInterval(model);
  }

  const newSlideStep = getValidNextSlideStep(model);

  const newIterator = getValidNextIterator(model);

  const newMargin = calculateNewMargin(model.animation.currentMargin)(
    model.animation.direction
  )(newSlideStep);

  return {
    ...model,
    animation: {
      ...model.animation,
      currentMargin: newMargin,
      currentIterator: newIterator,
      isRunningManual: true
    }
  };
};

const updateAnimationForAutoPlay = model => {
  if (model.animation.isDuringInterval) {
    const now = Date.now();
    const diffInterval = now - model.animation.lastAutoStoppedFrameOn;

    if (diffInterval <= model.autoAnimateRestInterval) {
      return { ...model };
    }
  }

  const newModel = invertDirectionIfNeeded(model);

  if (finishedMovingOneSlide(newModel)) {
    return setAsAutoAnimationInRestInterval(newModel);
  }

  const newIterator = getValidNextIterator(newModel);

  const newMargin = calculateNewMargin(newModel.animation.currentMargin)(
    newModel.animation.direction
  )(getValidNextSlideStep(newModel));

  return {
    ...newModel,
    animation: {
      ...newModel.animation,
      currentMargin: newMargin,
      currentIterator: newIterator,
      isDuringInterval: false
    }
  };
};

/* MODEL */
const imageConfig = getNewImageConfig();

const slider1 = getNewSlider({
  sliderId: 'slider',
  btnPrevId: 'btnPrev',
  btnNextId: 'btnNext',

  imageConfig: imageConfig,

  minMargin: -imageConfig.width * (imageConfig.count - 1),
  maxMargin: 0,

  animation: getNewAnimation(),
  autoAnimateRestInterval: 800,

  slideStep: 20
});

const slider2 = getNewSlider({
  sliderId: 'slider2',
  btnPrevId: 'btnPrev2',
  btnNextId: 'btnNext2',

  imageConfig: imageConfig,

  minMargin: -imageConfig.width * (imageConfig.count - 1),
  maxMargin: 0,

  animation: getNewAnimation({
    isDuringInterval: true,
    currentMargin: -1600,
    direction: 1
  }),
  autoAnimateRestInterval: 1400,

  slideStep: 40
});

const sliders = [slider1, slider2];

/* UPDATE */
const update = eventType => model => {
  switch (eventType) {
    case EVENTS.CLICK_SLIDE_RIGHT:
      return attemptManualUpdate(-1)(model);

    case EVENTS.CLICK_SLIDE_LEFT:
      return attemptManualUpdate(1)(model);

    case EVENTS.TICK:
      return updateAnimation(model);

    default:
      return model;
  }
};

/* RENDER */
const render = model =>
  (model.$slider.style.marginLeft = model.animation.currentMargin + 'px');

/* RUNTIME */
const runtime = render => update => sliders => {
  let isPaused = false;

  window.onkeydown = e => {
    switch (e.code) {
      case 'Escape':
        logger('paused');
        isPaused = true;
        break;

      case 'KeyR':
        logger('resumed');
        isPaused = false;
        break;

      default:
        break;
    }
  };

  let lastEvents = sliders.map(() => EVENTS.TICK);
  sliders.map((slider, index) => {
    slider.$btnPrev.onclick = () => {
      lastEvents[index] = EVENTS.CLICK_SLIDE_LEFT;

      return false;
    };

    slider.$btnNext.onclick = () => {
      lastEvents[index] = EVENTS.CLICK_SLIDE_RIGHT;

      return false;
    };
  });

  const loop = mainLoopCounter => render => update => sliders => () => {
    if (!isPaused) {
      sliders = [...sliders].map(({ ...slider }, index) => {
        if (lastEvents[index] !== EVENTS.TICK) {
          slider = update(lastEvents[index])(slider);
          lastEvents[index] = EVENTS.TICK;
        }

        slider = update(EVENTS.TICK)(slider);

        render(slider);

        return slider;
      });
    }

    compose(
      tryNextAnimationFrame,
      loop(mainLoopCounter + 1)(render)(update)
    )(sliders);
  };

  const mainLoopCounter = 0;

  compose(
    tryNextAnimationFrame,
    loop(mainLoopCounter + 1)(render)(update)
  )(sliders);
};

runtime(render)(update)(sliders);

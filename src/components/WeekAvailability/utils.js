import { add, format, isAfter, isEqual as isEqualDates } from 'date-fns';
import set from 'date-fns/set';
import { find, findIndex, slice, toInteger } from 'lodash';
import { tileInterval } from './consts';

const getDayNumber = (date) => format(date, 'd');

const getWeekdayToDateMap = (dateFrom) => {
  const mapping = {
    monday: dateFrom,
    tuesday: add(dateFrom, { days: 1 }),
    wednesday: add(dateFrom, { days: 2 }),
    thursday: add(dateFrom, { days: 3 }),
    friday: add(dateFrom, { days: 4 }),
    saturday: add(dateFrom, { days: 5 }),
    sunday: add(dateFrom, { days: 6 }),
  };

  return mapping;
};

const getTimeByTileIndex = (date, tileIndex) => {
  return add(set(date, { hours: 0, minutes: 0, seconds: 0 }), {
    minutes: tileIndex * tileInterval,
  });
};

const isTimeAvailable = (date, tileIndex, dayAvailabilities) => {
  const time = getTimeByTileIndex(date, tileIndex);

  return (
    findIndex(dayAvailabilities, ({ from }) => isEqualDates(from, time)) >= 0
  );
};

const getTimeEntry = (date, tileIndex, dayAvailabilities) => {
  const time = getTimeByTileIndex(date, tileIndex);

  return find(dayAvailabilities, ({ from }) => isEqualDates(from, time));
};

const getNumberOfIntervalsBetween = (datetimeFrom, datetimeTo) => {
  let iteratingDate = datetimeFrom;
  let numberOfIntervals = 1;

  while (
    !isEqualDates(iteratingDate, datetimeTo) &&
    isAfter(datetimeTo, iteratingDate)
  ) {
    iteratingDate = add(iteratingDate, { minutes: tileInterval });
    numberOfIntervals++;
  }

  return numberOfIntervals;
};

const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const getDayAvailabilities = (date, daysAvailabilities) => {
  const weekdayIndex = toInteger(format(date, 'i')) - 1;
  const weekdayName = weekdays[weekdayIndex];
  return daysAvailabilities[weekdayName];
};

const getTimeframeIndex = (timeframe, dayAvailabilities) => {
  return findIndex(
    dayAvailabilities,
    (tf) =>
      isEqualDates(tf.from, timeframe.from) && isEqualDates(tf.to, timeframe.to)
  );
};

const isContinouslyAvailable = (
  daysAvailabilities,
  date,
  timeframe1,
  timeframe2
) => {
  const timeframes = getDayAvailabilities(date, daysAvailabilities);
  const timeframe1Index = getTimeframeIndex(timeframe1, timeframes);
  const timeframe2Index = getTimeframeIndex(timeframe2, timeframes);

  if (timeframe1Index < 0 || timeframe2Index < 0) {
    // nie powinno się zdarzyć
    return false;
  }

  const expectedNumberOfIntervals = getNumberOfIntervalsBetween(
    timeframe1.from,
    timeframe2.from
  );

  if (timeframe2Index - timeframe1Index + 1 !== expectedNumberOfIntervals) {
    return false;
  }

  return true;
};

const getTimeframesBetween = (
  daysAvailabilities,
  date,
  timeframe1,
  timeframe2
) => {
  const timeframes = getDayAvailabilities(date, daysAvailabilities);
  const timeframe1Index = getTimeframeIndex(timeframe1, timeframes);
  const timeframe2Index = getTimeframeIndex(timeframe2, timeframes);

  return slice(timeframes, timeframe1Index, timeframe2Index + 1);
};

const isSelectedTile = (tile, selectedTiles) => {
  if (!tile) {
    return false;
  }

  return (
    findIndex(
      selectedTiles,
      (t) => isEqualDates(t.from, tile.from) && isEqualDates(t.to, tile.to)
    ) >= 0
  );
};

const isInvalidClick = (
  tileFrom,
  tileTo,
  clickedDate,
  clickedTimeframe,
  daysAvailabilities
) => {
  const isTileFromPresent = !!tileFrom;
  const fromAndToAlreadySelected = isTileFromPresent && !!tileTo;
  const differentDateSelected =
    isTileFromPresent && !isEqualDates(tileFrom.date, clickedDate);
  const isNotContinuous =
    isTileFromPresent &&
    !isContinouslyAvailable(
      daysAvailabilities,
      clickedDate,
      tileFrom.timeframe,
      clickedTimeframe
    );
  const isInvalidTilesOrder =
    isTileFromPresent &&
    !isAfter(clickedTimeframe.from, tileFrom.timeframe.from);

  return (
    fromAndToAlreadySelected ||
    differentDateSelected ||
    isNotContinuous ||
    isInvalidTilesOrder
  );
};

export {
  getWeekdayToDateMap,
  isTimeAvailable,
  getTimeEntry,
  getDayNumber,
  getTimeframesBetween,
  isSelectedTile,
  isInvalidClick,
};

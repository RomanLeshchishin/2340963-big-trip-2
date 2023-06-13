import {sortPointDay, sortPointTime} from './point';
import dayjs from 'dayjs';

export const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

export const SortType = {
  DEFAULT: 'day',
  TIME: 'time-descending',
  PRICE: 'price-descending'
};

export const sortPointsByType = {
  [SortType.DEFAULT]: (points) => points.sort(sortPointDay),
  [SortType.TIME]: (points) => points.sort(sortPointTime),
  [SortType.PRICE]: (points) => points.sort((pointA, pointB) => pointB.price - pointA.price)
};

export const getStartPoint = (points) => {
  let startPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currentPointDate = points[i].startDate;
    const endPointDate = startPoint.startDate;
    if(dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') < 0
      || dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currentPointDate).diff(dayjs(endPointDate), 'D') < 0) {
      startPoint = points[i];
    }
  }
  return startPoint;
};

export const getEndPoint = (points) => {
  let endPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currentPointDate = points[i].endDate;
    const endPointDate = endPoint.endDate;
    if(dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') > 0
      || dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currentPointDate).diff(dayjs(endPointDate), 'D') > 0) {
      endPoint = points[i];
    }
  }
  return endPoint;
};


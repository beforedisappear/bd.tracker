import { eachDayOfInterval, isSameDay } from 'date-fns';

import type { Matcher } from 'react-day-picker';

type DateMatcher = {
  from?: Date;
  to?: Date;
  before?: Date;
  after?: Date;
};

export const isDisabledDateInRange = (
  range: { from: Date; to: Date },
  disabled: Matcher | Matcher[],
) => {
  const rangeDates = eachDayOfInterval({
    start: range.from,
    end: range.to,
  });

  const isDateInRange = (date: Date, matcher: DateMatcher): boolean => {
    if ('from' in matcher && 'to' in matcher) {
      return date >= matcher.from! && date <= matcher.to!;
    }
    if ('before' in matcher) {
      return date < matcher.before!;
    }
    if ('after' in matcher) {
      return date > matcher.after!;
    }
    if ('from' in matcher && 'before' in matcher) {
      return date >= matcher.from! && date < matcher.before!;
    }
    if ('after' in matcher && 'to' in matcher) {
      return date > matcher.after! && date <= matcher.to!;
    }
    return false;
  };

  return rangeDates.some(date => {
    if (typeof disabled === 'function') {
      return disabled(date);
    }

    if (Array.isArray(disabled)) {
      return disabled.some(matcher => {
        if (typeof matcher === 'function') return matcher(date);
        if (matcher instanceof Date) return isSameDay(matcher, date);
        if (typeof matcher === 'boolean') return matcher;
        if (typeof matcher === 'object' && matcher !== null)
          return isDateInRange(date, matcher as DateMatcher);

        return false;
      });
    }

    if (disabled instanceof Date) {
      return isSameDay(disabled, date);
    }

    if (typeof disabled === 'boolean') {
      return disabled;
    }

    if (typeof disabled === 'object' && disabled !== null) {
      return isDateInRange(date, disabled as DateMatcher);
    }

    return false;
  });
};

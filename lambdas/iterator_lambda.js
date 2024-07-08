'use strict';

module.exports.iterate = (event, context, callback) => {
  callback(null, {
    iterator: {
      count: event.iterator.count,
      index: event.iterator.index + event.iterator.step,
      step: event.iterator.step,
      continue: event.iterator.index + event.iterator.step <= event.iterator.count
    },
    word: event.word,
    result: event.result ? event.result : undefined,
  })
};
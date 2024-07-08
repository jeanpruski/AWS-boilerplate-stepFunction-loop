'use strict';

module.exports.init = async (event) => {
  const iterator = {
    count: 5,
    index: 0,
    step: 1,
  }

  return {
    iterator,
    word: event.word
  };
};

module.exports.process = async (event) => {
  let wordResult;

  if(event.result){
    wordResult = `${event.result} ${event.word}`;
  } else {
    wordResult = `${event.word}`;
  }

  return {
    iterator: event.iterator,
    word: event.word,
    result: wordResult,
  };
};

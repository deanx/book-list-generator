const _ = require('lodash');
const fs = require('fs');

const dictionary = require('./dictionary.js');

const bookNameStructures = [
  ['article', 'adjective', 'substantive'],
  ['adjective', 'substantive'],
  ['adjective'],
  ['action', 'adverb'],
  ['article', 'action', 'substantive'],
  ['adjective'],
  ['article', 'adjective'],
  ['substantive'],
  ['action', 'place'],
  ['substantive', 'place'],
  ['place'],
  ['place', 'adverb'],
  ['moment'],
  ['adjective', 'moment'],
  ['article', 'moment'],
  ['adverb', 'moment'],
  ['moment', 'substantive'],
  ['action', 'substantive'],
  ['action', 'article', 'substantive'],
  ['action', 'moment'],
  ['substantive', 'connector', 'substantive'],
  ['adjective', 'connector', 'substantive']
]

// names as default parameter to allow the function start with a default list of names
function generateNameList(numberOfNames, names = new Set(), finalBookList = new Set()) {
  while (names.size < numberOfNames) {
    let title = [];
    let structure = _.sample(bookNameStructures);
    structure.forEach((part) => {
      title.push(_.sample(dictionary[part]));
    });
    names.add(title.join(' '));

  }
  return [...names];
}

module.exports = generateNameList;

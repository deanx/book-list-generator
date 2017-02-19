const faker = require('faker');
const Immutable = require('immutable');
const Gender = require('gender');

const bookNameGenerator = require('./book-name-generator.js');


function bookGenerator(numberOfBooks = 100) {
  let finalBookList = new Immutable.List();

  bookNameGenerator(numberOfBooks).forEach((bookName) => {

    let authorName = __authorName();

    finalBookList = finalBookList.push({
      name: bookName,
      genre: __bookGenre(),
      publishDate: __publishDate(),
      author: { name: authorName, gender: __gender(authorName) }
    });
  });

  return finalBookList;
}

function bookGeneratorJSON(numberOfBooks = 100) {
  return JSON.stringify(bookGenerator(numberOfBooks).toJS());
}

module.exports = {
  bookGenerator,
  bookGeneratorJSON
}

/**
 *  Private methods
 **/

function __bookGenre() {
  return faker.random.arrayElement([
    'Horror', 'Science fiction', 'Satire', 'Drama', 'Action and Adventure', 'Romance', 'Mystery',
    'Self help', 'Health', 'Guide', 'Travel', 'Children\'s', 'Religion, Spirituality & New Age',
    'Science', 'History', 'Math', 'Anthology', 'Poetry', 'Encyclopedias', 'Dictionaries', 'Comics', 'Fantasy',
    'Art', 'Cookbooks', 'Diaries', 'Journals', 'Prayer books', 'Series', 'Trilogy', 'Biographies', 'Autobiographies'
  ]);
}

function __publishDate() {

  // this solution because faker.past() takes too much to execute at 1M cases...
  let year = 1900 + Math.floor((Math.random() * 99) + 1);
  let month = Math.floor((Math.random() * 12) + 1);
  let day = Math.floor((Math.random() * 30) + 1);

  day = month === 2 && day > 28 ? day = 28 : day;
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day

  return `${year}-${month}-${day}`;
}

function __authorName() {
  return faker.name.findName();
}

function __gender(name) {
  // from https://github.com/mopsled/gender
  // for prodution we should make a fork to allow multiple queries. So we would not parse files every time 
  const gender = Gender.guess(name).gender;
  return gender === 'unknown' ? 'male' : gender;
}

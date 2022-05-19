//since each book is simply an object in the books array; i used books.length to count the number of times a book object appears in said array
function getTotalBooksCount(books) {
  return books.length
}

//^^same logic as previous function
function getTotalAccountsCount(accounts) {
  return accounts.length
}

//so here we only want to see the books that have not been returned as an integer
//since i know we are counting something, i first set a variable to equal zero
//this variable will be incremented everytime the if statement evaluating if the book has not been returned
//Finally, i return my result
function getBooksBorrowedCount(books) {
  let result = 0;
  for (let i = 0; i < books.length; i++) {
      const borrowed = books[i].borrows
      for (let j = 0; j < borrowed.length; j++) {
          if (borrowed[j].returned === false) {
              result ++
          }
      }
  }
  return result
}

//creation of a helper function that sorts an object by its values
function _sortObjectByValues(obj) {
  let keys = Object.keys(obj);
    keys.sort((keyA, keyB) => {
      if (obj[keyA] > obj[keyB]) {
        return -1;
      } else {
        return 1;
      }
    })
    return keys;
}

//this function is designed to take in an array of books
//each book has a corresponding genre
//I want to return 5 or fewer books represented by the number of times a book belonging to a particular genre has been borrowed in decending order
//using reduce, i am looking through the books array and accumulating objects based on the number of times the genre belonging to a book is encountered
//I am using my helper function to perform the sort that will later be needed (genres in descending order)
//Finally, I'm using map to format the objects being returned: defining name to equal a genre and count to equal the count of the genre
//I use slice to only return the top 5 and then i return the final array
function getMostCommonGenres(books) {
  let count = books.reduce((acc, book) => {
    if (acc[book.genre]) {
      acc[book.genre] +=1
    } else {
      acc[book.genre] =1 
    }
    return acc
  }, {})
  let keys = _sortObjectByValues(count);
  return keys.map(genre => ({name: genre, count: count[genre]})).slice(0,5)
}
//below is me solving the above function without the assistance of a helper function
/*
function getMostCommonGenres(books) {
  const genresObjCount = books.reduce((acc, book) => {
    const genre = book.genre
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc
  }, {})
  let objectsArray = Object.keys(genresObjCount).map((genre)=> {
    return {name: genre, count: genresObjCount[genre]}
  })
  console.log(objectsArray)
  objectsArray.sort((a, b) => b.count - a.count)
  return objectsArray.splice(0,5)
}
*/

//similar to the above function; except we are returning the 5 top books with the highest borrows entries
//using map i created an array containing the array with the title of the book set to "name" and the value set to the length of the borrows array (representing popularity)
//finally, i sorted the aformentioned created array and returned it with only the top 5 showing
function getMostPopularBooks(books) {
  const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
  borrows.sort((a,b) => b.count - a.count);
  return borrows.slice(0,5);
}


//this function does the same thing as the function above except instead of counting borrows we are counting the number of times an author's id appears rather than the genre
//additionally, the final array needs to have only the top 5 authors returned with the number of times a book they have written has been borrowed
//first i used reduce to get an object containing keys represented by the authors id and values represented by the number of times a book they have written has been borrowed
//i used my helper function to sort the aformentioned array of objects
//finally i used map, find, and slice to create the object with the authors first name listed first followed by last name followed by their borrows count and i returned only the top 5
function getMostPopularAuthors(books, authors) {
    let authorsObj = books.reduce((acc, {authorId, borrows}) => {
      if (acc[authorId]) {
        acc[authorId] += borrows.length;
      } else {
        acc[authorId] = borrows.length;
      }
      return acc;
    }, {})

    let sorted = _sortObjectByValues(authorsObj);

    return sorted.map(authorId => {
      let author = authors.find((auth) => auth.id==authorId);
      let name = `${author.name.first} ${author.name.last}`;
      let retObj = {name,count:authorsObj[authorId]};
      return retObj;
    }).slice(0,5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

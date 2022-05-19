//using the array of authors i am searching for an author id that matches the id being passed to the function
//to do this i used find (since it was only asking for a single object to be returned)
//using the find function i am finding an id in the authors array that matches the id being passed in
function findAuthorById(authors, id) {
  return authors.find((item) => item.id === id);
}

//same methodology as above ^^^^
function findBookById(books, id ) {
  return books.find((item) => item.id === id);
}
//^^^same methodology as above but using a for loop
/*
function findBookById(books, id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      return books[i]
    }
  }
}
*/

//this was a tricky one for me:
//this function returns an array with two nested arrays inside of it:
//the first array should return a book obj(s) representing all books currently borrowed
//the second nested array should contain all of the books that are currently checked out
//the very first thing i did was to assign two empty arrays for the books objects representing borrowed and returned to be pushed into respectively
//next i looped through the books array and defined a variable to equal the nested borrows array of the book 
//then i just used if statements to push the respective books to their respective arrays based on if the key "returned" was true or false
//finally i set my final array to be equal to both aformentioned arrays with the borrows array coming first
function partitionBooksByBorrowedStatus(books) {
let returned = []
let borrowed = []
for (let i = 0; i < books.length; i++) {
  const borrowedArray = books[i].borrows
    if (borrowedArray[0].returned === true) {
      returned.push(books[i])
    } else if (borrowedArray[0].returned === false) {
      borrowed.push(books[i])
    }
  }
  let finalArray = [borrowed, returned]
  return finalArray
}

function getBorrowersForBook(book, accounts) {
  const {borrows} = book;
  const borrowers = borrows.map(({id, returned}) => {
    const accountMatch = accounts.find(account => account.id === id);
    return {
      ...accountMatch,
      returned
    }
  });
  return borrowers.sort((borrowerA, borrowerB) => borrowerB - borrowerA).slice(0,10)
}
//same function as above using a different method
/*
function getBorrowersForBook(book, accounts) {
  let accountsArr = [];
  for (let borrow of book.borrows) {
    let borrowerAccount = accounts.find((account) => borrow.id === account.id);
    borrowerAccount.returned = borrow.returned;
    accountsArr.push(borrowerAccount);
  }
  return accountsArr.splice(0, 10);
}
*/
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

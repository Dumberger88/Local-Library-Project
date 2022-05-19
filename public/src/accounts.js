//I used the array method find to loop over each object in the accounts array until it finds an account id that matches the id being passed to the function
function findAccountById(accounts, id) {
  return accounts.find((userId) => userId.id === id);
}

//since the instructions are asking for the accounts array to be returned in a specific order (by last name alphabetically) i know that i need to use the sort array method
//in order to sort the properties of accounts.name.last => i need to convert the property of each lastname object to lowercase usinf .toLowerCase
//once the values are converted to lowercase i need to return the in ascending order with lasnames falling closer to "a" being first and last names starting with "z" being returned last
function sortAccountsByLastName(accounts) {
  return accounts.sort((lastnameA, lastnameB) => lastnameA.name.last.toLowerCase() < lastnameB.name.last.toLowerCase() ? -1 : 1)
}

//since i know i'm needing to count something the first thing i know i need to do is to set a count varaiable to = a placeholder of "0"
//i next used a for loop to loop through the books array to access the nested borrows array of objects
//then i'm looping through the borrows array and using an if statement to determine if, within the borrows array, there exists an id that matches the id of the specific account from the accounts array that is being passed in
//for everytime a matching id is found result will be incremented by 1
//finally i'm returning the counter variable that represents the total number of times an account user has borrowed any book from the books array (regardless of it's returned status)
function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  for (let i = 0; i < books.length; i++) {
      const borrowed = books[i].borrows
      for (let j = 0; j < borrowed.length; j++) {
          if (borrowed[j].id === account.id) {
              result ++
          }
      }
  }
  return result
}

//this function is designed to look through both the books and authors arrays and will return an array of books currently possessed by the account use that have not been returned
//additionally each book contains the author id and name listed before the borrows array in each book that has not been returned
//to begin: i know the instructions are asking for an array to be returned--so I am setting a variable to be set to an empty array (that items can later be pushed into)
//first i used for each to find which books in the books array match the account id being passed that have not yet been returned (ie. they are possessed by the author)
//i am then pushing all of those book objects that match to the aformentioned empty array
//once i have all the books in the new array; i want to find which books have an author id that corresponds to the books in the array
//to do that I used forEach to look at each array of books and i'm using find to declare a variable that equals a person (author) id in the author array that matches the authorId of any of the authorIds belonging to the books in our new array
//then, once the author's information has been found, I am returning/inserting the variable attached to the matching authors into the book object
//finally i return our booksTaken variable
function getBooksPossessedByAccount(account, books, authors) {
  let booksTaken = [];
  books.forEach(book=>{
    if (book.borrows.find(item=>item.id === account.id && !item.returned)) {
      booksTaken.push(book);
    }
  })
  booksTaken.forEach(book=>{
    let anAuthor = authors.find(person => person.id === book.authorId);
    book['author'] = anAuthor;
  })
  return booksTaken;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

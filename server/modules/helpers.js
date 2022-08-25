const errorMessages = {
  missingDataErrorMessage: "missing required data in request",
  noIndexErrorMessage: "cannot find item at index with id or email",
};

// Takes ID or email and determine if what is sent is a number or not
// from arguments and search memory, if the index is > -1, then return index, else
// return false, indicating the id does not exist in the database

const findIndexByIdOrEmail = (array, idOrEmail) => {
  const isNumber = !Number.isNaN(Number(idOrEmail));
  let index;

  isNumber
    ? (index = array.findIndex((item) => item.id === Number(idOrEmail)))
    : (index = array.findIndex((item) => item.email === idOrEmail));

  return index;
};

module.exports = {
  errorMessages,
  findIndexByIdOrEmail,
};

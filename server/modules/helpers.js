const errorMessages = {
  missingDataErrorMessage: "missing required data in request",
  noIndexErrorMessage: "cannot find item at index with id",
};

// Takes ID from arguments and search memory, if the index is > -1, then return index, else
// return false, indicating the id does not exist in the database

const findIndexById = (array, id) => {
  return array.findIndex((item) => item.id === Number(id));
};

module.exports = {
  errorMessages,
  findIndexById,
};

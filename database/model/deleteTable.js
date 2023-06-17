const deleteFromTable = (table, column, value) => {
  return (string = `DELETE FROM ${table} WHERE ${column} =  ${value};`);
};

module.exports = {
  deleteFromTable,
};

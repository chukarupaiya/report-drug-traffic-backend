const InsertInUserTableQuery = () => {
  let string =
    "INSERT INTO `users` (`user_name`, `password`, `position`) VALUES (?, ?, ?);";
  return string;
};

const InsertInPostTableQuery = () => {
  let string =
    "INSERT INTO `post` (`user_id`, `likes`, `address`,`date`,`seen`,`time`,`aggregate`) VALUES (?,? ,?, ?, ?, ? , ?);";
  return string;
};

const InsertInLocationTableQuery = () => {
  let string =
    "INSERT INTO `location` (`latitude`,`longitude`) VALUES (?, ?);";
  return string;
};

module.exports = {
  InsertInPostTableQuery,
  InsertInUserTableQuery,
  InsertInLocationTableQuery,
};

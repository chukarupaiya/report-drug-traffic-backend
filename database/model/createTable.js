const UserTableCreateQuery = () => {
  string =
    "CREATE TABLE `users` (`user_id` INT NOT NULL AUTO_INCREMENT,`user_name` varchar(255) NOT NULL,`password` varchar(255) NOT NULL,`position` INT NOT NULL,PRIMARY KEY (`user_id`));";
  return string;
};


const PostTableCreateQuery = () => {
  string =
    "CREATE TABLE `post` (`post_id` INT NOT NULL AUTO_INCREMENT,`user_id` INT NOT NULL ,`likes` INT NOT NULL,`address` varchar(255) NOT NULL,`date` varchar(255) NOT NULL,`seen` INT NOT NULL,`time` varchar(255) NOT NULL,`aggregate` varchar(255) NOT NULL,PRIMARY KEY (`post_id`));";
  return string;
};


const LocationTableCreateQuery = () => {
  string =
    "CREATE TABLE `location` (`location_id` INT NOT NULL AUTO_INCREMENT,`latitude` INT NOT NULL ,`longitude` INT NOT NULL,PRIMARY KEY (`location_id`));";
  return string;
};


module.exports = {
  UserTableCreateQuery,
  PostTableCreateQuery,
  LocationTableCreateQuery,
};


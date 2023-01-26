create table user(
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fullName varchar(100) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    pass varchar(255) NOT NULL,
    verified Boolean NOT NULL DEFAULT false,
    phoneNumber INT(50),
    userAddress varchar(255),
    userImg varchar(255)
)

create table events(
    id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    createdTime varchar(255) NOT NULL,
    imageURL varchar(255) NOT NULL
)

create table comments(
    id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    eventId int(11) UNSIGNED NOT NULL,
    commentText varchar(255) NOT NULL,
    FOREIGN KEY (eventId) REFERENCES events(id) 
)

create table blogs(
    id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userId int(11) UNSIGNED NOT NULL,
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    imageURL varchar(255) NOT NULL,
    createdTime varchar(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
)


-- SELECT * FROM poolquestions INNER JOIN questionoptions ON poolquestions.id = questionoptions.questionId WHERE poolquestions.userId=1 AND poolquestions.courseId=1;
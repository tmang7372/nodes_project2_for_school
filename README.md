# nodes_project2_for_school
1. This is an individual assignment that is to be handed in by 2nd Jan 2023, 2359 for assignment 1.

2. This is an individual assignment that is to be handed in by 5th Feb 2023, 2359 for assignment 2.

3. You are required to submit a hardcopy of a simple report containing a simple web api description of the web services you create. The softcopy must contain the report, your source code and database table(s). It is to be submitted using the digital drop box for this module as a zip file. The name of the compressed file should be like “pNNNNNNN.zip” where NNNNNNN is your admission number. The hardcopy is a report that must contain your name, and admission number.

4. The first presentation will be conducted ONLINE during the interview session on the week of 2nd Jan 2022. No marks will be awarded if the work is copied or if you are absent from the presentation.

5. The 2nd presentation will be conducted ONLINE during the interview session on the week of 6th Feb 2022. No marks will be awarded if the work is copied or if you are absent from the presentation.

6. 5 marks to be deducted per working day late, up to a maximum deduction of 25 marks.

7. Non acceptance of assignments that are submitted any later than 15th Jan 2359 and 0 marks will be given for assignment 1.

8. Non acceptance of assignments that are submitted any later than 19th Feb 2359 and 0 marks will be given for assignment 2.

SP Movies

Task Scenario

SP Movies is planning to set up a cinema hall in campus to screen movies to SP students and staff.

As such, SP Movies has tasked you to design the backend restful webservices for a simple admin system that can perform administrative tasks involving the maintenance of their movies in the system and also for users to view and search for interested movies in the webpage.

Minimum Requirements

The administrator must be able to do the following:

Assignment 1:

The admin web api must provide the following functionalities:

· Verify admin’s credentials using email and password

· Add new movie

· Add new genre

The public web api must be able to provide the following functionalities:

· Retrieve all active screening movies

· Retrieve movies based on substring of movie name OR genre id, sorted in ascending release date. (Consider use of SQL Like operator for substring search)

· Retrieve all genre

Assignment 2:

· Use JWT to authenticate/login the users.

· If user is not authenticated as role admin and does not hold a valid JWT when calling the webservice, he/she will not be able to call add new movie, add genre, update movies, delete genre web services. (Use decorator)

· Update movie details. Admin can update all the movie details except for the id.

· Delete genre, which will cascade delete all the movies belonging to that genre. Only admins can perform this function.

· Use CORS library to enable web api access from all urls

· Hosting in the cloud

You are required to come out with the appropriate verb for the webservices required (get, post, put, delete)

All webservices will return JSON data. You can determine the format and message to be returned.

Possible Directory structure for assignment 1:

|

|___controller

| |__app.js

| |

|___model

| |__movie.js

| |

| |__genre.js

| |

| |__user.js

| |

| |__databaseConfig.js

|

|____server.js

Web API Description you are required to fill up and provide in the submission:

S/N URL HTTP Method POST Body Result (On success and failure)

Database Structure

Your database structure should minimally have the following tables and fields:

Movie Table

movieID (Primary Key)- Auto Increment ID

name - Name of movie eg Dune

description- Movie Description

Release Date - yyyy/mm/dd

Image URL- Image url of product

GenreId Foreign key to link to genre table

Active A character representing Y or N

DateInserted default value of current_timestamp()

Genre Table

genreId (Primary Key)- Auto Increment ID

name name of genre eg sci-fi,fantasy,action etc

description Description of genre

User

userID(Primary Key) Auto Increment User ID

Email Email

Name Name of user

Role User or Admin

Password Password of admin

Advanced Features

There are some possible enhancements to the project that you can consider only after you have completed the minimum requirements. You can also have your own enhancements. Highlight any additional features in your presentation and brief report document.

1. Logging of movie’s details before updating

2. Uploading of movie image to server hard disk

3. Hash password of user and verify hashed password during login

Assessment

The project will be assessed based on the following criteria:

1. Ability to demonstrate the required functionality for the project specification based on (90 marks):

· Presentation and demonstration

· Explanation of code logic

· Brief report document

- Web API listing of all functionalities

· Code implementation

· Proper interaction between server and database

· Correctness

2. Implementation of advanced features (10 marks)

· Creativity and effectiveness of advanced features

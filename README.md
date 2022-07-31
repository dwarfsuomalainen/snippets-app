# Snippets Webapp

Simple web application, which lets the authenticated users to post own code snippets and comment other posts. 

## Description and user guide
On the main screen you can see the list of posts which is rederd from the database. Viewing the posts is available for everyone.
Registered users are able to create ownpostas, after login, on the button CREATE POST. If you want to comment the post, click to the title of desirable post, it will open the forf for adding the comment. After adding your comment, it will appear in the list of comments  with your credentials and a time stamp, provided by server. After adding your comment, you can immediately add another ones, or go back to the main page, where your comments will be also visible under the post you commented. 

Design of posts and pages will be improved, so it is not a final look. 
                (✿◡‿◡) Thanks for using the app. 


## Features
- [x] Authentication and Authorization (includes Email verification)
- [x] Create Question
- [x] Create Comments
- [ ] Upvote Downvote Question and Answer - in future versions
- [x] Create Comment
- [x] Filter questions based on tags - in future versions
- [x] Serverside Pagination
- [ ] Search Question - in future versions
- [ ] Forgot password - in future versions
- [ ] Upvote Downvote comments - in future versions
- [ ] OAuth login with Google, Facebook, and Github - in future versions


## Implementation of backend with Node.js
+ Express framework

## Utilization of database
+ MongoDB 

## Authentication
+ Users are able to register and login
+ JWT authorization
+ Only authenticated users can post, comment 

## Features
    Authenticated users can:
+ Post new code snippets and text descriptions
+ Comment on existing posts
+ Non-authenticated users can see posts, comments
+ Date/time of comments and user email on the comments
+ Pagination
+ Uploading screenshots

## Responsive design
+ Materialize


## Env Variables
Edit a .env file in root folder
```
SECRET = **Your secret phrase**
```
## Mongo DB
+ Database set up at mongoDB = "mongodb://127.0.0.1:27017/testdb" (you can use your own set up, change the const in app.js)
+ Categories for posts should be added to collection Categories manually (feature "tags" will arrive soon and will replace categorie's checkboxes)

## Setup Locally

```bash
git clone https://github.com/dwarfsuomalainen/snippets-app.git
cd snippets-app
```
### Project 
```bash
cd 
npm install
npm start
```



ᓚᘏᗢ Now all set!  Start the app and go to <a href="http://localhost:1234/">http://localhost:1234/</a> URL and see your application up and running.

## License

[MIT](http://opensource.org/licenses/MIT)

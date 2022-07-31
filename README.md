# Snippets Webapp

Simple web application, which lets the authenticated users to post own code snippets and comment other posts. 


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


## Used instruments 

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



ᓚᘏᗢ Now all set  go to <a href="http://localhost:1234/">http://localhost:1234/</a> URL and see your application up and running.

## License

[MIT](http://opensource.org/licenses/MIT)

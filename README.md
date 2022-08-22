## Prerequisites:
- Node v~12.16.0
- npm v~6.14.5
- MongoDB Atlas URI

## Setup:
- `cd server`
- `run npm install`
- `update MongoDB Atlas URI in .env`
- `update ACCESS_TOKEN_SECRET in .env`
- `update REFRESH_TOKEN_SECRET in .env`
- `run npm start`

## Api
- Base For Auth `http://localhost:8000/api/auth`
- Base For Post `http://localhost:8000//api/reviews`

## Api routes are in the routes folder

### Base For Auth
### - Create a user account
- post('/signup')
### - login to your user account
- post('/login')
### - refresh your accessToken

### Base For Auth
post('/refresh')

### Base For Post 
### - Create a post
post('/createpost')
### - get all post(most recent at the top)
get('/getallpost')
### - get all post created by me a
get('/mypost')
### - like a post(helpful)
put('/vote/:postId')
### - unlike a post(you change you mind)
put('/unvote/:postId')
### - comment on a post
put('/createcomment/:postId')
### - update a post create by you
put('/updatepost/:postId')
### - delete a post create by you
delete('/deletepost/:postId')
### - get post by likes count
get('/postbyvotecount')

## Test API endpoint on swagger [http://localhost:8000/api-docs/] PUT YOUR ACCESSTOKEN INSIDE authorization field when testing on swagger
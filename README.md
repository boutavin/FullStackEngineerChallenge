# Full Stack Developer Challenge

All operations on the local DB are made on the server side.\
Restart the server to reset the data.\
Dummy data is already in the local DB.

## Installation
1. Install dependencies on both backend and frontend
```
    cd .\backend
    npm i

    cd .\frontend
    npm i
```
2. Start the server
```
    cd .\backend
    npm start
```
3. Start the website
```
    cd .\frontend
    npm start
```
4. Go to http://localhost:3000/
   
**Browser support: Chrome, Firefox, Edge (async/await is used)**


## Implemented views
### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Technologies used
### Frontend
- ReactJS
- TypeScript

### Backend
- NodeJS
- TypeScript

## Compromises made because of time concerns
- No DB... Local server storage used instead.
- No tests...
- No error handling on the frontend... Only logs...
- Common classes (Employee, Feedback and Review) are duplicated in both backend and frontend... Should be moved to a local repository to share the code.
- No responsive layout... Please view the website on a desktop and in fullsize...
- Backend & frontend servers run in the developement mode... Should use proper production server to run on the build file.



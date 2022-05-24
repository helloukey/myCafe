
![myCafe-Logo](https://raw.githubusercontent.com/helloukey/myCafe/main/public/favicon/apple-touch-icon.png)


# myCafe

A Simple Responsive Recipe Website made using [NodeJS](https://nodejs.org/), [ExpressJS](https://expressjs.com/), [EJS](https://ejs.co/), and [MongoDB](https://www.mongodb.com/).


## Live Preview

* Live preview of this project: [myCafe](https://mycafe-recipe.herokuapp.com/)


## Features

- Simple Responsive Design
- Register and Login Functionality
- [JWT](https://github.com/auth0/node-jsonwebtoken) Authentication
- Create Your Own Recipe
- Duplicate Ingredients Removal
- User & Recipe Validation
- Protected Routes
- Password Hashing - [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- Custom Error Handling
- 404 Page

## Installation & Setup

* First, download or clone this repo, and then run the command given below to install all the required dependencies.

```bash
  npm install
```

* Rename the `.env_sample` file to `.env`

* Provide your **MongoDB Connection String**, **JWT Secret Key**, and **PORT** inside the `.env` file.

* Run the `node app` or `nodemon app` command to start the server.

* Remove `secure: true` from the cookie parser options object located inside the `controllers/myController.js` file. <br/>**Note**: This will allow you to store cookies in development mode. In production mode, make sure to add `secure: true` again.

* Finally, Preview this project locally by visiting the URL: `localhost:<PORT number>`
## Feedback

If you have any feedback, please reach out to me at kunalukey32@gmail.com


## Authors

- [@helloukey](https://www.github.com/helloukey)


## License

[MIT](LICENSE)
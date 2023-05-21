# Medicine E-commerce API

This is an API for a medicine e-commerce platform. It provides endpoints for user registration, login, medicine search, adding items to the cart, and more. The API is built using Node.js, Express.js, and MongoDB.

## Installation

1. Clone the repository: `git clone https://github.com/Arunangshu-Das/minor_backend.git`
2. Navigate to the project directory: `cd minor-backend`
3. Install the dependencies: `npm install`

## Configuration

Before running the application, make sure to configure the database connection in the `config/database.js` file.

## Usage

To start the server, run the following command:

```
npm start
```

The server will start running at `http://localhost:<PORT>`, where `<PORT>` is the port number specified in the environment configuration.

## API Endpoints

The following are the available API endpoints:

- `GET /` - Retrieves a welcome message.
- `POST /register` - Registers a new user.
- `POST /login` - Authenticates a user and generates a JSON Web Token (JWT).
- `GET /all` - Retrieves all available medicines.
- `POST /search` - Searches for medicines by name.
- `PUT /addtocart` - Adds an item to the user's cart.
- `GET /showcart` - Retrieves the user's cart.
- `GET /getmedicine` - Retrieves medicines related to a specific disease.
- `POST /generatemedicine` - Generates new medicines for a disease.

Please refer to the API documentation for detailed information on each endpoint.

## Dependencies

The following are the main dependencies used in this project:

- `express` - Fast, unopinionated, minimalist web framework for Node.js.
- `jsonwebtoken` - JSON Web Token implementation for Node.js.
- `bcryptjs` - Library for hashing and salting user passwords.
- `mongoose` - MongoDB object modeling tool.
- `cors` - Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

---

# Pokémon TCG Online

Pokémon TCG Online is a fan recreation of the Pokémon Trading Card Game.
The application runs in-browser and is currently played locally against a computer.

Pokémon TCG Online uses the [Pokémon TCG API](https://Pokémontcg.io/) to retrieve cards.

## Installation

Clone this repository to your computer.

Open the project folder in a shell, then use the following commands to start the server and client.
```console
cd server
node app.js
cd ../client
npm start
```

Alternatively, simply navigate to the web hosted version at [TODO: host].

## Development

Clone this repository to your computer.

Use the following commands to install dependencies.
```console
cd server
npm install
cd ../client
npm install
```

Pokémon TCG Online uses the MERN stack:
- MongoDB tracks turns and player information.
- Express.js manages API endpoints.
- React manages the front end.
- Node.js runs the back end.

A few npm packages were integral to development:
- Axios for communicating with the API from the front end
- Bootstrap and React-Bootstrap provided the foundation for the layout.
- Zustand was used to maintain and manage global state.


*This program was created for the Web Development Projects class at Columbus State University.
  Pokémon is owned by Nintendo, Creatures, Inc., and Game Freak. *

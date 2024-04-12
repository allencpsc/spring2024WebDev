# Pokemon TCG Online Front-End Documentation

Pokemon TCG Online's front-end was created with React and uses Zustand for global state management.


## Components

- Active.js
    - Displays a player's active Pokemon by creating a Card.
- ActionButton.js
    - The actual buttons which trigger API calls for gameplay. Children of CardButtons.js.
- Bench.js
    - Displays a player's benched Pokemon. Pokemon are stored in an array in global state which is mapped into Cards.
- Card.js
    - The Pokemon card itself. Component handles the display of the card image, health bar, and attached energies. Cards also include a modal consisting of the image and action buttons.
- CardButtons.js
    - Handles the buttons displayed in a Card's modal. The type, location, and playerId of a Card are used to determine the relevant buttons.
- EnergyIcons.js
    - Displays energies attached to a Pokemon.
- GameBoard.js
    - Gathers all card displaying components and manages layout.
- Hand.js
    - Displays all cards in a player's hand; mapped from an array in Zustand global state.
- TextBox.js
    - Displays text prompts from global state.


## Global state management

[Zustand ](https://docs.pmnd.rs/zustand/getting-started/introduction) is a state manager for React applications. Pokemon TCG Online uses Zustand's state management to track card locations, game state, and text prompts.

State management is handled in client/resources/store.js.

The management can essentially be broken down into 'fields' and 'methods.'

- Fields
    - Player1 and Player2
        - Store each player's hand, bench, active, prize, discard, and deck lists.
        - Each location (hand, bench, etc...) is an array of Card objects.
    - Text
        - Stores prompt text for game progression. 
        - Text that is not provided from server is sent from methods.
    - Started
        - Tracks whether the game has been started. Used to avoid misbehavior from start methods.
    - Attack
        - Tracks attacks from each turn.
        - Attack array contains information from Pokemon TCG API describing attack name, damage, energy cost, etc.

- Methods
    - Introduction
        - Makes back end start a new game
    - First Turn
        - Begins the game's first turn, during which both players draw cards until each has at least one Pokemon in hand.
    - Move to Bench
        - Lets player move Pokemon from hand to bench. Benched Pokemon are considered ready to fight and can have energy cards attached.
    - Make Active
        - Lets player move Pokemon from hand or bench to active. A player's active Pokemon can attack or be attacked by the opponent's active Pokemon. Energy cards can be attached to the active.
    - Attach Energy
        - Lets player move an energy card to a Pokemon in play. 
    - CPU Turn
        - Calls computer sample opponent to execute a turn. The computer may: move a Pokemon to the active slot and/or the bench, attach an energy card, or use a trainer card; actions taken depend on turn number and game status. The computer can then use an attack to end its turn.
        - Response from /cpu-turn endpont is an array containing the opponent's new active, if any; benched Pokemon, if any; and attack used, if any.
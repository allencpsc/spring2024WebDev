import { create } from "zustand";
import axios from "axios";
import { paths } from "./const";
//TODO: add state for initial load - bool, use to see if we need to start
var currentTurn = 0;

export const useStore = create((set) => ({
  player1: {
    hand: [],
    bench: [],
    active: [],
    prize: [],
    discard: [],
    deck: [],
  },
  player2: {
    hand: [],
    bench: [],
    active: [],
    prize: [],
    discard: [],
    deck: [],
  },
  text: "Welcome to Pokemon TCG Online!",
  started: null,
  attackArray: [],
  attachingEnergy: false,
  switchingCards: false,
  switchTarget: null,
  isCPUTurn: false,

  nextTurn: async () => {
    currentTurn += 1;
    console.log(currentTurn);
      if (currentTurn % 2 === 0) {
        set((state) => (
          {
          ...state,
          isCPUTurn: false,
          text: "Your turn! You can switch your active Pokémon, attach energy, and use trainer cards. Attack or click Next Turn to end your turn."
        }));
      } else {
        set((state) => ({
          ...state,
          isCPUTurn: true,
          text: "CPU's turn!"
        }));
        try {
          axios.get(paths.root + "/cpu-turn").then(function (response) {
            set((state) => ({
              ...state,
              currentTurn: state.currentTurn + 1,
              text: `CPU has placed ${response.data[0].name} in the active slot and ${response.data[1].name} in the bench. CPU's ${response.data[0].name} used ${response.data[2].name} for ${response.data[2].damage} damage! Click Next Turn to continue.`,
            }));
            set((state) => ({
              ...state,
              player2: {
                ...state.player2,
                active: [
                  state.player2.hand.find(
                    (card) => card.name === response.data[0].name
                  ),
                ],
                hand: state.player2.hand.filter(
                  (card) => card.name !== response.data[0].name
                ),
              },
            }));
            try {
              axios.get(paths.root + "/player2-bench").then(function (response) {
                set((state) => ({
                  ...state,
                  player2: { ...state.player2, bench: response.data[1] },
                }));
              });
            } catch (error) {
              console.log(error);
            }
            console.log(response.data[2]);
            set((state) => {
              console.log(state.player1.active[0].hp);
              return {
                ...state,
                player1: {
                  ...state.player1,
                  active: [
                    {
                      ...state.player1.active[0],
                      hp:
                        Number(state.player1.active[0].hp) -
                        response.data[2].damage,
                    },
                  ],
                },
              };
            });
          });
        } catch (error) {}
      }
    },

  introduction: async () => {
    try {
      axios.get(paths.root + "/introduction").then(function (response) {
        set((state) => ({ ...state, text: response.data, started: true }));
      });
    } catch (error) {
      console.log(error);
    }
  },

  drawCard: async (playerId) => {
    set((state) => {
      console.log(state.player1.deck)
    })
  },
  /* attack array has knockout bool - that can spawn an alert, prompt gameboard to clear active
  / 3 knock
  */
  firstTurn: async () => {
    try {
      axios
        .get(paths.root + "/turn-zero/player1")
        .then(function (response) {
          console.log(response.data);
          set((state) => ({
            ...state,
            text: "First turn in progress... Select your active and benched Pokémon!", 
          }));
          const cardsWithEnergies = response.data.map((card) =>
            card.supertype === "Pokémon" ? { ...card, energies: [] } : card
          );
          set((state) => ({
            ...state,
            player1: { ...state.player1, hand: cardsWithEnergies },
          }));
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get(paths.root + "/turn-zero/player2")
        .then(function (response) {
          set((state) => ({
            ...state,
            player2: { ...state.player2, hand: response.data },
          }));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  moveToBench: async (playerId, index) => {
    console.log("Here's the moveToBench function.");
    console.log(playerId);
    console.log(index);
    set((state) => {
      if (playerId === 1) {
        return {
          ...state,
          player1: {
            ...state.player1,
            bench: [...state.player1.bench, state.player1.hand[index]],
            hand: state.player1.hand.filter((card, i) => i !== index),
          },
        };
      } else {
        return {
          ...state,
          player2: {
            ...state.player2,
            bench: [...state.player2.bench, state.player2.hand[index]],
            hand: state.player2.hand.filter((card, i) => i !== index),
          },
        };
      }
    });
  },

  makeActive: async (playerId, location, index) => {
    console.log("Here's the makeActive function");

    set((state) => {
      if (playerId === 1) {
        if (location === "hand") {
          try {
            axios
              .get(paths.root + "/turn-zero/player1")
              .then(function (response) {
                console.log(response);
              });
          } catch (error) {
            console.log(error);
          }
          return {
            ...state,
            player1: {
              ...state.player1,
              active: [state.player1.hand[index]],
              hand: state.player1.hand.filter((card, i) => i !== index),
            },
          };
        } else if (location === "bench") {
          console.log("makeactivebench");
          return {
            ...state,
            player1: {
              ...state.player1,
              active: [state.player1.bench[index]],
              bench: state.player1.bench.filter((card, i) => i !== index),
            },
          };
        }
        return {
          ...state,
          player1: {
            ...state.player1,
            active: [state.player1.bench[index]],
            bench: state.player1.bench.filter((card, i) => i !== index),
          },
        };
      } else if (playerId === 2) {
        if (location === "hand") {
          console.log("makeactive hand");
          return {
            ...state,
            player2: {
              ...state.player2,
              active: [state.player2.hand[index]],
              hand: state.player2.hand.filter((card, i) => i !== index),
            },
          };
        } else if (location === "bench") {
          console.log("makeactive bench");
          return {
            ...state,
            player2: {
              ...state.player2,
              active: [state.player2.bench[index]],
              bench: state.player2.bench.filter((card, i) => i !== index),
            },
          };
        }
        return {
          ...state,
          player2: {
            ...state.player2,
            active: [state.player2.bench[index]],
            bench: state.player2.bench.filter((card, i) => i !== index),
          },
        };
      }
    });
  },

  attachEnergy: async (
    playerId,
    energyIndexInHand,
    pokemonLocation,
    pokemonIndexInLocation
  ) => {
    console.log("Here's the attachEnergy function");
    console.log(
      playerId +
        " " +
        energyIndexInHand +
        " " +
        pokemonLocation +
        " " +
        pokemonIndexInLocation
    );
    // Set state to attachingEnergy = true
    // Listener in Card maybe to check if attachingEnergy is true, if so, onClick will change to attach energy ?
    // When attachingEnergy=true, click on target card to attach energy
    set((state) => {
      state.attachingEnergy = true;
      if (playerId === 1) {
        if (pokemonLocation === "active") {
          console.log("attachEnergy active");
          return {
            ...state,
            player1: {
              ...state.player1,
              active: state.player1.active.map((card, i) =>
                i === 0
                  ? {
                      ...card,
                      energies: [
                        ...card.energies,
                        state.player1.hand[energyIndexInHand],
                      ],
                    }
                  : card
              ),
              hand: state.player1.hand.filter(
                (card, i) => i !== energyIndexInHand
              ),
            },
          };
        } else if (pokemonLocation === "bench") {
          return {
            ...state,
            player1: {
              ...state.player1,
              active: [state.player1.bench[pokemonIndexInLocation]],
              bench: state.player1.bench.filter(
                (card, i) => i !== pokemonIndexInLocation
              ),
            },
          };
        }
        return {
          ...state,
          player1: {
            ...state.player1,
            active: [state.player1.bench[pokemonIndexInLocation]],
            bench: state.player1.bench.filter(
              (card, i) => i !== pokemonIndexInLocation
            ),
          },
        };
      }
    });
  },

  selectSwitchCard: async (playerId, card2Location, card2LocationIndex) => {
    console.log("Here's the selectSwitchCard function");
    set((state) => ({
      ...state,
      switchTarget: { playerId, card2Location, card2LocationIndex },
    }));
  },

  switchCard: async (
    playerId,
    card1Location,
    card1LocationIndex,
    card2Location,
    card2LocationIndex
  ) => {
    console.log("Here's the switchCard function");
    set((state) => ({
      ...state,
      text: "Switching cards... Select the card you want to switch with.",
      switchingCards: true,
    }));
    /* if(playerId === 1) {
            if(card1Location === "active" && card2Location === "bench") {
                return {...state, player1: {...state.player1, active: [state.player1.bench[card2LocationIndex]], bench: state.player1.bench.map((card, i) => i === card2LocationIndex ? state.player1.active[0] : card)}}
            }
            else if(card1Location === "bench" && card2Location === "active") {
                return {...state, player1: {...state.player1, active: [state.player1.bench[card1LocationIndex]], bench: state.player1.bench.map((card, i) => i === card1LocationIndex ? state.player1.active[0] : card)}}
            }
        }
        else if(playerId === 2) {
            if(card1Location === "active" && card2Location === "bench") {
                return {...state, player2: {...state.player2, active: [state.player2.bench[card2LocationIndex]], bench: state.player2.bench.map((card, i) => i === card2LocationIndex ? state.player2.active[0] : card)}}
            }
            else if(card1Location === "bench" && card2Location === "active") {
                return {...state, player2: {...state.player2, active: [state.player2.bench[card1LocationIndex]], bench: state.player2.bench.map((card, i) => i === card1LocationIndex ? state.player2.active[0] : card)}}
            }
        })) */
  },
  
  attack: async (playerId, attackName) => {
    try {
      axios({
        method: "post",
        url: paths.root + "/attack",
        data: {
        } 
        })
        .then(function (response) {
        console.log(response);
      });
    } catch (error) {
      
    }
    set((state) => ({
      ...state,
      text: `Player 1 used ${attackName} on ${state.player2.active[0].name} for ${state.player1.active[0].attacks.find(({name}) => name === attackName).damage}!`,
      player2: {...state.player2, active:[{...state.player2.active[0], hp: state.player2.active[0].hp - state.player1.active[0].attacks.find(({name}) => name === attackName).damage}]}
      
    }));
  },


  //bench swap with active independently
  //energies attach to active
  setText: async (text) => set((state) => ({ ...state, text })),

  CPUTurn: async () => {
    set((state) => ({ ...state, text: "CPU's turn in progress..." }));
    
  },


  usePotion: async (index) => {
    console.log("use potion");
    set((state) => {
      console.log(state.player1.active[0].hp);
      return {
        ...state,
        player1: {
          ...state.player1,
          active: [
            {
              ...state.player1.active[0],
              hp:
                Number(state.player1.active[0].hp) + 20 >
                state.player1.active[0].maxHp
                  ? state.player1.active[0].maxHp
                  : Number(state.player1.active[0].hp) + 20,
            },
          ],
          hand: state.player1.hand.filter((card, i) => i !== index),
        },
      };
    });
  },

  reset: async () => {
    set((state) => ({
      ...state,
      player1: {
        hand: [],
        bench: [],
        active: [],
        prize: [],
        discard: [],
        deck: [],
      },
      player2: {
        hand: [],
        bench: [],
        active: [],
        prize: [],
        discard: [],
        deck: [],
      },
      text: "Welcome to Pokemon TCG Online!",
      started: null,
      attackArray: [],
      attachingEnergy: false,
      switchingCards: false,
      switchTarget: null,
    }));
    currentTurn = 0;
  },
}));

//TODO: API endpoint to return current game state?

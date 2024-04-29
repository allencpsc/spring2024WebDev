import { create } from "zustand";
import axios from "axios";
import { paths } from "./const";


var currentTurn = 0;
var cpuTurn = false;
var mustSwitch=false;
export const useStore = create((set) => ({
  player1: {
    hand: [],
    bench: [],
    active: [],
    prize: [],
    discard: [],
    deck: [],
    knockouts: 0,
  },
  player2: {
    hand: [],
    bench: [],
    active: [],
    prize: [],
    discard: [],
    deck: [],
    knockouts: 0,
  },
  text: "Welcome to Pokemon TCG Online!",
  started: null,
  attackArray: [],

  nextTurn: async () => {
      if (!cpuTurn) {
        set((state) => (
          {
          ...state,
          isCPUTurn: false,
          text: "Your turn! You can switch your active Pokémon, attach energy, and use trainer cards. Attack or click Next Turn to end your turn."
          }));
          try{
          axios.get(paths.root + "/draw-single-card")
          .then(function (response) {
          set((state) => ( {
            ...state,
            player1: {
              ...state.player1,
              hand: [...state.player1.hand, response.data]
            }
          }));
        });
      }
        catch (error) {
          console.log(error);
        }

      } else {
        set((state) => ({
          ...state,
          isCPUTurn: true,
          text: "CPU's turn!"
        }));

        if ( currentTurn > 1 ) {
          if (mustSwitch) {
            try {
              axios.get(paths.root+ '/swap-cpu-pokemon').then(function (response) {
                set((state) => ({
                  ...state,
                  player2: {
                    ...state.player2,
                    active: [response.data]
                  }
                }));
              });
            } catch (error) {
              console.log(error)
            }
          }
          
/*           set((state) => {
            if (state.player2.active[0] === null) {
              console.log("CPU has no active Pokemon")
              var newActiveCard;
              try{
                axios.get(paths.root + "/swap-cpu-pokemon").then(function (response) {
                  newActiveCard = [response.data];
                });
              }
               catch (error) {
                console.log(error)
              }
              return {
                ...state,
                player2: { ...state.player2, active: newActiveCard }
              }
          } else {
          return {state};
          }
          }) */
          try {
            axios.get(paths.root + "/cpu-turn-two").then(function (response) {
              if (response.data[0] !== null) {
                set((state) => ({
                  ...state,
                  text: `CPU has placed ${response.data[0].name} in the active slot!`,
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
              }
              if(response.data[1] !== null){
/*                 set((state) => ({
                  ...state,
                  text: `CPU has placed ${response.data[1].name} in the bench slot!`,
                  player2: {
                    ...state.player2,
                    bench: [ state.player2.bench,
                      state.player2.hand.find(
                        (card) => card.name === response.data[1].name
                      ),
                    ],
                    hand: state.player2.hand.filter(
                    (card) => card.name !== response.data[1].name
                    ),
                  },
                })); */
              set((state) => {
                return {
                  ...state,
                  text: `CPU's ${state.player2.active[0].name} used ${response.data[2].name} for ${response.data[2].damage} damage! Click Next Turn to continue.`,
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
          }
        });
        set((state) => {
          if (state.player1.active[0].hp <= 0) {
            return {
              ...state,
              text: state.text + ` Player 1's ${state.player1.active[0].name} has fainted! Click Next Turn to continue.`,
              player1: {
                ...state.player1,
                active: [],
                knockouts: state.player1.knockouts + 1,
              }
            };
          }
          else
          {
            return state
          }
        });

          } catch (error) {
          }
      }else{
          try {
            axios.get(paths.root + "/cpu-turn").then(function (response) {
              set((state) => ({
                ...state,
                text: `CPU has placed ${response.data[0].name} in the active slot and ${response.data[1].name} in the bench. CPU's ${response.data[0].name} used ${response.data[2].name} for ${response.data[2].damage} damage! Click Next Turn to continue.`,
              }));
              set((state) => {
                return {
                ...state,
                player2: {
                  ...state.player2,
                  active: [
                    state.player2.active.length >= 1 ? state.player2.active : state.player2.hand.find(
                      (card) => card.name === response.data[0].name
                    ),
                  ],
                  hand: state.player2.hand.filter(
                    (card) => card.name !== response.data[0].name
                  ),
                },
              };
              });
              try {
                axios.get(paths.root + "/player2-bench").then(function (response) {
                  set((state) => {
                    return {
                    ...state,
                    player2: { ...state.player2, bench: response.data },
                    };
                  });
                });
              } catch (error) {
                console.log(error);
              }
              set((state) => {
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
      }
     
      cpuTurn = !cpuTurn;
      currentTurn++;
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
    try{
      axios.get(paths.root + "/draw-single-card")
      .then(function (response) {
      set((state) => {
        state.player1.hand = state.player1.hand.push(response.data);
      })
    });
  }
    catch (error) {
      console.log(error);
    }

  },
  /* attack array has knockout bool - that can spawn an alert, prompt gameboard to clear active
  / 3 knock
  */
  firstTurn: async () => {
    try {
      axios
        .get(paths.root + "/turn-zero/player1")
        .then(function (response) {
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
      console.log(error);
    }
  },

  moveToBench: async (playerId, index) => {
    set((state) => {
        axios
              .post(paths.root + "/place-card", {

                  cardName: state.player1.hand[index].name,
                  location: "Bench",
                  benchSlot: state.player1.bench.length,
              })
              .then(function (response) {
              });
        return {
          ...state,
          player1: {
            ...state.player1,
            bench: [...state.player1.bench, state.player1.hand[index]],
            hand: state.player1.hand.filter((card, i) => i !== index),
          },
        };
    });
  },

  makeActive: async (playerId, location, index) => {
    set((state) => {
        if (location === "hand") {
          try {
            axios
              .post(paths.root + "/place-card", {

                  cardName: state.player1.hand[index].name,
                  location: "Active",
                  benchSlot: 0,

              })
              .then(function (response) {
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
          try{
            axios
              .post(paths.root + "/place-card", {

                  cardName: state.player1.hand[index].name,
                  location: "Active",
                  benchSlot: index,

              })
              .then(function (response) {
              });
          } catch (error) {
            console.log(error);
          }
          return {
            ...state,
            player1: {
              ...state.player1,
              active: [state.player1.bench[index]],
              bench: [state.player1.bench.filter((card, i) => i !== index), state.player1.active[0]],
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
    });
  },

  attachEnergy: async (
    playerId,
    energyIndexInHand
  ) => {
    set((state) => {
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
                (i) => i !== energyIndexInHand
              ),
            },
          };
    });
  },

  attack: async (attackName) => {
  try {
      axios({
        method: "post",
        url: paths.root + "/attacker-options",
        data: {
          command: attackName,
        }
        })
        .then(function (response) {
        set((state) => {
          var attack = state.player1.active[0].attacks.find(({name}) => name === attackName)
          var newActiveCard;
          if (response.data[1] === true) {
            newActiveCard = [null];
            mustSwitch = true;
          } else {
            newActiveCard = ( [{...state.player2.active[0], hp: state.player2.active[0].hp - state.player1.active[0].attacks.find(({name}) => name === attackName).damage}])
          
        }
          return {
          ...state,
          text: `Player 1 used ${attackName} on ${state.player2.active[0].name} for ${state.player1.active[0].attacks.find(({name}) => name === attackName).damage} damage!` + (response.data[1] ? `Player 2's ${state.player2.active[0].name} has fainted! Click Next Turn to continue.` : ""),
          player2: {...state.player2, active: newActiveCard}
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  },


  setText: async (text) => set((state) => ({ ...state, text })),

  CPUTurn: async () => {
    set((state) => ({ ...state, text: "CPU's turn in progress..." }));
  },


  usePotion: async (index) => {
    set((state) => {
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
          hand: state.player1.hand.filter((i) => i !== index),
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
    }));
    currentTurn = 0;
  },
}));

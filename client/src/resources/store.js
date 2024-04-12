import { create } from "zustand";
import axios from "axios";
import { paths } from "../const";
//TODO: add state for initial load - bool, use to see if we need to start

export const useStore = create((set) => ({
    player1: { hand: [], bench: [], active: [], prize: [], discard: [], deck: [] },
    player2: { hand: [], bench: [], active: [], prize: [], discard: [], deck: [] },
    text: "Welcome to Pokemon TCG Online!",
    started: null,
    attack: [],
    
    introduction: async () => {
        try {
            axios.get(paths.root + '/introduction')
            .then(function (response) {
                set((state) => ({...state, text: response.data, started: true}))
            })
        }
        catch (error) {
            console.log(error)
        }
    },

    firstTurn: async () => {
        try {
            axios.get(paths.root + '/turn-zero/player1')
            .then(function (response) {
                set((state)=> ({...state, text: "First turn in progress... Select your active and benched Pokémon!"}))
                const cardsWithEnergies = response.data.map(card =>
                    card.supertype === 'Pokémon' ? {...card, energies: []}: card)
                set((state) => ({...state, player1: {...state.player1, hand: cardsWithEnergies}}))
            })
            .catch(function (error) {
                console.log(error);
            })
            axios.get(paths.root + '/turn-zero/player2')
            .then(function (response) {
                console.log(response.data)
                set((state) => ({...state, player2: {...state.player2, hand: response.data}}))
            })
            .catch(function (error) {
                console.log(error);
            })
        } catch (error) {
            throw new Error(error.message)
        }
    },

    moveToBench: async (playerId, index) => {
        console.log("Here's the moveToBench function.")
        console.log(playerId)
        console.log(index)
        set((state) => {
            if(playerId === 1) {
                console.log(state.player1.bench)
                return {...state, player1: {...state.player1, bench: [...state.player1.bench, state.player1.hand[index]], hand: state.player1.hand.filter((card, i) => i !== index)}}
            }
            else {
                return {...state, player2: {...state.player2, bench: [...state.player2.bench, state.player2.hand[index]], hand: state.player2.hand.filter((card, i) => i !== index)}}
            }
        });
    },

    makeActive: async (playerId, location, index) => {
        console.log("Here's the makeActive function")

        set((state) => {
            if(playerId === 1) {
                if(location === "hand") {
                    console.log("makeactive hand")
                    try {
                        axios.get(paths.root + '/turn-zero/player1')
                        .then(function (response) {
                            console.log(response)
                        })
                    }
                    catch(error){
                        console.log(error)
                    }
                    return {...state, player1: {...state.player1, active: [state.player1.hand[index]], hand: state.player1.hand.filter((card, i) => i !== index)}}
                }
                else if(location === "bench") {
                    console.log("makeactivebench")
                    return {...state, player1: {...state.player1, active: [state.player1.bench[index]], bench: state.player1.bench.filter((card, i) => i !== index)}}
                }
                return {...state, player1: {...state.player1, active: [state.player1.bench[index]], bench: state.player1.bench.filter((card, i) => i !== index)}}
            }
            else if(playerId === 2) {
                    if(location === "hand") {
                        console.log("makeactive hand")
                        return {...state, player2: {...state.player2, active: [state.player2.hand[index]], hand: state.player2.hand.filter((card, i) => i !== index)}}
                    }
                    else if(location === "bench") {
                        console.log("makeactive bench")
                        return {...state, player2: {...state.player2, active: [state.player2.bench[index]], bench: state.player2.bench.filter((card, i) => i !== index)}}
                    }
                    return {...state, player2: {...state.player2, active: [state.player2.bench[index]], bench: state.player2.bench.filter((card, i) => i !== index)}}

            }
        });
    },

    attachEnergy: async (playerId, energyIndexInHand, pokemonLocation, pokemonIndexInLocation) => {
        console.log("Here's the attachEnergy function")
        console.log(playerId + " " + energyIndexInHand + " " + pokemonLocation + " " + pokemonIndexInLocation)
        set((state) => {
            if(playerId === 1) {
                if(pokemonLocation === "active") {
                    console.log("attachEnergy active")
                    return {...state, player1: {
                                ...state.player1,
                                active: state.player1.active.map((card, i) =>
                                    i === 0
                                    ? {...card, energies: [...card.energies, state.player1.hand[energyIndexInHand]]}
                                    : card ),
                                    hand: state.player1.hand.filter((card, i) => i !== energyIndexInHand)}}
                }
                else if(pokemonLocation === "bench") {
                    return {...state, player1: {...state.player1, active: [state.player1.bench[pokemonIndexInLocation]], bench: state.player1.bench.filter((card, i) => i !== pokemonIndexInLocation)}}
                }
                return {...state, player1: {...state.player1, active: [state.player1.bench[pokemonIndexInLocation]], bench: state.player1.bench.filter((card, i) => i !== pokemonIndexInLocation)}}
            }
        });
    },

    setText: async (text) => set((state) => ({...state, text})),

    CPUTurn: async (active, bench, attackChosen) => {
        set(state => ({...state, text: "CPU's turn in progress..."}))
        try {
            axios.get(paths.root + '/cpu-turn')
            .then(function(response) {
                console.log(response.data[0])
                console.log(response.data[1])
                console.log(response.data[2])
                set((state) => ({...state, text: `CPU has placed ${response.data[0].name} in the active slot and ${response.data[1].name} in the bench slot. CPU's ${response.data[0].name} used ${response.data[2].name} for ${response.data[2].damage} damage!`}))
                set((state) => ({...state, player2: {...state.player2, active: [state.player2.hand.find(card => card.name === response.data[0].name)], hand: state.player2.hand.filter(card => card.name !== response.data[0].name)}}))
                try {
                    axios.get(paths.root + '/player2-bench')
                    .then(function(response) {
                        set((state) => ({...state, player2: {...state.player2, bench: response.data[1]}}))
                    })
                } catch (error) {
                    console.log(error)
                }
                //set({player1: active.currentHp -= response.data[2].calculatedDamage})
            })
        } catch (error) {
        }
    },
}))

//TODO: API endpoint to return current game state?
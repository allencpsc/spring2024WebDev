import { create } from "zustand";
import axios from "axios";
import { paths } from "../const";

export const useStore = create((set) => ({
    player1: { hand: [], bench: [], active: [], prize: [], discard: [], deck: [] },
    player2: { hand: [], bench: [], active: [], prize: [], discard: [], deck: [] },
    start: async () => {
        try {
            axios.get(paths.root + '/turn-zero/player1')
            .then(function (response) {
            // handle success
                console.log("Here's the start function.")
                console.log(response)
                console.log(response.data)
                set((state) => ({...state, player1: {...state.player1, hand: response.data}}))
            })
            .catch(function (error) {
            // handle error
                console.log(error);
            })
            axios.get(paths.root + '/turn-zero/player2')
            .then(function (response) {
            // handle success
                console.log(response.data)
                set((state) => ({...state, player2: {...state.player2, hand: response.data}}))
            })
            .catch(function (error) {
            // handle error
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
                    return {...state, player1: {...state.player1, active: [state.player1.hand[index]], hand: state.player1.hand.filter((card, i) => i !== index)}}
                    
                }
                else if(location === "bench") {
                    console.log("makeactivebench")
                    return {...state, player1: {...state.player1, active: [state.player1.bench[index]], bench: state.player1.bench.filter((card, i) => i !== index)}}
                }
                return {...state, player1: {...state.player1, active: [state.player1.bench[index]], bench: state.player1.bench.filter((card, i) => i !== index)}}
            }
        });
    }


}));
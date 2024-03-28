import React, {memo, useEffect, useState} from 'react';
import { Card } from './Card';
import  { Bench } from './Bench';
import Active from './Active';
import { Hand } from './Hand';
import { MyButton }  from './MyButton';
import axios from 'axios';
import { paths } from './const.js'
import { create } from "zustand";
import { useStore } from "./resources/store.js";


//add api calls here
export const Container = memo(function Container() {
    const start = useStore((state) => state.start)
    const player1 = useStore((state) => state.player1)
    const player2 = useStore((state) => state.player2)
    const getStartHands = async (e) => {
        e.preventDefault()
        try {
            await start()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    </div>
                    <div className="opponent-hand">
                        <Hand cards={player2.hand} flippedOver={true}/>
                    </div>
                <div className='col'></div>
            </div>
            <div className='row moveUp'>
                <div className='col'>
                    <div id='opponent-prize'></div>
                </div>
                <div className='col-6'>
                    <div className='opponent-bench'>
                        <Bench cards={player2.bench} />
                    </div>
                </div>
                <div className='col'>
                    <div id='opponent-prize'></div>
                </div>
            </div>
            <div className='row actives'>
                <div className='col-4'>
                </div>
                <div className='col-3'>
                    <Active />
                </div>

                <div className='col-3'>
                    <Active />
                    <button onClick={getStartHands}>Start</button>
                </div>
                <div className='col'>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                </div>
                <div className='playerBench'>
                    <Bench cards={player2.bench}/>
                </div>
                <div className='col'>
                </div>
            </div>
            <div className="playerHand">
                <Hand cards={player1.hand}/>
            </div>
            </div>
    )
})

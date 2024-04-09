import React from "react";
import {Outlet} from 'react-router';
import GameBoard from './GameBoard.js';

function App(){
    return (
        <Outlet/>
    )
}

export default App;
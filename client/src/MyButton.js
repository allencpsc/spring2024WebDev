import React from "react";
import { Button } from "react-bootstrap";
import axios from 'axios';
import { paths } from './const.js'
import { useStore } from "./resources/store.js";
const style = {
    color: 'white',
    backgroundColor: '#3f51b5',
    padding: '5px 15px',
    border: '1px white'
}
export const MyButton = (props) => {
    const moveToBench = useStore((state) => state.moveToBench)
    const handleClick = () => {
        if(props.textValue == "Place on Bench"){
            alert("You chose place on bench!")
            console.log(props)
            moveToBench(props.playerID, props.index)
        }
        else if(props.textValue == "Make Active"){
            alert("You chose make active!")
            //console.log(`${props.name}`)
        }
        else{
            alert("I could call the API from here!")
        }
    }
    return (
        <Button className="btn-primary btn" size="lg" variant="primary" onClick={handleClick} style={style}>
            {props.textValue}
        </Button>
    );
}

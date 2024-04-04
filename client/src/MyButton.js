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
    const makeActive = useStore((state) => state.makeActive)
    const benchArr = useStore((state) => state.player1.bench)
    const handleClick = () => {
        if(props.textValue == "Place on Bench"){
            console.log(props)
            moveToBench(props.playerId, props.index)
            axios.post(paths.root + '/place-card', {
                //endpoint needs cardName, location, and what bench slot
                //for pokes, we will jsut push to last slot in the bench
                cardName: props.name,
                location: "Bench",
                benchSlot : benchArr.length

            })
            .then(function (response) {
            // handle success
                console.log("Backend api call successful - place active")
                console.log(response)
                console.log(response.data)
            })
            .catch(function (error) {
            // handle error
                console.log(error);
            })
        }
        else if(props.textValue == "Make Active"){
            makeActive(props.playerId, props.location, props.index)
            //need to eventually change to have playerId tell what endpoint to go to
            axios.post(paths.root + '/turn-zero/player1', {
                command: props.name
            })
            .then(function (response) {
            // handle success
                console.log("Backend api call successful - place active")
                console.log(response)
                console.log(response.data)
            })
            .catch(function (error) {
            // handle error
                console.log(error);
            })
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

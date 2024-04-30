import React from "react";
import { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { useStore } from "../resources/store.js";

const style = {
    position: "fixed",
    zIndex: "2",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
};


export const WinModal = function WinModal({winnerName}) {
  const reset = useStore((state) => state.reset);

  return (
    <div style={style}>
        <div className="WinModal">
            <Container>
            <div className="row"></div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <p className="title text-center">Congratulations {winnerName}! You won!</p>
                </div>
                <div className="col-3"></div>
            <div className="row">

            <div className="col-5"></div>
                <div className="col-3">
                <Button onClick={reset}>Play Again</Button>
                </div>
                <div className="col-5"></div>
            </div>
        </div>
        </Container>
    </div>
    </div>
  );
};

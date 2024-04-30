import { Bench } from "./Bench.js";
import Active from "./Active.js";
import { Hand } from "./Hand.js";
import { useStore, state } from "../resources/store.js";
import { TextBox } from "./TextBox.js";
import { KnockoutCounter } from "./KnockoutCounter.js";
import { Button } from "react-bootstrap";
import Discard from "./Discard.js";
import { Deck } from "./Deck.js";
import { useState } from "react";
import { WinModal } from "./WinModal.js";

export const GameBoard = function GameBoard() {
  const CPUTurn = useStore((state) => state.CPUTurn);
  const firstTurn = useStore((state) => state.firstTurn);
  const player1 = useStore((state) => state.player1);
  const player2 = useStore((state) => state.player2);
  const text = useStore((state) => state.text);
  const introduction = useStore((state) => state.introduction);
  const nextTurn = useStore((state) => state.nextTurn);
  const currentTurn = useStore((state) => state.currentTurn);
  const reset = useStore((state) => state.reset);
  var started = false;
  const winner = useStore((state) => state.winner);
  const winnerName = useStore((state) => state.winnerName);

  const getStartHands = async (e) => {
    e.preventDefault();
    try {
      await firstTurn();
      started = true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    {winner && <WinModal winnerName={winnerName}/>}
    <div className="container-fluid">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="opponentHand">
            <Hand cards={player2.hand} flippedOver={true} playerId={2} />
          </div>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col">
          <div className="player2KOs">
            <KnockoutCounter knockouts={player2.knockouts} />
          </div>
        </div>
        <div className="col-6 g-1">
          <div className="opponent-bench">
            <Bench cards={player2.bench} playerId={2} />
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-1">
          <Discard cards={player2.discard} playerId={2} />
        </div>
        <div className="col-1">
          <Deck cards={player2.deck} playerId={2} />
          </div>
      </div>
      <div className="row actives g-1">
        <div className="col-1"></div>
        <div className="col-2">
          <div className="row">
            <TextBox text={text} />
            <div className="col">
              <Button onClick={getStartHands}>Draw</Button>
              <Button onClick={nextTurn}>
                Next Turn
              </Button>
              <Button onClick={reset}>Reset</Button>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-3">
          <Active pokemon={player2.active} playerId={2} />
        </div>

        <div className="col-3">
          <Active pokemon={player1.active} playerId={1} />
        </div>
        <div className="col-2"></div>
      </div>
      <div className="row g-1">
        <div className="col-1"></div>
        <div className="col-1">
          <Discard cards={player1.discard} playerId={1} />
        </div>
        <div className="col-1">
          <Deck cards={player1.deck} playerId={1} />
        </div>
        <div className="col-6">
          <Bench cards={player1.bench} playerId={1} />
        </div>
        <div className="col-3">
          <div className="player1KOs">
            <KnockoutCounter knockouts={player1.knockouts} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="playerHand">
            <Hand cards={player1.hand} flippedOver={false} playerId={1} />
          </div>
        </div>
        <div className="col">

        </div>
      </div>
    </div>
    </div>
  );
};

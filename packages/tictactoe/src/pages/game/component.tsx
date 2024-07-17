import React from "react";
import xIcon from "../../assets/x.svg";
import oIcon from "../../assets/o.svg";
import { Link } from "react-router-dom";
import type { Icon, FieldIcon } from "./container";
import Modal from "react-modal";

interface Props {
  yourIcon: Icon;
  currentPlayer: Icon;
  yourCount: number;
  cpuCount: number;
  handlePlace: (event: React.MouseEvent<HTMLDivElement>) => void;
  field: FieldIcon[][];
  isGameOver: boolean;
  isDraw: boolean;
}

const modalStyles = {
  content: {
    top: "50%",
    bottom: "auto",
    transform: "translate(0%, -50%)",
    opacity: 0.7,
    backgroundColor: "#ffffff",
  },
};

export const Component: React.FC<Props> = (props) => {
  const {
    yourIcon,
    currentPlayer,
    yourCount,
    cpuCount,
    handlePlace,
    field,
    isGameOver,
    isDraw,
  } = props;

  return (
    <>
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-row justify-between items-center py-8 px-2 w-full">
          <div className="flex flex-row">
            <img
              src={xIcon}
              alt="x"
              className="w-[min(12vw, 64px)]"
              width="64"
            />
            <img
              src={oIcon}
              alt="o"
              className="w-[min(12vw, 64px)]"
              width="64"
            />
          </div>
          <div className="flex flex-row justify-center p-4 w-48 rounded-lg bg-slate-100">
            <img
              src={currentPlayer === "X" ? xIcon : oIcon}
              width="32"
              alt="currentPlayer"
            />
            TURN
          </div>
        </div>
        <div
          className="grid gap-2 rounded-lg p-[min(2vw, 0.5rem)] bg-slate-100"
          style={{
            gridTemplateColumns: "repeat(3, min(25vw, 150px))",
          }}
        >
          {field.map((row, y) => {
            return row.map((cell, x) => {
              return (
                <div
                  className={`relative h-0 bg-white ${yourIcon === "X" ? "hover:bg-cyan-100" : "hover:bg-yellow-100"}`}
                  style={{ paddingBottom: "100%" }}
                  key={y * 3 + x}
                >
                  <div
                    className="absolute inset-0 m-auto w-full h-full handlePlace"
                    data-x={x}
                    data-y={y}
                    onClick={
                      currentPlayer !== yourIcon || isGameOver
                        ? undefined
                        : (event) => handlePlace(event)
                    }
                  >
                    {cell === "X" ? (
                      <img
                        src={xIcon}
                        alt="x"
                        className="absolute w-[16vw] max-w-24"
                        style={{
                          top: "30%",
                          left: "20%",
                          pointerEvents: "none",
                        }}
                      />
                    ) : cell === "O" ? (
                      <img
                        src={oIcon}
                        alt="o"
                        className="absolute w-[16vw] max-w-24"
                        style={{
                          top: "30%",
                          left: "20%",
                          pointerEvents: "none",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            });
          })}
        </div>
        <div className="flex flex-row gap-4 p-4 w-full text-center">
          <div className="p-4 w-full bg-lime-200 rounded-lg grow">
            {yourIcon === "X" ? (
              <>
                <p>X (YOU)</p>
                <p>{yourCount}</p>
              </>
            ) : (
              <>
                <p>X (CPU)</p>
                <p>{cpuCount}</p>
              </>
            )}
          </div>
          <div className="p-4 w-full bg-orange-200 rounded-lg grow">
            {yourIcon === "O" ? (
              <>
                <p>O (YOU)</p>
                <p>{yourCount}</p>
              </>
            ) : (
              <>
                <p>O (CPU)</p>
                <p>{cpuCount}</p>
              </>
            )}
          </div>
        </div>
        <Link
          className="py-2 m-4 w-full text-center rounded-3xl bg-slate-300 hover:bg-slate-400"
          to={"/new_game"}
        >
          Reset Game
        </Link>
      </div>
      <Modal isOpen={isGameOver} contentLabel="GameOver" style={modalStyles}>
        <div className="p-[4vw]">
          {isDraw ? (
            <>
              <p className={`m-2 text-center`}>NOBODY WINS</p>
              <div className="flex flex-row justify-center items-center m-6 mb-10 text-[max(6xl, 16)]">
                <span>THIS GAME IS A TIE</span>
              </div>
            </>
          ) : (
            <>
              <p className={`m-2 text-center`}>
                {currentPlayer === yourIcon ? "YOU" : "CPU"} WON!
              </p>
              <div className="flex flex-row justify-center items-center text-[4vw] my-[2vh]">
                <img
                  src={currentPlayer === "X" ? xIcon : oIcon}
                  width="128"
                  alt="currentPlayer"
                  className="mt-[2vw] w-[8vw] max-w-[128px]"
                />
                <span
                  className={
                    yourIcon === "X" ? "text-cyan-400" : "text-yellow-400"
                  }
                >
                  WON THIS ROUND
                </span>
              </div>
            </>
          )}

          <div className="text-center m-[2vw]">
            <Link
              className="py-2 mr-2 text-center rounded-3xl my-[4vh] px-[4vw] bg-slate-300 hover:bg-slate-400"
              to={"/"}
            >
              Quit
            </Link>
            <Link
              className="py-2 text-center bg-cyan-300 rounded-3xl hover:bg-cyan-400 my-[4vh] px-[4vw]"
              to={"/new_game"}
            >
              New Game
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

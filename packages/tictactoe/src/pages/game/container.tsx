import React, { useState, useEffect } from "react";
import { Component } from "./component";
import { useSearchParams } from "react-router-dom";
import xIcon from "../../assets/x.svg";
import oIcon from "../../assets/o.svg";

export type Icon = "X" | "O";
export type FieldIcon = Icon | null;

export const Container: React.FC = () => {
  const [searchParams] = useSearchParams();
  const player = searchParams.get("player") as Icon;
  const [currentPlayer, setCurrentPlayer] = useState<Icon>(player);
  const fieldSize = 3;
  const [field, setField] = useState<FieldIcon[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [yourCount, setYourCount] = useState<number>(0);
  const [cpuCount, setCpuCount] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  useEffect(() => {
    const result = calcIsGameOver();
    if (result.isGameOver) {
      setIsGameOver(true);
      if (result.isDraw) {
        setIsDraw(true);
      }
    } else {
      if (yourCount !== 0) {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  }, [yourCount, cpuCount]);

  useEffect(() => {
    if (currentPlayer !== player) {
      setTimeout(() => {
        cpuTurn();
      }, 1000);
    }
  }, [currentPlayer]);

  const handlePlace = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const x = target.dataset.x;
    const y = target.dataset.y;
    if (field[Number(y)][Number(x)] !== null) {
      return;
    }

    const newField = field.map((row, fieldY) => {
      return row.map((val, fieldX) => {
        if (fieldY === Number(y) && fieldX === Number(x) && val === null) {
          return currentPlayer;
        } else {
          return val;
        }
      });
    });
    console.log(newField);
    setField(newField);

    setYourCount(currentPlayer === player ? yourCount + 1 : yourCount);
    setCpuCount(currentPlayer !== player ? cpuCount + 1 : cpuCount);
  };

  const cpuTurn = () => {
    let randX = 0;
    let randY = 0;
    while (true) {
      randX = Math.floor(Math.random() * fieldSize);
      randY = Math.floor(Math.random() * fieldSize);
      if (field[randY][randX] === null) {
        break;
      }
    }

    const newField = field.map((row, fieldY) => {
      return row.map((val, fieldX) => {
        if (fieldY === randY && fieldX === randX && val === null) {
          return currentPlayer;
        } else {
          return val;
        }
      });
    });
    setField(newField);

    setYourCount(currentPlayer === player ? yourCount + 1 : yourCount);
    setCpuCount(currentPlayer !== player ? cpuCount + 1 : cpuCount);
  };

  const calcIsGameOver = (): {
    isGameOver: boolean;
    coordinate: number[][] | null;
    isDraw: boolean;
  } => {
    // 横に揃っている場合
    for (let i = 0; i < field.length; i++) {
      const row = field[i];
      if (row.every((val) => val === row[0] && val != null)) {
        return {
          isGameOver: true,
          coordinate: [
            [0, i],
            [1, i],
            [2, i],
          ],
          isDraw: false,
        };
      }
    }

    // 縦に揃っている場合
    for (let i = 0; i < fieldSize; i++) {
      if (field.every((row) => row[i] === field[0][i] && row[i] != null)) {
        return {
          isGameOver: true,
          coordinate: [
            [i, 0],
            [i, 1],
            [i, 2],
          ],
          isDraw: false,
        };
      }
    }

    // 斜め（右下がり）になっている場合
    if (
      [...Array(fieldSize)].every(
        (_, i) => field[i][i] === field[0][0] && field[0][0] != null,
      )
    ) {
      return {
        isGameOver: true,
        coordinate: [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
        isDraw: false,
      };
    }

    // 斜め（右上がり）になっている場合
    if (
      [...Array(fieldSize)].every(
        (_, i) =>
          field[i][fieldSize - i - 1] === field[0][fieldSize - 1] &&
          field[0][fieldSize - 1] != null,
      )
    ) {
      return {
        isGameOver: true,
        coordinate: [
          [2, 0],
          [1, 1],
          [0, 2],
        ],
        isDraw: false,
      };
    }

    // 引き分けの場合
    if (field.every((row) => row.every((val) => val != null))) {
      return {
        isGameOver: true,
        coordinate: null,
        isDraw: true,
      };
    }

    return {
      isGameOver: false,
      coordinate: null,
      isDraw: false,
    };
  };

  return (
    <Component
      yourIcon={player}
      currentPlayer={currentPlayer}
      yourCount={yourCount}
      cpuCount={cpuCount}
      handlePlace={handlePlace}
      field={field}
      isGameOver={isGameOver}
      isDraw={isDraw}
    />
  );
};

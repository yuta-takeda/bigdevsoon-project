import React, { useState } from "react";
import { Component } from "./component";

type Icon = "X" | "O";

export const Container: React.FC = () => {
  const [userIcon, setUserIcon] = useState<Icon>("X");

  const handleSetUserIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIcon(event.target.value as Icon);
  };

  return (
    <Component userIcon={userIcon} handleSetUserIcon={handleSetUserIcon} />
  );
};

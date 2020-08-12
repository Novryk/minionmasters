import * as classnames from "classnames";
import GameStyleInput from "page/carddeck/savedeck/inputs/game-style-input";
import GameTypeInput from "page/carddeck/savedeck/inputs/game-type-input";
import GameTypeSecondaryInput from "page/carddeck/savedeck/inputs/game-type-secondary-input";
import GameTypeThirdInput from "page/carddeck/savedeck/inputs/game-type-third-input";
import SaveDbButton from "page/carddeck/savedeck/save-db-button";
import React, { useState } from "react";
import css from "./save-deck-form.module.scss";

export default function SaveDeckForm({ relevantCards, selectedHero }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gameType, setGameType] = useState("");
  const [gameTypeSecondary, setGameTypeSecondary] = useState("");
  const [gameTypeThird, setGameTypeThird] = useState("");

  const [playStyle, setPlayStyle] = useState("");

  return (
    <div>
      <div className={css.formLayout}>
        <div className={css.inputGroupStyle}>
          <label htmlFor="name">Deckname</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <GameStyleInput playStyle={playStyle} setPlayStyle={setPlayStyle} />
        </div>

        <div className={css.inputGroupStyle}>
          <GameTypeInput
            gameType={gameType}
            setGameType={setGameType}
            setGameTypeSecondary={setGameTypeSecondary}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <GameTypeSecondaryInput
            gameTypeSecondary={gameTypeSecondary}
            setGameTypeSecondary={setGameTypeSecondary}
            gameType={gameType}
          />
        </div>

        <div className={css.inputGroupStyle}>
          <GameTypeThirdInput
            gameType={gameType}
            gameTypeThird={gameTypeThird}
            setGameTypeThird={setGameTypeThird}
          />
        </div>

        <div className={classnames(css.descriptionTextArea, css.inputGroupStyle)}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.currentTarget.value)}
            value={description}
            rows={3}
          />
        </div>
      </div>

      <SaveDbButton
        relevantCards={relevantCards}
        selectedHero={selectedHero}
        name={name}
        description={description}
        gameType={gameType}
        gameTypeSecondary={gameTypeSecondary}
        gameTypeThird={gameTypeThird}
        playStyle={playStyle}
      />
    </div>
  );
}

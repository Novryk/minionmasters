import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginRequired from "components/login-required";
import { useGaTrackView } from "consent-banner";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/carddeck/DeckContainer";
import SaveDeckPrimaryValidationAndForm from "page/carddeck/savedeck/save-deck-content";
import React from "react";

import AnalyzeDeck from "./analyze-deck";

export default function SaveDeckContainer({ lastSelectedCards, selectedHero }) {
  useGaTrackView("/SaveDeckContainer");
  const relevantCards = lastSelectedCards
    .filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT)
    .map(({ card }) => card);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "}Features under construction
      </div>
      <LoginRequired />
      <h3>Save deck for public share</h3>
      <div>
        Visible on "Decks". Alternatively, you can also "Export" built deck by a link without
        saving.
      </div>
      <AnalyzeDeck relevantCards={relevantCards} selectedHero={selectedHero} />
      <SaveDeckPrimaryValidationAndForm relevantCards={relevantCards} selectedHero={selectedHero} />
    </div>
  );
}

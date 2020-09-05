import { INITIAL_MASTER_SELECTED } from "page/deck-manager/build/masters/mastersMapping";
import { Deck } from "page/deck-manager/deck/deck";
import { ImportFromUrl } from "page/deck-manager/deck/import-from-url";
import { useLastSelectedCards } from "page/deck-manager/deck/useLastSelectedCards";
import AnalyzeDeck from "page/deck-manager/savedeck/analyze-deck";

import React, { useState } from "react";

import css from "./app-preview.module.scss";

export default function AppPreview() {
  const [selectedMaster, setSelectedMaster] = useState(INITIAL_MASTER_SELECTED);
  const [lastSelectedCards, setLastSelectedCards] = useLastSelectedCards();

  return (
    <div className={css.container}>
      <ImportFromUrl
        setLastSelectedCards={setLastSelectedCards}
        setSelectedMaster={setSelectedMaster}
      />

      <Deck
        setLastSelectedCards={setLastSelectedCards}
        selectedMaster={selectedMaster}
        setSelectedMaster={setSelectedMaster}
        lastSelectedCards={lastSelectedCards}
      />

      <AnalyzeDeck selectedMaster={selectedMaster} lastSelectedCards={lastSelectedCards} />
    </div>
  );
}

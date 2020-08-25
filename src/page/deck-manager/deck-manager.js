import * as classnames from "classnames";
import { matchSelectedTabOutOfPath } from "components/helper";
import { useGaTrackView } from "footer/consent-cookie-banner";
import { ROUTE_PATH_DECKMANAGER_BUILD } from "page/deck-manager/build/build-config";
import FiltersWithCards from "page/deck-manager/build/filters-with-cards";

import AddMasterToDeckOrOpenDetailsActionOverlay from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay";
import Masters from "page/deck-manager/build/masters/masters";
import {
  ROUTE_PATH_DECKMANAGER_EXPORT,
  ROUTE_PATH_DECKMANAGER_IMPORT,
} from "page/deck-manager/deck-manager-config";
import ImportFromGame from "page/deck-manager/deck/carddeckimport/import-from-game";
import CardForDeckActionOverlay from "page/deck-manager/deck/cardfordeck-actionoverlay";
import { Deck } from "page/deck-manager/deck/deck";

import { HowToUse } from "page/deck-manager/deck/how-to-use";
import { ImportFromUrl } from "page/deck-manager/deck/import-from-url";
import AnalyzeDeck from "page/deck-manager/savedeck/analyze-deck";
import css from "page/deck-manager/savedeck/deck-manager.module.scss";
import SaveDeckContainer from "page/deck-manager/savedeck/save-deck-container";
import { ROUTE_PATH_DECKMANAGER_SAVE } from "page/deck-manager/savedeck/savedeck-config";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";

const DeckOptionsStyle = styled.div``;

const MastersMemo = ({ setSelectedMaster }) => {
  return useMemo(() => {
    const mastersActionWrapper = (selectedMasterKey) => (
      <AddMasterToDeckOrOpenDetailsActionOverlay
        masterKey={selectedMasterKey}
        setSelectedMaster={setSelectedMaster}
      />
    );

    return <Masters actionRegistrationComponent={mastersActionWrapper} />;
  }, []);
};

export const DEFAULT_SELECTED_TAB = 0;

export const Slots = [...Array(10).keys()];

export const findFirstNextFreeSlot = (lastSelectedCards) =>
  Slots.find(
    (slotPosition) => lastSelectedCards[slotPosition].card.iD === IDENTIFIER_FOR_EMPTY_SLOT
  );

export default function DeckManager({
  lastSelectedCards,
  setLastSelectedCards,
  selectedMaster,
  setSelectedMaster,
}) {
  useGaTrackView("/DeckContainer");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);

  const PAGE_TABS_CONFIG = [
    ROUTE_PATH_DECKMANAGER_BUILD,
    ROUTE_PATH_DECKMANAGER_SAVE,
    ROUTE_PATH_DECKMANAGER_IMPORT,
    ROUTE_PATH_DECKMANAGER_EXPORT,
  ];

  const location = useLocation();
  useEffect(() => {
    setSelectedTabIndex(matchSelectedTabOutOfPath(PAGE_TABS_CONFIG));
  }, [location.pathname]);

  return (
    <div>
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

      {lastSelectedCards.some(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT) && (
        <AnalyzeDeck lastSelectedCards={lastSelectedCards} selectedMaster={selectedMaster} />
      )}

      <Tabs
        forceRenderTabPanel
        selectedIndex={selectedTabIndex}
        onSelect={(tabIndex) => {
          //setSelectedTabIndex(tabIndex)
        }}
      >
        <TabList>
          <Link to={ROUTE_PATH_DECKMANAGER_BUILD}>
            <Tab>Build</Tab>
          </Link>
          <Link to={ROUTE_PATH_DECKMANAGER_SAVE}>
            <Tab
              className={classnames(
                "react-tabs__tab",
                lastSelectedCards.every(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT) &&
                  css.block
              )}
            >
              Save
            </Tab>
          </Link>
          <Link to={ROUTE_PATH_DECKMANAGER_IMPORT}>
            <Tab>Import</Tab>
          </Link>
        </TabList>
        <TabPanel>
          <HowToUse />
          <MastersMemo setSelectedMaster={setSelectedMaster} />
          <FiltersWithCards
            cardActionWrapper={(card) => (
              <CardForDeckActionOverlay card={card} setLastSelectedCards={setLastSelectedCards} />
            )}
          />
        </TabPanel>
        <TabPanel>
          <SaveDeckContainer
            lastSelectedCards={lastSelectedCards}
            selectedMaster={selectedMaster}
          />
        </TabPanel>

        <TabPanel>
          <DeckOptionsStyle>
            <ImportFromGame
              setShowDeck={true}
              setLastSelectedCards={setLastSelectedCards}
              setSelectedMaster={setSelectedMaster}
            />
          </DeckOptionsStyle>
        </TabPanel>
      </Tabs>
    </div>
  );
}

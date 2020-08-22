import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { matchSelectedTabOutOfPath, useCurrentUser } from "components/helper";
import { useGaTrackView } from "footer/consent-cookie-banner";
import cardData from "generated/jobCardProps.json";
import orderBy from "lodash/orderBy";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import { DEFAULT_SELECTED_TAB } from "page/deck-manager/deck-manager";
import DecklistFilters from "page/deck-manager/deck/decks/decklist-filters";
import { ROUTE_PATH_DECKS } from "page/deck-manager/deck/decks/decks-config";

import css from "page/deck-manager/deck/decks/decks.module.scss";
import { SavedDeck } from "page/deck-manager/deck/decks/saved-deck";
import { ROUTE_PATH_YOUR_DECKS } from "page/deck-manager/deck/decks/your-saved-decks-config";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAsyncEffect from "use-async-effect";

export default function Decks({ setSelectedMaster, setLastSelectedCards }) {
  useGaTrackView("/ListOfDecks");
  const [selectedTabIndex, setSelectedTabIndex] = useState(DEFAULT_SELECTED_TAB);

  const [decks, setDecks] = useState([]);
  const [gameTypeFilter, setGameTypeFilter] = useState("");
  const [gameTypeSecondaryFilter, setGameTypeSecondaryFilter] = useState("");
  const [gameTypeThirdFilter, setGameTypeThirdFilter] = useState("");

  const [masterFilter, setMasterFilter] = useState("");

  const [availableCards, setAvailableCards] = useState("");
  const [isToggleAvailableCards, setIsToggleAvailableCards] = useState(false);

  const currentUser = useCurrentUser();

  const PAGE_TABS_CONFIG = [ROUTE_PATH_DECKS, ROUTE_PATH_YOUR_DECKS];

  const location = useLocation();
  useEffect(() => {
    setSelectedTabIndex(matchSelectedTabOutOfPath(PAGE_TABS_CONFIG));
  }, [location.pathname]);

  useAsyncEffect(
    (isMounted) => {
      if (!PAGE_TABS_CONFIG.includes(location.pathname)) return;

      console.debug("fetched decks");

      db.collection("decks")
        .orderBy("createdAt", "desc")
        .get()
        .then((documentSnapshots) => {
          if (!isMounted()) return;

          const dbDecks = documentSnapshots.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const normalizedDecks = dbDecks.map((deck) => {
            const mappedCardData = deck.cards.map(({ card: { iD: iDFromDb }, count }) => {
              return {
                card: cardData.find(({ iD }) => iD === iDFromDb),
                count,
              };
            });
            return {
              dbid: deck.id,
              deckname: deck.deckname,
              cards: mappedCardData,
              createdAt: deck.createdAt.toDate(),
              createdAtVersion: deck.createdAtVersion,
              createdByDisplayName: deck.createdByDisplayName,
              createdByUid: deck.createdByUid,
              gameType: deck.gameType,
              master: deck.master,
              description: deck.description,
              gameTypeSecondary: deck.gameTypeSecondary,
              gameTypeThird: deck.gameTypeThird,
              youtubeLink: deck.youtubeLink,
              redditLink: deck.redditLink,
            };
          });
          setDecks(normalizedDecks);
        })
        .catch(dbErrorHandlerPromise);
    },
    [location.pathname]
  );

  const decksWithGameType = !gameTypeFilter
    ? decks
    : decks.filter(({ gameType }) => gameType === gameTypeFilter);

  const decksWithGameTypeSecondary = !gameTypeSecondaryFilter
    ? decksWithGameType
    : decksWithGameType.filter(
        ({ gameTypeSecondary }) => gameTypeSecondary === gameTypeSecondaryFilter
      );

  const decksWithGameTypeThird = !gameTypeThirdFilter
    ? decksWithGameTypeSecondary
    : decksWithGameTypeSecondary.filter(
        ({ gameTypeThird }) => gameTypeThird === gameTypeThirdFilter
      );

  const decksWithMaster = !masterFilter
    ? decksWithGameTypeThird
    : decksWithGameTypeThird.filter(({ master }) => master === masterFilter);
  // SORT BY VERSION DESC

  const decksWithAvailableCards = !availableCards
    ? decksWithMaster
    : decksWithMaster.filter(({ cards }) =>
        cards.every(({ iD }) =>
          isToggleAvailableCards ? !availableCards.includes(iD) : availableCards.includes(iD)
        )
      );

  const isYourDecksSelected = selectedTabIndex === 1 && currentUser;
  const decksWithYoursFilter = !isYourDecksSelected
    ? decksWithAvailableCards
    : decksWithAvailableCards.filter(({ createdByUid }) => createdByUid === currentUser.uid);

  const sortedByDateCards = orderBy(
    decksWithYoursFilter,
    ({ createdAt }) => createdAt.getTime(),
    "desc"
  );

  return (
    <div className={css.pageContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: "15px",
        }}
      >
        <div>
          <FontAwesomeIcon
            icon={faTools}
            size="2x"
            color="yellow"
            style={{ paddingRight: "10px" }}
          />
          {"  "}Features under construction. Ready in some days. Ideas to share? - contact me! Sorry
          that I had to delete some decks.
        </div>
      </div>

      <Tabs selectedIndex={selectedTabIndex} onSelect={(tabIndex) => {}}>
        <TabList>
          <Link to={ROUTE_PATH_DECKS}>
            <Tab>All Decks</Tab>
          </Link>
          {currentUser && (
            <Link to={ROUTE_PATH_YOUR_DECKS}>
              <Tab>Your Decks</Tab>
            </Link>
          )}
        </TabList>
        <TabPanel></TabPanel>
        {currentUser && <TabPanel></TabPanel>}
      </Tabs>
      <DecklistFilters
        gameType={gameTypeFilter}
        setGameType={setGameTypeFilter}
        gameTypeSecondary={gameTypeSecondaryFilter}
        setGameTypeSecondary={setGameTypeSecondaryFilter}
        gameTypeThird={gameTypeThirdFilter}
        setGameTypeThird={setGameTypeThirdFilter}
        masterFiltr={masterFilter}
        setMasterFilter={setMasterFilter}
        availableCards={availableCards}
        setAvailableCards={setAvailableCards}
        isToggleAvailableCards={isToggleAvailableCards}
        setIsToggleAvailableCards={setIsToggleAvailableCards}
      />
      {sortedByDateCards.map((deck) => (
        <SavedDeck
          deck={deck}
          key={deck.dbid}
          setSelectedMaster={setSelectedMaster}
          setLastSelectedCards={setLastSelectedCards}
        />
      ))}
    </div>
  );
}

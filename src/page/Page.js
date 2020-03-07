import React, {useEffect, useRef, useState} from "react";
import cardData from "../generated/jobCardProps";
import CardDeckContainer from "./carddeck/DeckContainer";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Masters from "./mastersoverview/Masters";
import FiltersWithCards from "./FiltersWithCards";
import CardActionAddCardToDeck from "./CardActionAddCardToDeck";
import {toast} from "react-toastify";

const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};


const useTraceableState = initialValue => {
    const [value, setValue] = useState(initialValue);
    const prevValue = usePreviousValue(value);
    return [prevValue, value, setValue];
};


export function Page() {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [selectedHero, setSelectedHero] = useState("");

    const [, selectedCardEvent, setSelectedCardEvent] = useTraceableState({
        eventId: 0,
        card: {
            pageId: 0
        }
    });

    // Morellia: S.T.INT, Healing Fireball, Chain Lightning, Drone Buzzers, Lightning Bolt, Morgrul the Swarmer King, Whirly Scrat, Annihilator, Scrat Launcher, Shen Stormstrike
    return <div style={{padding: "5px"}}>

        <CardDeckContainer allCardsData={cardData}
                           selectedHero={selectedHero}
                           setSelectedHero={setSelectedHero}
                           selectedCardEvent={selectedCardEvent}
                           setSelectedCardEvent={setSelectedCardEvent}
                           setSelectedTabIndex={setSelectedTabIndex}

        />

        <Tabs style={{paddingTop: "20px"}} selectedIndex={selectedTabIndex}
              onSelect={tabIndex => setSelectedTabIndex(tabIndex)}>
            <TabList>
                <Tab>Cards</Tab>
                <Tab>Masters</Tab>
            </TabList>
            <TabPanel>
                <FiltersWithCards cardActionWrapper={(card) =>
                    <CardActionAddCardToDeck
                        onClick={() => {
                            setSelectedCardEvent({
                                eventId: Math.random(),
                                card: {
                                    pageId: card.pageId
                                }
                            });
                            toast("Card added to Deck");
                        }}
                        card={card}
                    />}/>
            </TabPanel>
            <TabPanel>
                <Masters setSelectedHero={setSelectedHero}/>
            </TabPanel>
        </Tabs>

    </div>;
}
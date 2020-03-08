import {Filters} from "./filters/Filters";
import Cards from "./Cards";
import React, {useCallback, useState} from "react";
import cardData from "../generated/jobCardProps";
import orderBy from "lodash/orderBy";
import {factionMapping} from "../faction/Factions";
import {MANACOST} from "../manacost/manacost";
import {rarityMapping} from "../rarity/rarityMapping";
import {typeMapping} from "../cardtype/typeMapping";
import {targetsMapping} from "../attack/targetsMapping";


export default function FiltersWithCards({cardActionWrapper}) {

    function setAllFilterStates(isActive) {
        const setFilterState = (key) => {
            return {
                btnkey: key,
                isActive: isActive
            };
        };
        return {
            name: "",
            faction: Object.keys(factionMapping).map(setFilterState),
            manacost: MANACOST.map(setFilterState),
            rarity: Object.keys(rarityMapping).map(setFilterState),
            type: Object.keys(typeMapping).map(setFilterState),
            targets: Object.keys(targetsMapping).map(setFilterState)
        };
    }


    const [isShowNames, setIsShowNames] = useState(false);
    const [sortByMana, setSortByMana] = useState("asc");

    const [filters, setFilters] = useState(setAllFilterStates(false));
    const setFiltersMemoized = useCallback((filtrs) => setFilters(filtrs), []);

    const filteredNonAbilityCards = cardData.filter(({catagory}) => catagory !== "AbilityCard");

    const filteredCardsDataFaction = filters.faction.every(({isActive}) => !isActive) ? filteredNonAbilityCards : filteredNonAbilityCards.filter(({faction}) => filters.faction.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(faction));
    const filteredCardsDataWithManacost = filters.manacost.every(({isActive}) => !isActive) ? filteredCardsDataFaction : filteredCardsDataFaction.filter(({manacost}) => filters.manacost.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(parseInt(manacost)));
    const filteredCardsDataWithRarity = filters.rarity.every(({isActive}) => !isActive) ? filteredCardsDataWithManacost.filter(({rarity}) => rarity !== 'Perk') : filteredCardsDataWithManacost.filter(({rarity}) => filters.rarity.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(rarity));
    const filteredCardsDataWithType = filters.type.every(({isActive}) => !isActive) ? filteredCardsDataWithRarity : filteredCardsDataWithRarity.filter(({type}) => filters.type.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(type));
    const filteredCardsDataWithName = filters.name === "" ? filteredCardsDataWithType : filteredCardsDataWithType.filter(({name}) => name.toLowerCase().startsWith(filters.name.toLowerCase()));
    const filteredCardsDataWithTargets = filters.targets.every(({isActive}) => !isActive) ? filteredCardsDataWithName : filteredCardsDataWithName.filter(({targets}) => filters.targets.filter(({isActive}) => isActive).map(({btnkey}) => btnkey).includes(targets));
    const sortedByManaCards = orderBy(filteredCardsDataWithTargets, ({manacost}) => parseInt(manacost), sortByMana);


    return <div>
        <Filters setFilters={setFiltersMemoized}
                 filters={filters}
                 isShowNames={isShowNames}
                 setIsShowNames={setIsShowNames}
                 setSortByMana={setSortByMana}
                 sortByMana={sortByMana}
        />

        <Cards cards={sortedByManaCards}
               isShowNames={isShowNames}
               cardActionWrapper={cardActionWrapper}
        />
    </div>;
}
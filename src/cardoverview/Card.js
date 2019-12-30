import React, {useState} from "react";
import styled from "styled-components";
import ReactModal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import VoidBourneIcon from "../faction/VoidbourneIcon";
import ScratIcon from "../faction/ScratIcon";
import {faGavel} from "@fortawesome/free-solid-svg-icons/faGavel";
import {faYinYang} from "@fortawesome/free-solid-svg-icons/faYinYang";
import OutlanderIcon from "../faction/OutladerIcon";
import SlitherIcon from "../faction/SlitherIcon";
import EmpyrianIcon from "../faction/EmpyrianIcon";
import {faHatWizard} from "@fortawesome/free-solid-svg-icons/faHatWizard";
import CrystalElfIcon from "../faction/CrystalElfIcon";
import AccursedIcon from "../faction/AccursedIcon";
import {rarityMapping} from "../rarity/rarityMapping";
import {AttackTypeOverlay} from "./AttackTypeOverlay";
import {typeMapping} from "../cardtype/typeMapping";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";

const CardContainerStyle = styled.div`
    width: 100px;
    margin-right: 1px;
    margin-top: 2px;
    border-color: black;
    border-width: 1px;
    opacity: ${({focused}) => focused ? 0.4 : 1.0};
    border-style: ${({focused}) => focused ? "dotted" : "solid"};
`;

const CardContentStyle = styled.div`
    position: relative;
    &:hover {

    }
`;

const CardImageStyle = styled.img`
    width: 100%;   
`;

const ManacostStyle = styled.samp`
    position: absolute;
    top: -4px;
    right: 1px;
    font-weight: bold;   
`;
const RightCornerStyle = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;   
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-top: 30px solid ${({rarity}) => rarityMapping[rarity]};
`;

const GroundAirStyle = styled.div`
    position: absolute;
    top: -5px;
    left: 1px;   
     & > svg {
        fill: #FFFFFF;     
        color: #FFFFFF;
    }
`;

const TopLeftCornerStyle = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;   
    width: 0;
    height: 0;
    border-right: 30px solid transparent;
    border-top: 30px solid rgba(0,0,0, 0.5);
`;

const factionMapping = {
    Voidborne: <VoidBourneIcon/>,
    Accursed: <AccursedIcon/>,
    Scrat: <ScratIcon/>,
    "Crystal Elf": <CrystalElfIcon/>,
    "Puff": <FontAwesomeIcon icon={faHatWizard} size={"xs"}/>,
    "Zen-Chi": <FontAwesomeIcon icon={faYinYang} size={"xs"}/>,
    "Slither": <SlitherIcon/>,
    "Outlander": <OutlanderIcon/>,
    "Empyrean": <EmpyrianIcon/>,
    "Stoutheart": <FontAwesomeIcon icon={faGavel} size={"xs"}/>
};
const FactionStyle = styled.div`
    position: absolute;
    bottom: -4px;
    left: 0px;
    
    & > svg {
        fill: #FFFFFF;     
        color: #FFFFFF;
    }
`;
const BottomLeftCornerStyle = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;   
    width: 0;
    height: 0;
    border-right: 30px solid transparent;
    border-bottom: 30px solid rgba(0,0,0, 0.5);
`;

const OverlayActionBackground = styled.div`
    background-color: rgba(0,0,0, 0.5);
    border: 1px dotted rgba(0,0,0, 0.5);
`;

const InfoDetailsOverlay = styled.div`
    position: absolute;
    top: 35px;
    right: 0px;
    padding: 15px 0 15px 15px;
    &:hover{
      cursor: pointer;
    }
`;
const InfoDetailsIconStyle = styled(OverlayActionBackground)`
  padding-right: 2px;
`;


const AddCardToDeckOverlay = styled.div`
    position: absolute;
    top: 35px;
    left: 0px;
    padding: 15px 15px 15px 0;    
    &:hover{
      cursor: pointer;
    }
`;
const AddToDeckIconStyle = styled(OverlayActionBackground)`
  padding-left: 2px;
`;

export function Card({card: {pageId, image, manacost, description, name, rarity, type, faction, targets}, onClick}) {
    const [focused, setFocused] = useState(false);

    const imageNormalized = image.charAt(0).toUpperCase() + image.slice(1);

    return <>
        <ReactModal
            isOpen={
                focused
            }
            onRequestClose={() => setFocused(false)}
        >
            <div>
                <h2>
                    {name}
                </h2>
                <ul>
                    <li>
                        <img src="minion.jpg" alt="minion"/>
                    </li>
                    <li>
                        PageId: {pageId}
                    </li>
                    <li>
                        rarity: {rarity}
                    </li>
                    <li>
                        {description}
                    </li>
                    <li>
                        Manacost: {manacost}
                    </li>
                </ul>
            </div>
        </ReactModal>

        <CardContainerStyle onClick={onClick}
        >
            <CardContentStyle>
                <CardImageStyle src={`img/${imageNormalized}`} alt={image}/>
                <RightCornerStyle rarity={rarity}/>
                <ManacostStyle>{manacost}</ManacostStyle>

                <TopLeftCornerStyle/>
                <GroundAirStyle><FontAwesomeIcon icon={typeMapping[type]} size={"xs"}/></GroundAirStyle>

                <BottomLeftCornerStyle/>
                <FactionStyle>{factionMapping[faction]}</FactionStyle>

                <AttackTypeOverlay targets={targets}/>


                <AddCardToDeckOverlay>
                    <InfoDetailsIconStyle>
                        <FontAwesomeIcon icon={faPlusCircle} inverse={true}/>
                    </InfoDetailsIconStyle>
                </AddCardToDeckOverlay>
                <InfoDetailsOverlay onClick={(event) => {
                    setFocused(true);
                    event.stopPropagation();
                }}>
                    <AddToDeckIconStyle>
                        <FontAwesomeIcon icon={faInfoCircle} inverse={true}/>
                    </AddToDeckIconStyle>
                </InfoDetailsOverlay>
            </CardContentStyle>


        </CardContainerStyle>
    </>
        ;
}
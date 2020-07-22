import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import _dropRight from "lodash.dropright";
import sortBy from "lodash.sortby";
import CardDiscussion from "page/discussion/CardDiscussion";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

import styled from "styled-components";
import { targetsMapping } from "../attack/targetsMapping";
import { typeMapping } from "../cardtype/typeMapping";
import { factionMapping } from "../faction/Factions";
import cardData from "../generated/jobCardProps";
import { rarityMapping } from "../rarity/rarityMapping";

const ModalContainerStyle = styled.div`
  position: relative;
`;

const ModalAlignCloseStyle = styled.div`
  position: absolute;
  right: 30px;
  top: -2px;
`;

const ModalCloseStyle = styled.div`
  position: fixed;

  & > svg {
    &:hover {
      color: #a0a0a0;
      filter: drop-shadow(1px 1px 1px #a0a0a0);
      cursor: pointer;
    }
  }
`;

const CardHeaderStyle = styled.h2`
  margin-top: 0;
`;

const CardPropertyUlStyle = styled.div`
  padding-top: 30px;

  display: grid;
  grid-auto-flow: column;
  grid-row-gap: 25px;
  grid-column-gap: 10px;
  align-items: center;
  text-align: center;
  list-style-type: none;
  padding-inline-start: 0;

  & > div {
    //  margin: 1rem;
  }

  @media (max-width: 950px) {
    grid-auto-flow: unset;
    grid-template-columns: auto auto auto;
  }
`;

const CardPropertyKeyStyle = styled.div`
  font-weight: bold;
`;

const CardPropertyLiStyle = styled.div``;

const CardImageStyle = styled.img`
  width: 60px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const DescriptionStyle = styled.div`
  line-height: 1.7;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const RarityStyle = styled.div`
  color: ${({ rarity }) => rarityMapping[rarity]};
`;

const CardGlossaryUlStyle = styled.div`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-inline-start: 0;
`;

const CardGlossaryStyle = styled.div`
  color: orange;
  font-weight: bold;
`;

const PortraitStyle = styled.div`
  color: gold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikeStyle = styled.div`
  // display: flex;
  // justify-content: center;
`;

export default function CardDetailsModal({
  card,
  card: {
    image,
    attackdelay,
    attackspeed,
    damage,
    description,
    faction,
    flying,
    health,
    manacost,
    name,
    range,
    rarity,
    speed,
    targets,
    type,
  },
  isOpenDetails,
  setIsOpenDetails,
}) {
  const [modals, setModals] = useState([]);
  const [glossary, setGlossary] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const $cardRootContainer = `div[data-name="${name}"] `;

      /* TODO Should be moved to batch jobs to prepare data */
      // expects that both have same size.
      let inlineItemItems = document.querySelectorAll(
        `${$cardRootContainer} span[data-inline-text]:not([data-inline-text=""]`
      );
      const inlineItemItemss = [...inlineItemItems].map((inlineNode) =>
        inlineNode.getAttribute("data-inline-text")
      );

      let inlineItemTitles = document.querySelectorAll(
        `${$cardRootContainer} span[data-highlight]:not([data-highlight=""]`
      );
      const inlineItemTits = [...inlineItemTitles].map((inlineNode) =>
        inlineNode.getAttribute("data-highlight")
      );

      const result = inlineItemTits
        .map((title, index) => ({
          text: inlineItemItemss[index],
          title,
        }))
        .filter(({ text }) => text); // because description is missing in gameData

      setGlossary(result);

      [
        ...document.querySelectorAll(
          `${$cardRootContainer}span[data-card]:not([data-card=""]`
        ),
      ].map((foundItem) => {
        foundItem.addEventListener("click", function (e) {
          const clickedInfo = this.getAttribute("data-card");
          // to find card.name is a hack. If sort by iD, it will likely find the card to summon
          const card = sortBy(cardData, ["iD"]).find((card) => {
            return (
              card.unitToSummon === clickedInfo ||
              card.name.toLowerCase().replace(/\s/g, "") ===
                clickedInfo.toLowerCase()
            );
          });

          if (typeof card !== "undefined") {
            setModals((modals) => [...modals, card]);
          }
        });

        return true;
      });
    }, 0);

    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const isAttacking =
    !isNaN(damage) && !isNaN(attackspeed) && ![damage, attackspeed].includes(0);

  const IMG_FOLDER = "generated/img/";
  const FILE_ENDING = ".webp";
  const WIDTH = "_78";
  const IMG_PATH = IMG_FOLDER + image + WIDTH + FILE_ENDING;

  return (
    <div>
      {modals.map((card) => (
        <CardDetailsModal
          key={card.iD}
          card={card}
          isOpenDetails={true}
          setIsOpenDetails={() =>
            setModals((currentModals) => _dropRight(currentModals))
          }
        />
      ))}

      <ReactModal
        isOpen={isOpenDetails}
        onRequestClose={() => setIsOpenDetails(false)}
        className="modalContentStyle"
        overlayClassName="modalOverlayStyle"
      >
        <ModalContainerStyle data-name={name}>
          <ModalAlignCloseStyle>
            <ModalCloseStyle>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size={"2x"}
                onClick={() => setIsOpenDetails(false)}
              />
            </ModalCloseStyle>
          </ModalAlignCloseStyle>

          <CardHeaderStyle>{name}</CardHeaderStyle>

          <CardPropertyUlStyle>
            <CardPropertyLiStyle>
              <CardPropertyKeyStyle></CardPropertyKeyStyle>
              <PortraitStyle>
                {/*
                                <LikeStyle>
                                    <FontAwesomeIcon icon={faHeartSolid} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartSolid} size={"xs"}/>
                                    <FontAwesomeIcon icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon
                                    icon={faHeartRegular} size={"xs"}/><FontAwesomeIcon icon={faHeartRegular}
                                                                                        size={"xs"}/>
                                </LikeStyle>
                                */}
                <CardImageStyle src={IMG_PATH} alt={image} />
              </PortraitStyle>
            </CardPropertyLiStyle>

            {image === "BloodImps.jpg" && (
              <CardPropertyLiStyle>
                <PortraitStyle>
                  <LikeStyle>
                    <FontAwesomeIcon
                      icon={faHeartSolid}
                      size={"xs"}
                      color={"transparent"}
                    />
                  </LikeStyle>
                  <img src="bloodimp_inline.jpg" width="60px" />
                </PortraitStyle>
              </CardPropertyLiStyle>
            )}

            <CardPropertyLiStyle>
              <CardPropertyKeyStyle>Cost</CardPropertyKeyStyle>
              <div>{manacost}</div>
            </CardPropertyLiStyle>

            <CardPropertyLiStyle>
              <CardPropertyKeyStyle>Faction</CardPropertyKeyStyle>
              <div>
                {factionMapping[faction]} {faction}
              </div>
            </CardPropertyLiStyle>

            <CardPropertyLiStyle>
              <CardPropertyKeyStyle>Rarity</CardPropertyKeyStyle>
              <RarityStyle rarity={rarity}>{rarity}</RarityStyle>
            </CardPropertyLiStyle>

            <CardPropertyLiStyle>
              <CardPropertyKeyStyle>Type</CardPropertyKeyStyle>
              <div>
                <FontAwesomeIcon icon={typeMapping[type]} size={"xs"} /> {type}
              </div>
            </CardPropertyLiStyle>

            {isAttacking && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Targets</CardPropertyKeyStyle>
                <div>
                  {targetsMapping[targets] && (
                    <>
                      {targetsMapping[targets]} {targets}
                    </>
                  )}
                </div>
              </CardPropertyLiStyle>
            )}

            {!isNaN(health) && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Health</CardPropertyKeyStyle>
                <div>{health}</div>
              </CardPropertyLiStyle>
            )}

            {isAttacking && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Attack Speed</CardPropertyKeyStyle>
                <div>{attackspeed / 1000} s</div>
              </CardPropertyLiStyle>
            )}

            {!isNaN(attackdelay) && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Attack Delay</CardPropertyKeyStyle>
                <div>{attackdelay}</div>
              </CardPropertyLiStyle>
            )}

            {!isNaN(damage) && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Damage</CardPropertyKeyStyle>
                <div>{damage === 0 ? "-" : damage}</div>
              </CardPropertyLiStyle>
            )}

            {isAttacking && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>DPS</CardPropertyKeyStyle>
                <div>{Math.round((damage / attackspeed) * 10000) / 10}</div>
              </CardPropertyLiStyle>
            )}

            {isAttacking && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Range</CardPropertyKeyStyle>
                <div>{range / 1000}</div>
              </CardPropertyLiStyle>
            )}

            {speed && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Speed</CardPropertyKeyStyle>
                <div>{speed}</div>
              </CardPropertyLiStyle>
            )}

            {[true, false].includes(flying) && (
              <CardPropertyLiStyle>
                <CardPropertyKeyStyle>Flying</CardPropertyKeyStyle>
                <div>
                  <FontAwesomeIcon icon={flying ? faCheck : faTimes} />
                </div>
              </CardPropertyLiStyle>
            )}
          </CardPropertyUlStyle>

          <h3 style={{ marginBottom: 0 }}>Description</h3>
          <DescriptionStyle dangerouslySetInnerHTML={{ __html: description }} />

          <CardGlossaryUlStyle>
            {glossary.length > 0 &&
              glossary.map(({ title, text }) => (
                <CardPropertyLiStyle key={title}>
                  <CardGlossaryStyle>{title}</CardGlossaryStyle>
                  <div dangerouslySetInnerHTML={{ __html: text }}></div>
                </CardPropertyLiStyle>
              ))}
          </CardGlossaryUlStyle>

          <div>
            <h3 style={{ marginBottom: 0 }}>Tips by community</h3>
            <CardDiscussion card={card} discussionType="mechanics" />
          </div>
        </ModalContainerStyle>
      </ReactModal>
    </div>
  );
}

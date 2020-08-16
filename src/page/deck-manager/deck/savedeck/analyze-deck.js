import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import mToast from "components/mToast";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import { exportDeckUrl } from "page/deck-manager/deck/export/export-as-url";
import React from "react";
import { IDENTIFIER_FOR_EMPTY_SLOT } from "page/page-config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import css from "page/deck-manager/deck/savedeck/analyse-deck.module.scss";
import cssButton from "page/deck-manager/build/filters/ButtonFilterGroup.module.scss";

export default function AnalyzeDeck({ lastSelectedCards, selectedMaster }) {
  const cards = lastSelectedCards.filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT);

  const selectedCards = cards.filter(({ card: { iD } }) => iD !== IDENTIFIER_FOR_EMPTY_SLOT);
  const totalMana = selectedCards.reduce((total, { card: { manacost }, count }) => {
    return total + manacost * count;
  }, 0);

  const numberOfCardsConsideringWildcards = selectedCards.reduce(
    (total, { count }) => total + count,
    0
  ); // TODO

  const avgMana =
    numberOfCardsConsideringWildcards !== 0
      ? Math.round((totalMana / numberOfCardsConsideringWildcards) * 10) / 10
      : 0;

  const attackFlying = selectedCards.filter(({ card: { hitsFlying } }) => hitsFlying).length;
  const spells = selectedCards.filter(({ card: { type } }) => type === "Spell").length;

  const url = exportDeckUrl(selectedMaster, lastSelectedCards);
  return (
    <div>
      <fieldset className={css.analyzeFieldset}>
        <legend>Analysis</legend>
        <div className={css.AnalysisDataStyle}>
          <div className={css.property}>
            <b>Average Mana</b> <div>{avgMana}</div>
          </div>

          <div className={css.property}>
            <b>Attack Flying Minions</b> <div>{attackFlying}</div>
          </div>

          <div className={css.property}>
            <b>Spells</b> <div>{spells}</div>
          </div>
        </div>

        <div className={css.rightTopLegend}>
          <ButtonGroupStyle>
            <CopyToClipboard
              text={url}
              onCopy={() => {
                mToast("Link copied to clipboard");
              }}
              title="To share by Discord, Twitter, Facebook with Image Preview without saving to database."
            >
              <button className={classnames(cssButton.ButtonInGroupStyle)}>
                <FontAwesomeIcon icon={faLink} size="xs" style={{ marginLeft: "5px" }} />
                <span style={{ paddingLeft: "11px" }}>Copy link with preview</span>
              </button>
            </CopyToClipboard>
          </ButtonGroupStyle>
        </div>
      </fieldset>
    </div>
  );
}

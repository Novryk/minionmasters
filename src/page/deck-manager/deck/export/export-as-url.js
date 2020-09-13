// Export to URL
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import cssHelpers from "components/helper.module.scss";
import mToast from "components/mToast";

import copy from "copy-to-clipboard";
import isEmpty from "lodash.isempty";
import { generateDynamicLink } from "mm-dynamic-link";
import {
  INITIAL_MASTER_SELECTED,
  mastersMapping,
} from "page/deck-manager/build/masters/mastersMapping";
import { ROUTE_PATH_ID_FROM_PARAM } from "page/deck-manager/deck/decks/decks-config";
import { getCardIdsFromCount } from "page/deck-manager/deck/export/export-helper";

import Tooltip from "rc-tooltip";
import React from "react";

const encodeMyUrl = (url) =>
  encodeURIComponent(url)
    // Note that although RFC3986 reserves "!", RFC5987 does not,
    // so we do not need to escape it
    .replace(/['()]/g, escape) // i.e., %27 %28 %29
    .replace(/\*/g, "%2A")
    // The following are not required for percent-encoding per RFC5987,
    // so we can allow for a little better readability over the wire: |`^
    .replace(/%(?:7C|60|5E)/g, unescape);

export function toParams(selectedMaster, lastSelectedCards) {
  const lastSelectedCardiDs = getCardIdsFromCount(lastSelectedCards);
  const iDsToParam = lastSelectedCardiDs.join("&iD=");

  const masterParam = `master=${
    mastersMapping[selectedMaster] ? mastersMapping[selectedMaster].iD : INITIAL_MASTER_SELECTED
  }`;
  const paramsMaster = `?${masterParam}`;
  const paramsCards = iDsToParam ? `&iD=${iDsToParam}` : "";
  return paramsMaster + paramsCards;
}

export function exportDeckUrl(
  selectedMaster,
  lastSelectedCards,
  title = "My deck",
  description = "open link to edit or copy deck to game",
  pagePath = ""
) {
  const params = toParams(selectedMaster, lastSelectedCards);
  const titleParams = `&title=${encodeMyUrl(title)}`;
  const descriptionParams = `&description=${encodeMyUrl(description)}`;

  const port = window.location.port === "3000" ? `:${window.location.port}` : "";
  const url = `${window.location.protocol}//${window.location.hostname}${port}/${pagePath}${params}${titleParams}${descriptionParams}`;
  return url;
}

export function ExportAsUrlFromSavedDeck({
  title,
  description,
  deckId,
  selectedMaster,
  lastSelectedCards,
}) {
  const url = exportDeckUrl(
    selectedMaster,
    lastSelectedCards,
    title,
    description,
    ROUTE_PATH_ID_FROM_PARAM.replace("/", "")
  );
  const deckIdParamPrefix = `&deckId=${encodeMyUrl(deckId)}`;
  return <ExportAsUrl url={url + deckIdParamPrefix} />;
}

export const AVAILABLE_CARDS_BY_URL_KEY = `availableCards`;

/* TODO: should only calculate url, when clicked on button */
export function ExportAsUrlFromDeckManager({
  selectedMaster,
  lastSelectedCards,
  availableCards,
  buttonLabel,
}) {
  const url = exportDeckUrl(selectedMaster, lastSelectedCards);
  const availableCardsParam = availableCards
    ? `&${AVAILABLE_CARDS_BY_URL_KEY}=${availableCards.join(",")}`
    : "";
  const urlWithYourAvailableCards = `${url}}${availableCardsParam}`;

  return (
    <ExportAsUrl
      url={urlWithYourAvailableCards}
      availableCards={availableCards}
      buttonLabel={buttonLabel}
    />
  );
}

function ExportAsUrl({ url, availableCards, buttonLabel = null }) {
  const handleCopyButtonClick = () => {
    generateDynamicLink(url).then(({ data: { shortLink } }) => {
      copy(shortLink);
      mToast("Link copied to clipboard");
    });
  };

  return (
    <div className={cssButton.ButtonGroupStyle}>
      <Tooltip
        placement="topLeft"
        overlay={
          <span>
            Deck is stored in URL to edit temporary. You can ask others to complete deck{" "}
            {!isEmpty(availableCards) && <span>with your available cards</span>}.
          </span>
        }
      >
        <button
          className={classnames(
            cssButton.buttonSpacingNoTextOnMobile,
            cssButton.ButtonInGroupStyle
          )}
          onClick={() => handleCopyButtonClick()}
        >
          <FontAwesomeIcon icon={faLink} />
          <span className={cssHelpers.hideOnMobile}>
            {buttonLabel ? (
              buttonLabel
            ) : (
              <>Get link {!isEmpty(availableCards) && <span>with your available cards</span>}</>
            )}
          </span>
        </button>
      </Tooltip>
    </div>
  );
}

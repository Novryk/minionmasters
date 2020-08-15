import CardDetailsModal from "page/cardmodal/CardDetailsModal";
import React from "react";

export default function InfoDetailsCardOverlay({ card, isOpenDetails, setIsOpenDetails }) {
  return (
    <>
      {isOpenDetails ? (
        <CardDetailsModal
          isOpenDetails={isOpenDetails}
          setIsOpenDetails={setIsOpenDetails}
          card={card}
          key={card.iD}
        />
      ) : null}
    </>
  );
}

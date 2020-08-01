import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";

export default function Freebies() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Freebies"])}
      <fieldset>
        <legend>Frequent updated list of free giveaways</legend>
        <div style={{ width: "70%", margin: "auto", padding: "50px 0" }}>
          <span className={classNames("fa-layers fa-fw")}>
            <FontAwesomeIcon icon={faSquare} />
            <FontAwesomeIcon icon={faReddit} color="#fd7e14" size="lg" mask={["far", "circle"]} />
            {"  "}
          </span>
          <a
            href="https://www.reddit.com/r/MinionMasters/comments/eq8s5i/codes_for_new_and_old_players_to_gain_a_massive/"
            style={{ marginLeft: "10px", verticalAlign: "center" }}
          >
            <b>Codes for new and old players to gain a massive amount of rewards</b>
          </a>{" "}
        </div>
      </fieldset>

      <fieldset>
        <legend>View Streamers to get rewards</legend>
        Watching the most popular streamers is also a good way to earn resources!
        <br />
        In fact the BetaDwarf provides them giveaway packages to be given away, and the more viewer
        they have, the bigger the packages will be, so be sure you don't miss your chance in their
        raffle (especially if you are a new player)!
        <br />
        <br />
        While viewing a stream on twitch, there are several commands that you can use to interact
        with the game by changing your puff style or by throwing stuff in the arena. All the
        commands available can be found here:{" "}
        <div style={{ width: "50%", margin: "auto", paddingTop: "20px" }}>
          <a
            href="https://steamcommunity.com/linkfilter/?url=http://minionmastersthegame.com/streamerboost/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>http://minionmastersthegame.com/streamerboost/</b>
          </a>
        </div>
        <br />
        <br />
        Also by watching the streamers, you will receive drops when they win! Drops grant you 50
        gold (and eventually a key of the tri-team event).
        <br />
        The drops can be collected on login.
        <div style={{ width: "50%", margin: "auto", paddingTop: "20px" }}>
          Popular streamer list
          <div>
            <a href="https://www.twitch.tv/TeamManaFrenzy/">
              <b>https://www.twitch.tv/TeamManaFrenzy/</b>
            </a>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

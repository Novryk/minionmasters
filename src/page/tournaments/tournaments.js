import css from "page/tournaments/tournaments.module.scss";
import React from "react";


export function Tournaments() {

  return (
    <div>
      <fieldset>
        <legend>Upcoming Tournaments</legend>
        <div className={css.upcomingTournaments}>
          Can all be found here or you can participate:
          <h4>
            <a href="https://www.toornament.com/en_GB/tournaments/?_locale=en_GB&q%5Bdiscipline%5D=minion_masters&q%5Bplatform%5D=&q%5Bsearch%5D=&q%5Btype%5D=upcoming">
              www.toornament.com
            </a>
          </h4>
        </div>
      </fieldset>

      <fieldset>
        <legend>Past Tournaments</legend>
        You can watch the games here:
        <ul>
            <li>
              <a href="https://www.youtube.com/c/Badasafish80/videos">BadasaFish80</a>
            </li>
          <li>
            <a href="https://www.youtube.com/c/KingPuffCup/videos">KingPuffCup</a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UC9SN3rP2tco0NFzYmB-DcQw">Last Elf</a>
          </li>

          <li><a href="https://www.youtube.com/watch?v=_QtPa3Rlbk4">GGTour (Several linked)</a></li>

        </ul>
      </fieldset>
    </div>
  );
}

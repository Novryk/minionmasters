import { is_touch_device } from "components/helper";
import React from "react";

import css from "./how-to-use.module.scss";

export function HowToUse() {
  return (
    <div className={css.container}>
      {is_touch_device() ? <code>long touch</code> : <code>right click mouse</code>} to open Master
      or Card information
    </div>
  );
}

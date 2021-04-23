'use strict';
/*
 * page.js
 */
import {$, copyr, headAndShoulders} from "./modules/nQuery.js";

const init = function() {
    headAndShoulders('Our Oauth2 Project');
    copyr("cpy", 2021);
};

window.addEventListener('load', init);

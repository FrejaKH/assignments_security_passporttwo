'use strict';
import {makeMenu, setTitles, setFooter} from './nQm.js';

const doSomething = function () {
    makeMenu();
    setTitles();
    setFooter();
}
window.addEventListener('load', doSomething);

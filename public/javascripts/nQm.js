'use strict';
import {title, menu} from './menu.js';

export const $ = function (foo) {
    return document.getElementById(foo);
};
export const setTitles = function (t) {
    if (t == null)
        t = title;                      // from menu.js
    let targets = document.getElementsByClassName('title');
    for(let i = 0; i < targets.length; ++i) {
        targets[i].textContent = t;
    }
};
export const setFooter = function (bar = 'nml', year = 2021) {
    let now = new Date();
    $('cpryear').textContent = `\u00A9 ${bar} ${year}-${now.getFullYear()}`;
};

export const roll = function (foo) {return Math.floor(Math.random()*foo)+1};

export const strCharRepl = function(s, c, j) {
    let ns = "";
    for (let i = 0; i < s.length; i++) {
        if (j === i) {
            ns += c;
        } else {
            ns += s.charAt(i);
        }
    }
    return ns;
};
export const makeMenu = function (where = 'menu') {
    let nav = document.createElement('nav');
    let h1 = document.createElement('h1');
    h1.setAttribute('class', 'title');
    let list = document.createElement('ul');
    nav.appendChild(h1);
    nav.appendChild(list);
    menu.forEach( function(item) {
        let listitem = document.createElement('li');
        let link = document.createElement('a');
        link.setAttribute('href', item.url);
        let txt = document.createTextNode(item.text);
        link.appendChild(txt);
        listitem.appendChild(link);
        list.appendChild(listitem);
    });
    $(where).appendChild(nav);
};

let ntime;
export let nstop;
export const formaTid = function (t) {
    var m = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
    var s = t.getSeconds() >= 10 ? t.getSeconds() : "0" + t.getSeconds();
    return t.getHours() + ":" + m + ":" + s;
};

export const bigBang = function () {
    clearInterval(nstop);
    ntime = new Date(1970,0,1,0,0,0);
    nstop = setInterval(function () {
        ntime.setSeconds(ntime.getSeconds() + 1);
        $('timer').textContent = formaTid(ntime);
    }, 1000);
};

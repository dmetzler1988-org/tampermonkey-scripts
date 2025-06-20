// ==UserScript==
// @name         Jira Sprint Name
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display the spint name on new Jira boards
// @author       dmetzler1988
// @updateURL    https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/jira/jira-sprint-name-visibility.js
// @downloadURL  https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/jira/jira-sprint-name-visibility.js
// @match        https://.*.atlassian.net/jira/*/*/projects/*/boards/*
// @icon         https://play-lh.googleusercontent.com/_AZCbg39DTuk8k3DiPRASr9EwyW058pOfzvAu1DsfN9ygtbOlbuucmXaHJi5ooYbokQX=w480-h960-rw
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => {
        console.clear();

        const title = document.title.split(' - ')[0];
        const $spintInfoInsertElement = document.querySelectorAll("[data-testid='horizontal-nav-header.ui.board-header.header']");
        const lastChild = $spintInfoInsertElement[0].lastElementChild;
        if (lastChild) {
            const divElement = document.createElement('div');
            divElement.style.padding = '5px 0 0';
            divElement.textContent = title;
            lastChild.prepend(divElement);
        }
    }, "2000"); // 2sec
})();

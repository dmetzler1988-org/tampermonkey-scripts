// ==UserScript==
// @name         WIP GitHub - Do not merge
// @namespace    dmetzler1988
// @version      0.1
// @description  Do not merge GitHub pull requests with WIP in title.
// @author       dmetzler1988
// @updateURL    https://github.com/dmetzler1988-org/tampermonkey-scripts/edit/master/github/do-not-merge.user.js
// @downloadURL  https://github.com/dmetzler1988-org/tampermonkey-scripts/edit/master/github/do-not-merge.user.js
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const wipRegex = /wip|draft/i;
    const wipButtonMessage = "WIP, you can't merge!";
    let buttonTexts = [];
    let counter = 0;

    // Disable buttons on pull request itself.
    const disableButtons = function () {
        if (!location.pathname.match(/pull\//)) {
            return;
        }

        const container = document.getElementById('partial-pull-merging');
        const mergeButtonContainer = container.getElementsByClassName('merge-message');
        let buttons = mergeButtonContainer[0].getElementsByClassName('btn btn-primary');

        if (counter === 0) {
            for (let i = 0; i < buttons.length; i++) {
                buttonTexts[i] = buttons[i].innerText.trim();
            }
        }

        counter++;

        const issueTitle = document.getElementsByClassName('js-issue-title');
        if (issueTitle[0].textContent.match(wipRegex)) {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;

                if (buttons[i].textContent !== '') {
                    buttons[i].textContent = wipButtonMessage;
                }
            }
        } else {
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].disabled) {
                    buttons[i].disabled = '';
                    buttons[i].textContent = buttonTexts[i];
                }
            }
        }
    };

    const markList = function() {
        if (!location.pathname.match(/pulls$/)) {
            return;
        }

        const pulls = document.querySelectorAll('[id^="issue"]');
        const wipPulls = Array.from(pulls).filter(function(el) {
            return el.textContent.match(wipRegex);
        });

        wipPulls.forEach(function(el) {
            el.style.opacity = 0.5;
        });
    };

    window.addEventListener('load', disableButtons, markList);
    window.addEventListener('pjax:end', disableButtons, markList);

    const observerPullRequest = new MutationObserver(disableButtons);
    const observerPullRequestList = new MutationObserver(markList);
    const body = document.querySelector('body');
    observerPullRequest.observe(body, { childList: true, subtree: true});
    observerPullRequestList.observe(body, { childList: true, subtree: true});
})();

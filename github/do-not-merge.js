// ==UserScript==
// @name         WIP GitHub - Do not merge
// @namespace    dmetzler1988
// @version      0.1
// @description  Do not merge GitHub pull requests with WIP in title.
// @author       dmetzler1988
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const wipRegex = /wip|draft/i;

    // Disable buttons on pull request itself.
    const disableButtons = function () {
        if (!location.pathname.match(/pull\//)) {
            return;
        }

        const issueTitle = document.getElementsByClassName('js-issue-title');
        if (issueTitle[0].textContent.match(wipRegex)) {
            const container = document.getElementById('partial-pull-merging');
            const mergeButtonContainer = container.getElementsByClassName('merge-message');
            let buttons = mergeButtonContainer[0].getElementsByClassName('btn btn-primary');

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
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

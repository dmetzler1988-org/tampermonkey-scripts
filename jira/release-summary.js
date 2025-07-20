// ==UserScript==
// @name         Jira Release Summarization
// @namespace    dmetzler1988
// @version      0.1
// @description  Tool to copy easily issue number of Jira issue with keyboard, after issue is selected.
// @author       dmetzler1988
// @updateURL    https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/jira/release-summary.js
// @downloadURL  https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/jira/release-summary.js
// @match        https://*.atlassian.net/projects/*/versions/*/tab/release-report-all-issues
// @icon         https://wac-cdn-2.atlassian.com/image/upload/f_auto,q_auto/assets/img/favicons/atlassian/apple-touch-icon-114x114.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const copyText = (text) => {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    };

    const fallbackCopyTextToClipboard = (text) => {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    };

    const getValue = () => {
        const description = [];
        const list = document.querySelectorAll('[data-component-selector="VersionDetailIssueListIssueCardContainer"] > div > div');

        list.forEach(item => {
            if(item.innerText.length > 0) {
                description.push(item.innerText);
            }
        });

        //console.info(description.join(", "));
        copyText(description.join(", "));
    };

    // @see https://keycode.info/ for keyCodes
    document.addEventListener('keydown', event => {
        console.clear();
        //console.log('keyCode: ' + event.keyCode);

        // 192 = §
        if (event.keyCode === 192) {
            getValue();
        }
    });
})();

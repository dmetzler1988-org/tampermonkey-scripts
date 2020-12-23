// ==UserScript==
// @name         Jira Copy Issue Number
// @namespace    dmetzler1988
// @version      0.1
// @description  Tool to copy easily issue number of Jira issue with keyboard, after issue is selected.
// @author       dmetzler1988
// @updateURL    https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/jira/copy-issue-number.user.js
// @downloadURL  https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/jira/copy-issue-number.user.js
// @match        https://*.atlassian.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const DOMAIN = "https://*.atlassian.net/";

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
    }

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
    }

    const start = () => {
        let issueNo;
        const currentLocation = window.location;

        if (currentLocation.href.includes(DOMAIN + 'browse/')) {
            const path = currentLocation.pathname;
            const splitted = path.split('/');
            issueNo = splitted.pop();
        } else {
            const parameters = currentLocation.search;
            const parameter = parameters.split('&');
            for (var i = 0; i < parameter.length; i++) {
                const item = parameter[i];
                if (item.includes('selectedIssue')) {
                    const splitted = item.split('=');
                    issueNo = splitted[1];
                }
            }
        }

        copyText(issueNo);
    };

    document.addEventListener('keydown', event => {
        //console.log('keyCode: ' + event.keyCode);

        // 187 = ´
        if (event.keyCode === 187) {
            console.clear();
            start();
        }
    });
})();

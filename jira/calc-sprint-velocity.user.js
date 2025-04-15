// ==UserScript==
// @name         Calc Jira Sprint Report Velocity
// @namespace    dmetzler1988
// @version      0.1
// @description  Tool to calculate the sprint velocity based on sprint-retrospective report in Jira
// @author       dmetzler1988
// @updateURL    https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/jira/calc-sprint-velocity.user.js
// @downloadURL  https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/jira/calc-sprint-velocity.user.js
// @match        https://*.atlassian.net/*/reports/sprint-retrospective*
// @icon         https://wac-cdn-2.atlassian.com/image/upload/f_auto,q_auto/assets/img/favicons/atlassian/apple-touch-icon-114x114.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const getParsedFloat = (value) => {
        let returnValue = 0;
        let match = value.match(/(\d+(\.\d+)?)/);
        if (match) {
            returnValue = parseFloat(match[0]);
        }

        return returnValue;
    }

    const getValue = () => {
        const floatRegex = /(\d+(\.\d+)?)/;

        // Completed Issue Table
        const completedIssues = document.querySelectorAll('table[aria-label="Completed Issues"]');
        //const completedIssuesCurrentValues = completedIssues[0].querySelectorAll('th span.ghx-current-value');
        //let completedIssuesCurrentValue = completedIssuesCurrentValues[0].innerText;
        const completedIssuesRows = completedIssues[0].querySelectorAll('tr');

        let completedIssuesCalc = 0;
        completedIssuesRows.forEach((row) => {
            const completedIssuesPreviousValues = row.querySelectorAll('td span.ghx-previous-value');
            const completedIssuesCurrentValues = row.querySelectorAll('td span.ghx-current-value');

            let prevValue = (completedIssuesPreviousValues[0]) ? getParsedFloat(completedIssuesPreviousValues[0].innerText) : 0;
            let curValue = (completedIssuesCurrentValues[0]) ? getParsedFloat(completedIssuesCurrentValues[0].innerText) : 0;

            if (prevValue === 0 && curValue === 0) {
                const tdContent = row.querySelectorAll('td.ghx-right');
                curValue = (tdContent[0]) ? getParsedFloat(tdContent[0].innerText) : 0;
            }

            if (prevValue > curValue) {
                completedIssuesCalc += prevValue;
            } else {
                completedIssuesCalc += curValue;
            }

             // For debugging
            //console.log('prevValue: ' + prevValue);
            //console.log('curValue: ' + curValue);
            //console.log('completedIssuesCalc: ' + completedIssuesCalc);
        });


        // Not Completed Issue Table
        const notCompletedIssues = document.querySelectorAll('table[aria-label="Issues Not Completed"]');
        const notCompletedIssuesRows = notCompletedIssues[0].querySelectorAll('tr');

        let notCompletedIssuesCalc = 0;
        notCompletedIssuesRows.forEach((row) => {
            const notCompletedIssuesPreviousValues = row.querySelectorAll('td span.ghx-previous-value');
            const notCompletedIssuesCurrentValues = row.querySelectorAll('td span.ghx-current-value');

            if (notCompletedIssuesPreviousValues[0] && notCompletedIssuesCurrentValues[0]) {
                let prevValue = getParsedFloat(notCompletedIssuesPreviousValues[0].innerText);
                let curValue = getParsedFloat(notCompletedIssuesCurrentValues[0].innerText);

                if (prevValue > 0) {
                    notCompletedIssuesCalc += (prevValue - curValue);
                }

                // For debugging
                //console.log('prevValue: ' + prevValue);
                //console.log('curValue: ' + curValue);
                //console.log('notCompletedIssuesCalc: ' + notCompletedIssuesCalc);
            }
        });

        console.log('completedIssuesCalc: ' + completedIssuesCalc);
        console.log('notCompletedIssuesCalc: ' + notCompletedIssuesCalc);

        return parseFloat(completedIssuesCalc) + parseFloat(notCompletedIssuesCalc);
    }

    // @see https://keycode.info/ for keyCodes
    document.addEventListener('keydown', event => {
        console.clear();
        //console.log('keyCode: ' + event.keyCode);

        // 192 = §
        if (event.keyCode === 192) {
            let value = getValue();
            console.log('calculated sum: ' + value);
            alert('calculated sum: ' + value);
        }
    });
})();

// ==UserScript==
// @name         Parship Counters
// @namespace    dmetzler1988
// @version      0.3
// @description  Counts the messages in parship (after all are loaded). Press + or ` when you are ready to start.
// @author       dmetzler1988
// @updateURL    https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/parship/counter.user.js
// @downloadURL  https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/parship/counter.user.js
// @match        https://www.parship.ch/messenger
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const loopCounter = 150;
    const timoutTime = 1000;

    // Scroll to last position and display results.
    const scrollEvent = () => {
        const contactList = document.getElementById('contactList');

        for (let i = 0; i <= loopCounter; i++) {
            let scrollToPos = i * 2000;

            setTimeout(() => {
                contactList.scrollTo(0, scrollToPos);

                if (i === loopCounter) {
                    displayResults();
                }
            }, i * timoutTime);
        }
    };

    // Display Results function.
    const displayResults = () => {
        const rootQuery = 'div#contactList div.contactswrapper div.innerListWrapper a.contactItem:not(.dummy)';
        const all = document.querySelectorAll(rootQuery);
        const rejected = document.querySelectorAll(rootQuery + '.rejectedByPartner');
        const deleted = document.querySelectorAll(rootQuery + '.is-deleted');
        const spam = document.querySelectorAll(rootQuery + '.is-scammer');
        const read = document.querySelectorAll(rootQuery + '.is-read:not(.is-deleted):not(.rejectedByPartner) .has-readByReceiverIcon');
        const notRead = document.querySelectorAll(rootQuery + '.is-read:not(.is-deleted):not(.rejectedByPartner) .has-sentIcon');
        const open = document.querySelectorAll(rootQuery + '.is-read:not(.is-deleted):not(.rejectedByPartner):not(.is-scammer) .messageTextAndCount:not(.has-readByReceiverIcon):not(.has-sentIcon)');
        const sum = rejected.length + deleted.length + read.length + notRead.length + spam.length + open.length;

        console.clear();

        for (let i = 0; i < rejected.length; i++) {
			rejected[i].closest('a.contactItem').classList.add('dmetzler1988--rejected');
		}

        for (let i = 0; i < deleted.length; i++) {
			deleted[i].closest('a.contactItem').classList.add('dmetzler1988--deleted');
		}

        for (let i = 0; i < spam.length; i++) {
			spam[i].closest('a.contactItem').classList.add('dmetzler1988--spam');
		}

        for (let i = 0; i < read.length; i++) {
			read[i].closest('a.contactItem').classList.add('dmetzler1988--read');
		}

        for (let i = 0; i < notRead.length; i++) {
			notRead[i].closest('a.contactItem').classList.add('dmetzler1988--not-read');
		}

        for (let i = 0; i < open.length; i++) {
			open[i].closest('a.contactItem').classList.add('dmetzler1988--open');
		}

        /*console.log('All: ' + all.length);
        console.log('Rejected: ' + rejected.length);
        console.log('Deleted: ' + deleted.length);
        console.log('Spam: ' + spam.length);
        console.log('Read: ' + read.length);
        console.log('Not read: ' + notRead.length);
		console.log('Open: ' + open.length);
        console.log(' ');
        console.log('Sum: ' + sum);*/

        /*for (let i = 0; i < rejected.length; i++) {
			rejected[i].closest('a.contactItem').style.display = 'none';
            rejected[i].closest('a.contactItem').remove();
		}
		for (let i = 0; i < deleted.length; i++) {
			deleted[i].closest('a.contactItem').style.display = 'none';
            deleted[i].closest('a.contactItem').remove();
		}
        for (let i = 0; i < spam.length; i++) {
			spam[i].closest('a.contactItem').style.display = 'none';
            spam[i].closest('a.contactItem').remove();
		}
		for (let i = 0; i < read.length; i++) {
			read[i].closest('a.contactItem').style.display = 'none';
            read[i].closest('a.contactItem').remove();
		}
		for (let i = 0; i < notRead.length; i++) {
			notRead[i].closest('a.contactItem').style.display = 'none';
            notRead[i].closest('a.contactItem').remove();
		}
 		for (let i = 0; i < open.length; i++) {
			open[i].closest('a.contactItem').style.display = 'none';
		}*/

        let counterContainer = document.createElement('div');
        counterContainer.setAttribute('id', 'dmetzler1988-counter');

        let popupStyle = document.createElement('style');
        popupStyle.innerHTML =
            '.dmetzler1988-counter {' +
                'position: fixed;' +
                'right: 20px;' +
                'bottom: 20px;' +
                'padding: 10px;' +
                'background-color: #d60007;' +
                'color: #ffffff;' +
                'font-family: Arial, Helvetica, sans-serif;' +
                'font-size: 12px;' +
                'line-height: 16px;' +
                'border: 2px solid transparent;' +
                'background-origin: border-box;' +
                'border-radius: 4px;' +
                'box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75)' +
            '}' +
            '.dmetzler1988-close {' +
                'position: absolute;' +
                'top: 5px;' +
                'right: 5px;' +
                'width: 15px;' +
                'height: 15px;' +
                'opacity: 0.3;' +
                'cursor: pointer;' +
                'transition: opacity 0.2s ease-in-out;' +
            '}' +
            '.dmetzler1988-close:hover {' +
                'opacity: 1;' +
            '}' +
            '.dmetzler1988-close:before, .dmetzler1988-close:after {' +
                'position: absolute;' +
                'left: 5px;' +
                'content: " ";' +
                'height: 15px;' +
                'width: 2px;' +
                'background-color: #ffffff;' +
            '}' +
            '.dmetzler1988-close:before {' +
                'transform: rotate(45deg);' +
            '}' +
            '.dmetzler1988-close:after {' +
                'transform: rotate(-45deg);' +
            '}' +
            '.dmetzler1988-counter h3 {' +
                'margin: 0 0 10px 0;' +
                'font-size: 14px;' +
                'line-height: 18px;' +
                'text-align: center' +
            '}' +
            '.dmetzler1988-counter p {' +
                'margin: 0;' +
                'right: 20px;' +
            '}' +
            '.dmetzler1988-counter p[onclick] {' +
                'cursor: pointer;' +
            '}' +
            '.dmetzler1988-counter p.dmetzler1988-sum {' +
                'margin: 10px 0 0 0;' +
                'font-weight: bold;' +
            '}';

        let popupContent = document.createElement('div');
        popupContent.setAttribute('class', 'dmetzler1988-counter');
        popupContent.innerHTML =
            '<div class="dmetzler1988-close" onclick="dmetzler1988ClosePopup()"></div>' +
            '<h3>dmetzler1988<br>Parship Messages Counter</h3>' +
            '<p onclick="showAll(this);">All: ' + all.length + '</p>' +
            '<p onclick="deleteAllThanExpected(this);" data-target="dmetzler1988--rejected">Rejected: ' + rejected.length + '</p>' +
            '<p onclick="deleteAllThanExpected(this);" data-target="dmetzler1988--deleted">Deleted: ' + deleted.length + '</p>' +
            '<p onclick="deleteAllThanExpected(this);" data-target="dmetzler1988--spam">Spam: ' + spam.length + '</p>' +
            '<p onclick="deleteAllThanExpected(this);" data-target="dmetzler1988--read">Read: ' + read.length + '</p>' +
            '<p onclick="deleteAllThanExpected(this);" data-target="dmetzler1988--not-read">Not read: ' + notRead.length + '</p>' +
            '<p onclick="deleteAllThanExpected(this);" data-target="dmetzler1988--open">Open: ' + open.length + '</p>' +
            '<p class="dmetzler1988-sum">Sum: ' + sum + '</p>';

        let popupScript = document.createElement('script');
        // Function to close Popup.
        popupScript.innerHTML =
            'function dmetzler1988ClosePopup() {' +
                'document.getElementById("dmetzler1988-counter").remove();' +
            '}';

        // Function to remove all elements than expected one.
        popupScript.innerHTML +=
            'function deleteAllThanExpected(element) {' +
                'const rootQuery = "div#contactList div.contactswrapper div.innerListWrapper a.contactItem:not(.dummy)";' +
                'const all = document.querySelectorAll(rootQuery);' +
                'for (let i = 0; i < all.length; i++) {' +
                    'if (all[i].classList.contains(element.dataset.target)) {' +
                        'all[i].closest("a.contactItem").style.display = "";' +
                    '} else {' +
                        'all[i].closest("a.contactItem").style.display = "none";' +
                    '}' +
                '}' +
                'document.getElementById("contactList").scroll(0, 0);' +
            '}';

        // Function to show all lines again.
        popupScript.innerHTML +=
            'function showAll(element) {' +
                'const rootQuery = "div#contactList div.contactswrapper div.innerListWrapper a.contactItem:not(.dummy)";' +
                'const all = document.querySelectorAll(rootQuery);' +
                'for (let i = 0; i < all.length; i++) {' +
                    'all[i].closest("a.contactItem").style.display = "";' +
                '}' +
                'document.getElementById("contactList").scroll(0, 0);' +
            '}';

        let bodyDom = document.querySelector('body');
        bodyDom.appendChild(counterContainer);
        counterContainer.appendChild(popupStyle);
        counterContainer.appendChild(popupContent);
        counterContainer.appendChild(popupScript);
    };

    document.addEventListener('keydown', event => {
        //console.log(event.keyCode);

        // 187 = +
        if (event.keyCode === 187) {
            scrollEvent();
        }

        // 221 = ´
        if (event.keyCode === 221) {
            displayResults();
        }
    });
})();

// ==UserScript==
// @name         Broken Link Checker
// @namespace    dmetzler1988
// @version      0.1
// @description  Tool to check all anchor tags on website and test if they are broken.
// @author       dmetzler1988
// @updateURL    https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/global/broken-link-checker.user.js
// @downloadURL  https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/global/broken-link-checker.user.js
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    const urlExists = (url, callback) => {
        var sameOriginURL = proxyUrl + url;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                callback(xhr.status < 400);
            }
        };
        xhr.open("HEAD", sameOriginURL);
        xhr.send();
    };

    const start = () => {
        const links = document.querySelectorAll("a");
        links.forEach(function (link) {
            let someUrl = link.getAttribute("href");

            urlExists(someUrl, function (exists) {
                //console.log('"%s" exists? %s', someUrl, exists.toString());
                if (!exists) {
                    link.style.background = "red";
                }
            });
        });
    };

    document.addEventListener('keydown', event => {
        //console.log('keyCode: ' + event.keyCode);

        // 192 = ^
        if (event.keyCode === 192) {
            console.clear();
            start();
        }
    });
})();

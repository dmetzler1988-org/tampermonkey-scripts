// ==UserScript==
// @name         LastPass DisableErrorOverlays
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Disables the error popups from LastPass.
// @author       dmetzler1988
// @updateURL    https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/lastpass/error-disabler.user.js
// @downloadURL  https://github.com/dmetzler1988-org/tampermonkey-scripts/raw/master/lastpass/error-disabler.user.js
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var observeDOM = (function(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        return function( obj, callback ){
            if(!obj || !obj.nodeType === 1) return; // Validation

            if(MutationObserver){
                // Define a new observer.
                var obs = new MutationObserver(function(mutations, observer){
                    callback(mutations);
                })
                // Have the observer observe XY for changes in children.
                obs.observe(obj, {childList:true, subtree:true});
            } else if(window.addEventListener){
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        }
    })();

    var body = document.querySelector('body');

    // Observe a specific DOM element.
    observeDOM(body, function(m){
        var addedNodes = [], removedNodes = [];

        m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
        m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

        //console.clear();
        //console.log('Added:', addedNodes, 'Removed:', removedNodes);

        if (addedNodes !== []) {
            for (var i = 0; addedNodes.length > i; i++) {
                var addedNode = addedNodes[i];

                if (addedNode.className === 'lpiframeoverlay') {
                    var element = document.querySelector('#' + addedNode.id);
                    var element2 = document.querySelector('div[id^="lptopspacer"]');

                    element.style.display = 'none';
                    element2.style.display = 'none';
                }
            }
        }
    });
})();

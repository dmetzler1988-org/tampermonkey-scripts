# tampermonkey-scripts

Various scripts for tampermonkey browser-plugin.

## Installation

1. Install the [Tampermonkey](https://tampermonkey.net/) plugin for your browser.
2. After installation you need to create a new user script.
3. Now you can copy-paste a tool to this new script.
4. Make sure, that the script is activated in Tampermonkey.
5. Reload or open new pages and et voilà: the script shows his functions.

## Overview

### [lastpass/error-disabler.js](./lastpass/error-disabler.js)

This disables the error popup from LastPass, which occurs too many times.

### [github/do-not-merge.js](./github/do-not-merge.js)

Keywords are: `wip` and `draft`.  
The keywords can be modified in the script itself and they are case-insensitive.

- It disables the merge button on GitHub pull request page which contains one of the keywords in title.
- It also increase the opacity of the merge-request item on pull-request list, if it contains one of the keywords.

### [jira/copy-issue-number.js](./jira/copy-issue-number.js)

With this script you can easily copy the number of selected Jira Issue/Task into your clipboard.

It works with a key eventlistener (can be modified) and is set to key: `´`.  
You need to modify the `match` and `DOMAIN` URL to your Jira board for a better match and to make it sure, that it only works there.

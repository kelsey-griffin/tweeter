# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Features

Single Page Interface utilizing: 
  - JQuery for DOM manipulation
  - AJAX Post and Get requests
  - Responsive Design elements for mobile view and desktop  

After loading the page for the first time, the user will be met with a few sample tweets, the user avatar, and a navigation bar. Selecting the button in the top right, `✍︎`, will reveal and focus the user on a form for entering new tweets. Clicking the button again will hide the form.

#### Simply type and press tweet! 
The tweet will appear at the top of the tweet list (reverse-chronological order i.e. newest to oldest).

As the user types, a counter in the bottom right corner of the tweet form will relay the number of allowed characters left in the tweet. If the tweet becomes too long, the counter will reflect that with red lettering and a negative number. 

A temporary error message will appear within the page if tweet is too long or if no content has been entered into the form. 
Cross-site scripting prevention methods in place - so don't bother with any funny business! 

Once the form is submitted, it is cleared, the counter is reset, and the user is refocused to the tweet form. All set for another tweet!

## Dependencies

- Express
- Body Parser
- Chance
- Node 5.10.x or above

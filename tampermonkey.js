// ==UserScript==
// @name         Youtube Comment OBS Connector
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Display Youtube comments in your OBS stream
// @author       Josh Wulf <josh@magikcraft.io>
// @match        https://www.youtube.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @require       https://raw.github.com/jwulf/MonkeyConfig/master/monkeyconfig.js
// @require       https://raw.githubusercontent.com/jwulf/monstercat-obs-connector/master/OBSWebsocket.min.js
// ==/UserScript==

/* declare OBSWebSocket:false, MonkeyConfig:false */

// Massive shout-out to Brendan Hagan for the OBS web socket!

const YTCommentBoxSource = 'YTCommentBox'

const moddedClass = "__obs__modded__";
const obs = new OBSWebSocket();

; (async function () {
  "use strict";

  GM_addStyle("yt-live-chat-text-message-renderer:hover { background-color: blue }")

  createHideCommentButton()

  var cfg = new MonkeyConfig({
    title: "YouTube Comments OBS Connector Configuration",
    menuCommand: true,
    params: {
      OBSWebSocketPluginAddress: {
        type: "text",
        default: "localhost:4444"
      },
      OBSWebSocketPluginPassword: {
        type: "text",
        default: ""
      }
    }
  });

  const OBSWebSocketPluginPassword = cfg.get("OBSWebSocketPluginPassword");
  const OBSWebSocketPluginAddress = cfg.get("OBSWebSocketPluginAddress");

  await obs.connect({
    address: OBSWebSocketPluginAddress,
    password: OBSWebSocketPluginPassword
  });

  console.log(`Now connected to OBS`);
})();

setInterval(() => {
  // Get list of comments in page, using DOM selection
  const comments = document.querySelectorAll('yt-live-chat-text-message-renderer')
  // Add on click handler
  comments.forEach(comment => {
    // Don't reapply to comments that have already been modded in the DOM
    if (comment.classList.contains(moddedClass)) {
      return
    }
    comment.addEventListener('click', () => {
      console.log('Clicked comment...')
      // Extract the comment from the DOM
      const authorPhoto = comment.querySelector('#author-photo')
      const authorPhotoUrl = authorPhoto.querySelector('#img').src
      const content = comment.querySelector('#content')
      const message = content.querySelector('#message').innerHTML
      const authorChip = content.querySelector('yt-live-chat-author-chip')
      const author = authorChip.querySelector('#author-name').textContent
      console.log(`${author} - ${message} - ${authorPhotoUrl}`)

      const baseUrl = 'https://jwulf.github.io/obs-youtube-comment/comment.html'
      const url = `${baseUrl}?comment-text=${encodeURIComponent(message)}&author-photo=${encodeURIComponent(authorPhotoUrl)}&author-name=${encodeURIComponent(author)}`
      obs.send("SetSourceSettings", {
        sourceName: "YTCommentBox",
        sourceSettings: {
          url
        },
      }).catch(console.log)
      showComment()
    })
    console.log('Added click handler...')
    // Add the modded class so we know we've already modified this one
    comment.classList.add(moddedClass)
  })
}, 1000);

async function hideComment() {
  const { name } = (await obs.send("GetCurrentScene"));
  console.log(`Hiding Comment in OBS for scene ${name}`)
  obs.send("SetSceneItemProperties", {
    "scene-name": name,
    item: YTCommentBoxSource,
    visible: false,
  }).catch(console.log)
  obs.send("TransitionToProgram").catch(console.log)
}

async function showComment() {
  const { name } = (await obs.send("GetCurrentScene"));
  console.log(`Showing Comment in OBS for scene ${name}`)
  obs.send("SetSceneItemProperties", {
    "scene-name": name,
    item: YTCommentBoxSource,
    visible: true,
  }).catch(console.log)
  obs.send("TransitionToProgram").catch(console.log)
}

function createHideCommentButton() {
  const header = document.querySelector('yt-live-chat-header-renderer')
    .querySelector('#primary-content')
  const hideCommentButton = document.createElement('span')
  hideCommentButton.id = 'obs-hide-comment'
  hideCommentButton.classList.add('style-scope')
  hideCommentButton.classList.add('yt-live-chat-header-renderer')
  const button = document.createElement('button')
  button.classList.add('style-scope')
  button.classList.add('yt-live-chat-header-renderer')
  button.id = 'obs-hide-comment-button'
  button.innerHTML = 'Hide Comments in OBS'
  button.addEventListener('click', hideComment)
  hideCommentButton.appendChild(button)
  header.appendChild(hideCommentButton)
}
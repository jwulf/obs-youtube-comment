// ==UserScript==
// @name         Monstercat OBS Connector
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Update a ticker in your OBS stream with the currently playing track from Monstercat.com
// @author       Josh Wulf <josh@magikcraft.io>
// @match        https://youtube.com/live_chat*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @require       https://raw.github.com/jwulf/MonkeyConfig/master/monkeyconfig.js
// @require       https://raw.githubusercontent.com/jwulf/monstercat-obs-connector/master/OBSWebsocket.min.js
// ==/UserScript==

// Massive shout-out to Brendan Hagan for the OBS web socket!

const commentTextSource = 'YTCommentText'
const commentPhotoSource = 'YTCommentPhoto'
const commentAuthorSource = 'YTCommentAuthor'

const sources = [commentTextSource, commentPhotoSource, commentAuthorSource]

const moddedClass = "__obs__modded__"

(async function() {
    "use strict";

    GM_addStyle(".yt-live-chat-item-list-renderer:hover { background-color: blue }")
  
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
  
    const obs = new OBSWebSocket();
  
    await obs.connect({
      address: OBSWebSocketPluginAddress,
      password: OBSWebSocketPluginPassword
    });

    // Create a hide button with onclick handler

    console.log(`Now connected to OBS`);
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
            // Extract the comment from the DOM
            const authorPhoto = comment.querySelector('#author-photo')
            const authorPhotoUrl = authorPhoto.querySelector('#img').src
            const content = comment.querySelector('#content')
            const message = content.querySelector('#message').innerHTML
            const authorChip = content.querySelector('yt-live-chat-author-chip')
            const author = authorChip.querySelector('#author-name').textContent
            console.log(`${author} - ${message} - ${authorPhotoUrl}`)
            obs.send("SetSourceSettings", {
                sourceName: commentTextSource,
                sourceSettings: {
                    text: message
                }
            })
            obs.send("SetSourceSettings", {
                sourceName: commentAuthorSource,
                sourceSettings: {
                    text: author
                }
            })
            obs.send("SetSourceSettings", {
                sourceName: commentPhotoSource,
                sourceSettings: {
                    url: authorPhotoUrl
                }
            })
            showComment()
        })
        // Add the modded class so we know we've already modified this one
        comment.classList.add(moddedClass)
    })
    }, 1000);
  })();
  
async function hideComment() {
    sources.forEach(source => 
    await obs.send("SetSceneItemProperties", {
        item: source,
        visible: false,
      }))
}

async function showComment() {
    sources.forEach(source => 
    await obs.send("SetSceneItemProperties", {
        item: source,
        visible: true,
      }))
}
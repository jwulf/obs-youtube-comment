# OBS YouTube Comment

Display YouTube Comments in your OBS stream.

Uses the [OBS WebSocket plugin](https://github.com/Palakis/obs-websocket) and [Tampermonkey](https://www.tampermonkey.net/) browser plugin.

Note: doesn't support emojis yet (see To Do at the bottom).

## To Use 

### OBS Setup

* Install the [OBS WebSocket plugin](https://github.com/Palakis/obs-websocket)
* Configure the password in OBS "Tools > WebSockets Server Plugin".

![](img/websocket-server-settings.png)

* Add three sources to your scene, with the following names:

    - `YTCommentText` of type "Text (FreeType 2)" for the comment text.
    - `YTCommentAuthor` of type "Text (FreeType 2)" for the comment author.
    - `YTCommentPhoto` of type "Browser" for the comment author photo.

* Position and compose them where you want them. You probably want to [enable word-wrapping, and set a custom width](https://lvacula.com/2020/05/obs-studios-word-wrapping-is-weird/).

### Browser Setup

* Install the [Tampermonkey](https://www.tampermonkey.net/) plugin to your browser.
* Open the Tampermonkey settings in your browser.
* Click on "Utilities".
* Paste the following URL into the "Install from URL" text box:

```
https://raw.githubusercontent.com/jwulf/obs-youtube-comment/main/tampermonkey.js
```

* Click "Install".
* Reload the Youtube live chat popup in your browser.

You should now see a userscript loaded on the Tampermonkey plugin.

* Click the Tampermonkey icon in the browser plugins section:

![](img/plugin-loaded.png)

* Click on "Configuration"

![](img/plugin-config.png)

* Enter the password you set for the OBS Web Socket Server plugin.
* Click "Save"
* Reload the page to establish the connection.

* When you mouse over a comment, you will see the background turn blue. Click on the comment to send it to your OBS Stream.

## To Do

Deal with emojis. Some leads: 

    - [Reddit: Using Emojis w/ OBS Text(FreeType 2)](https://www.reddit.com/r/obs/comments/7vn04l/using_emojis_w_obs_textfreetype_2/) and the [OBS GitHub issue](https://github.com/obsproject/obs-studio/issues/3127).
    - The [text-pango](https://obsproject.com/forum/resources/text-pango-multi-language-and-emoji.656/) plugin. (Doesn't do word wrap).

A heavier-weight solution would be to run a local process (or find or write a remote service) that renders the comment into a graphic, and then insert the composed graphic as a browser element source. That's a lot more work than the current solution, which is pretty light-weight.

## Resources

- [OBS Websocket protocol](https://github.com/Palakis/obs-websocket/blob/4.x-current/docs/generated/protocol.md)
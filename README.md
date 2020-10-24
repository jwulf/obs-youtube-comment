# OBS YouTube Comment

Display YouTube Comments in your OBS stream.

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

Deal with emojis.
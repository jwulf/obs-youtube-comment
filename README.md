# OBS YouTube Comment

Display YouTube Comments in your OBS stream.

Uses the [OBS WebSocket plugin](https://github.com/Palakis/obs-websocket) and [Tampermonkey](https://www.tampermonkey.net/) browser plugin.

Note: doesn't support emojis yet (see To Do at the bottom).

## To Use 

### OBS Setup

* Install the [OBS WebSocket plugin](https://github.com/Palakis/obs-websocket)
* Configure the password in OBS "Tools > WebSockets Server Plugin".

![](img/websocket-server-settings.png)

### OBS Scene Setup

* Add a browser source to your scene, with the name `YTCommentBox`.

* Position and size it where you want. 

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

## Notes

This solution renders the comment as HTML, and uses a browser element source, using the same approach taken by [this OBS Clock element](https://gist.github.com/sam0737/a0ee8ca253fc5c84b2aa2ac018f7b8ad#file-clock-html).

It is served via GitHub pages, and uses URL parameters to set the content. 

The text element source does not and will not support emojis, so the original approach using text sources is deprecated: 

    - [Reddit: Using Emojis w/ OBS Text(FreeType 2)](https://www.reddit.com/r/obs/comments/7vn04l/using_emojis_w_obs_textfreetype_2/) and the [OBS GitHub issue](https://github.com/obsproject/obs-studio/issues/3127).
    - The [text-pango](https://obsproject.com/forum/resources/text-pango-multi-language-and-emoji.656/) plugin. (Doesn't do word wrap).

## Resources

- [OBS Websocket protocol](https://github.com/Palakis/obs-websocket/blob/4.x-current/docs/generated/protocol.md)
- [Transparent browser in OBS](https://www.reddit.com/r/youtubegaming/comments/3mi6i2/css_for_overlay_chat_obsclr_browser/)
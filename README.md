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

Deal with emojis. The text element does not and will not support emojis: 

    - [Reddit: Using Emojis w/ OBS Text(FreeType 2)](https://www.reddit.com/r/obs/comments/7vn04l/using_emojis_w_obs_textfreetype_2/) and the [OBS GitHub issue](https://github.com/obsproject/obs-studio/issues/3127).
    - The [text-pango](https://obsproject.com/forum/resources/text-pango-multi-language-and-emoji.656/) plugin. (Doesn't do word wrap).

Another solutionis to render the comment as HTML, and use a browser element source, using the same approach taken by [this OBS Clock element](https://gist.github.com/sam0737/a0ee8ca253fc5c84b2aa2ac018f7b8ad#file-clock-html).

There is work in progress on this in [comment.html]. Preview available [here](https://jwulf.github.io/obs-youtube-comment/comment.html?comment-text=Some%20random%20comment%F0%9F%94%A5&author-photo=https%3A%2F%2Fyt3.ggpht.com%2F-S3bsaaqv62A%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FXR526h_hdzk%2Fs32-c-k-no-mo-rj-c0xffffff%2Fphoto.jpg&author-name=TJump%27s%20couch).

It is served via GitHub pages, and uses URL parameters to set the content. The websocket should modify the browser source to point to this page with the data passed as URI encoded parameters.

## Resources

- [OBS Websocket protocol](https://github.com/Palakis/obs-websocket/blob/4.x-current/docs/generated/protocol.md)
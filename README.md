<div align="left">
        <img src="https://www.electronjs.org/app-img/blink-mind-desktop/blink-mind-desktop-icon-128.png">
</div>

# BlinkMindDesktop

BlinkMindDesktop is an open source mind-map and outliner app.

BlinkMindDesktop is an MIT licensed open source project, and the latest version will always be downloadable for free from the GitHub release page. BlinkMindDesktop is still in development. 

BlinkMindDesktop uses the open source mind-map library [BlinkMind](https://github.com/awehook/blink-mind) for mind-map rendering.

[Insider Preview Version Download](https://github.com/awehook/blink-mind-package/releases/latest)

![image](https://github.com/awehook/images/raw/master/blink-mind-desktop/blink-mind-mindmap-light.png)

![image](https://github.com/awehook/images/raw/master/blink-mind-desktop/blink-mind-mindmap.png)

![image](https://github.com/awehook/images/raw/master/blink-mind-desktop/blink-mind-mindmap-pink.png)

![image](https://github.com/awehook/images/raw/master/blink-mind-desktop/gn-outliner.png)

![image](https://github.com/awehook/images/raw/master/blink-mind-desktop/rich-text-editor.png)

## :rocket: Features

| Feature | Status | Description |
|---------|:------:|-------------|
| Multi sheet | :heavy_check_mark: | Document can insert multi sheets. |
| Basic mind map features | :heavy_check_mark: | Add/remove topic, edit topic content. |
| Undo redo | :heavy_check_mark: | History of map changes |
| Set topic style | :heavy_check_mark: | Set topic style include border, text color, font, background and links. |
| Customize theme | :heavy_check_mark: | Theme editor, import theme, export theme. |
| Shortcuts | :heavy_check_mark: |  Shortcuts to make more efficient. |
| Drag and drop | :heavy_check_mark: |  Support drag one topic and then drop to another topic to reorganize the mind map. |
| Open and save file | :heavy_check_mark: | Save and open .bmind file, double click file to open. |
| Export topic to image | :heavy_check_mark: | Export topic to png/jpg/svg. |
| Insert image to topic | :heavy_check_mark: | Every topic can insert unlimited images. |
| Paste rich text to topic | :heavy_check_mark: | You can paste rich text from browser/microsoft word/apple pages or anything else to BlinkMind without losing format. |
| Rich text editor for topic notes | :heavy_check_mark: |  Rich text editor for topic notes. |
| Focus mode | :heavy_check_mark: |  Select any topic node as the editor root and only show that branch. |
| Outliner mode | :heavy_check_mark: |  Seamlessly switch between mind map and outliner, some outliner's shortcuts are different from mindmap mode. |
| Search  | :heavy_check_mark: |  Search topic content and navigate to it. |
| Tags  | :heavy_check_mark: |  Topics can add tags and you can navigate from tags. |
| Copy topics and paste  | on the way |  Copy multi topics including all the infomation(content,notes,tags and all attachment) and paste to another location(same document or another document).  |
| Topic reference  | on the way |  Topics can reference each other and navigate conveniently. |
| Link curve between any two topics  | on the way |  Link curve between any two topics  |
| Markdown editor  | planing |  When editing topic notes, you can choose use rich html editor or markdown editor, for users  who familiar and like markdown grammar. Markdown editor will support latex and mermaid.  |
| Manual layout diagram  | planing |  Manual layout diagram  |
| Cloud Storage  | planing |  Save and open file from clound storage(icloud/onedrive/google drive).  |

## For Dev

### Develop

To develop locally, you need to have Chrome installed with the [Immutable.js Object Formatter extension](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog).

First download the code and relevant submodules:
```bash
git clone git@github.com:awehook/blink-mind-desktop.git
git submodule init
git submodule update 
```

Install required libraries using `yarn`:
```bash
yarn install
```

Then open three terminals and run:
```bash
yarn dev:r
yarn dev:m
yarn start:m
```

### Build package

```bash
yarn dist
```

## Thanks
![image](https://github.com/awehook/images/raw/master/others/jetbrains-variant-2.svg)
Thanks for [JetBrains](https://www.jetbrains.com/?from=BLINK_MIND_DESKTOP) supporting us the free JetBrains Open Source license(s).
 




# Gallery of Visuals (Icons, Illusatration, ...)

## Introduction

This repository contains visuals:
  * simple (icons, ...)
  * composite (composed of simple visual) such as illustration
  * and photos

```bash
n + icon = nicon
```

That are organized in a [StoryBook](https://storybook.js.org/) and published on the [web](https://gerardnico.com/doc/gallery/)
where they can be searched.

The result can be seen at [https://gerardnico.com/doc/gallery/](https://gerardnico.com/doc/gallery/)


## Usage

To develop your own gallery, you need to (only once):

  * Copy this repo
  * Delete the content of the [gallery folder](./gallery/)
  * Delete the content of the [stories folder](./stories/)

then you can develop your gallery:

  * Add your images in the [gallery folder](./gallery/).
  * [Optional] Add a markdown file with the same name than your image for documentation
  * Generate the stories

```bash
yarn generate
```

  * Start storybook to verify

```bash
yarn start
```

  * Build. The build:
     * takes the Gallery Url given in the [.env.production](.env.production) file
     * generate the story with it
     * generate the static storybook
     * re-generate the stories with no Gallery Url as set in the [.env](.env) file

```bash
yarn build
```

  * Transfer the [storybook-static directory](./storybook-static) on your web server. Example: [https://gerardnico.com/doc/gallery/](https://gerardnico.com/doc/gallery/)


## Licence

The metadata of each original svg (ie made by me) contains:
  * Description
  * Title
  * Rights: https://creativecommons.org/licenses/by-nc-sa/4.0/
  * Publisher: https://gerardnico.com/nicon
  * License: CC Attribution-NonCommercial-ShareAlike

The other:
  * have a documentation associated with a markdown file with the licence described 
  * or are royalty free

See also [the threshold of originality](https://commons.wikimedia.org/wiki/Commons:Threshold_of_originality).

![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

## TODO

Add Emoji

They can be used in Markdown

  * :point_right: 
  * :white_check_mark:
  * :muscle: 
  * :tada:
  * :speak_no_evil:
  * :robot_face:

## Doc

  * [Design Rules](./doc/design_rule.md)
  * [Command History of this repo](./doc/command_history.md)
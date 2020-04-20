import fs from 'fs';
import pathapi from 'path';
import { toStoryHierarchy } from './story'

/**
 * This file should not be called from a story
 * because it imports Node library
 * and that will therefore not work
 * You would get a `Can't resolve 'fs'`
 */

/**
 * Return a javascript storybook stories based on a
 * traversal of the gallery
 * @param dir - a directory where the images are stored
 */
export function generateStory(dir) {
    let title = toStoryHierarchy(dir)
    let script =
        `import { base, filename } from 'paths.macro';

export default {
    title: "${title}"
};

`
    let stories = '';
    let dirEntries = fs.readdirSync(dir, {
        encoding: 'utf8',
        withFileTypes: true
    });
    let markdown = '';
    let previousStoryName  = '' ;
    for (let e of dirEntries) {
        if (e.isFile()) {
            let extName = pathapi.extname(e.name);
            let baseName = pathapi.basename(e.name);
            let storyName = pathapi.basename(e.name, extName);

            // New Story
            // Closing the story code
            if (storyName != previousStoryName && previousStoryName != '') {
                // Markdown code should come at the end of a story
                if (markdown != '') {
                    stories += markdown;
                    markdown = '';
                }
                stories += `\n`;

            }

            // Process the file
            if (extName != ".md") {
                stories = stories + `export const ${storyName} = () => '<img src="${dir}${baseName}" alt="${storyName.replace("_", " ")}" >";\n`;
            } else {
                markdown = `import markdown${storyName} from '../${dir}${baseName};\n`;
                markdown += `${storyName}.story = {
  name: "${storyName}",
  parameters: {
    notes: { markdown${storyName} }
  }
};\n`
            }

            previousStoryName = storyName;
        }
    }

    script = script + stories;
    return script;

}


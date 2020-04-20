import fs from 'fs';
import pathapi from 'path';
import os from 'os';

/**
 * Take a path from a stories and return a path
 * to be used in a story group configuration
 * 
 * Path argument would come from
 * https://www.npmjs.com/package/paths.macro
 * 
 * @param {String} dirName - the relative directory path with an ending slash (no starting slash)
 * @param {String} fileName - the file name of the stories (optional) - if called from a story
 */
export function toStoryHierarchy(dirName, fileName) {

    // Delete the first directory (the gallery)
    // Delete the first slash
    dirName = dirName.substring(1, dirName.length);
    // Delete until the second slash included
    dirName = dirName.substring(dirName.indexOf("/") + 1, dirName.length);

    // Return

    if (typeof fileName === 'undefined') {
        return dirName
            .replace("_", " ") // replace the _
            .substr(0, dirName.length - 1); // suppress the last /
    } else {
        fileName = fileName.substr(0, fileName.indexOf("."));
        return (dirName + fileName).replace("_", " ");
    }

}


/**
 * Return a javascript storybook stories based on a
 * traversal of the gallery
 * @param dir - a directory where the images are stored
 */
export function generate(dir) {
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
    for (let e of dirEntries) {
        if (e.isFile()) {
            let extName = pathapi.extname(e.name);
            let baseName = pathapi.basename(e.name);
            let storyName = pathapi.basename(e.name, extName);

            if (extName != ".md") {
                stories = stories + `export const ${storyName} = () => '<img src="${dir}${baseName}" alt="${storyName.replace("_", " ")}" >";\n`;
            }

        }
    }

    script = script + stories;
    return script;

}


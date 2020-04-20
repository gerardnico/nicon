import * as pathapi from "path";

/**
 * Take a path from a stories and return a path
 * to be used in a story group configuration
 * 
 * Path argument would come from
 * https://www.npmjs.com/package/paths.macro
 * 
 * @param {String} dirName - the relative directory path with a ending slash
 * @param {String} fileName - the file name of the stories (optional) - if called from a story
 */
export function toStoryHierarchy(dirName, fileName) {

    dirName = dirName.substring("/stories/".length, dirName.length);
    if (typeof fileName === 'undefined') {
        return dirName
        .replace("_", " ") // replace the _
        .substr(0,dirName.length-1); // suppress the last /
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
};`
    return script;

}


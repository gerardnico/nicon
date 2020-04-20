/**
 * A file with function that can be used in story
 * because there is no node library imported
 */

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



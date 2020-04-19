
/**
 * Take a path from a stories and return a path
 * to be used in a story group configuration
 * 
 * Path argument would come from
 * https://www.npmjs.com/package/paths.macro
 * 
 * @param {String} base
 * @param {String} filename
 */
export function toStoryHierarchy(base, filename) {
    base = base.substring("/stories/".length,base.length);
    filename = filename.substr(0, filename.indexOf("."));
    return (base + filename).replace("_"," ");
}


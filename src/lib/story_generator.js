let fs = require('fs');
let path = require('path');
let story = require('./story');

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
 * @param galleryUrl - the http home path - set only when building normally
 *    example if the file are 
 *        * in a github account named `gerardnico`
 *        * in a repository name `nicon`
 *        * in a directory named `gallery`
 * Then the web home would be https://raw.githubusercontent.com/gerardnico/nicon/master/gallery/
 * 
 */
let generateStoryScript = function generateStoryScript(dir, galleryUrl) {

    if (typeof galleryUrl === 'undefined') {
        throw new Error("Gallery Url is undefined")
    }

    let title = story.toStoryHierarchy(dir)
    let script =
        `export default {
    title: "${title}"
};

`
    let stories = '';

    let dirEntries = fs.readdirSync(dir, {
        encoding: 'utf8',
        withFileTypes: true
    });

    // File Path for import of markdown file
    let fsDir = dir.replace(/\\/mg, '/');
    // Story path without the first directory for StoryBook
    let httpDir = fsDir.substring(fsDir.indexOf("/") + 1, fsDir.length);

    // Variable
    let markdown_import = '';
    let markdown_name = '';

    // The variable name
    let storyId = '';
    let previousStoryId = '';
    // The storybook properties
    let storyProperties = {};

    // Loop
    for (let e of dirEntries) {
        if (e.isFile()) {
            let extName = path.extname(e.name);
            let baseName = path.basename(e.name);
            if (baseName.toLowerCase() == 'README.md'.toLowerCase()) {
                continue;
            }
            let storyBaseName = path.basename(e.name, extName)
                .replace(/-/mg, "_");
            let storyId = 'story_' + storyBaseName; // To avoid a file called `in` for India - in is a reserved javascript word            

            // New Story
            if (previousStoryId != '' && previousStoryId != storyId) {

                // Build the stories properties
                // Markdown code should come at the end of a story
                if (markdown_name != '') {
                    stories += markdown_import;
                    storyProperties.parameters = {};
                    storyProperties.parameters.notes = `{ ${markdown_name} }`;

                    // Reset variable
                    markdown_name = '';
                    markdown_import = '';
                }

                stories += `${previousStoryId}.story = ${JSON.stringify(storyProperties)};\n`
                stories += `\n`;

                // Reset Properties
                storyProperties = {};
            }

            // Story Description is after the properties of the previous story
            storyProperties.name = storyBaseName.replace(/_/mg, " ");

            // Process the file
            if (extName != ".md") {
                stories = stories + `export const ${storyId} = () => '<img src="${galleryUrl}${httpDir}/${baseName}" alt="${storyProperties.name}" >';\n`;
            } else {
                markdown_name = `markdown_${storyId}`;
                markdown_import = `import ${markdown_name} from '../${fsDir}/${baseName}';\n`;
            }
            previousStoryId = storyId;
        }
    }

    // Cloture the last story
    if (storyProperties != {}) {
        stories += `${previousStoryId}.story = ${JSON.stringify(storyProperties)};\n`
    }
    stories += `\n`;

    script = script + stories;
    return script;

}


/**
 * 
 * @param {*} dir - the directory where the gallery is
 */
module.exports.traverseGallery = function traverseGallery(dir, galleryUrl) {
    try {

        const isDirectory = source => fs.lstatSync(source).isDirectory();
        if (!isDirectory(dir)) {
            throw new Error(dir + " is not a directory");
        }
        if (getFiles(dir).length > 0) {
            let script = generateStoryScript(dir, galleryUrl);
            let baseName = path.basename(dir);
            let scriptFileName = 'stories/' + baseName + '.stories.js';
            fs.writeFile(scriptFileName, script, (err) => {
                if (err) throw err;
                console.log("The file " + scriptFileName + " has been saved!");
            });
        }
        for (let f of getDirectories(dir)) {
            traverseGallery(f, galleryUrl);
        }
    } catch (err) {
        throw new Error(err);
    }
}

let getFiles = function (dir) {

    return fs.readdirSync(dir)
        .map(file => path.join(dir, file))
        .filter(path => fs.statSync(path).isFile());

}
let getDirectories = function getDirectories(dir) {

    return fs.readdirSync(dir)
        .map(file => path.join(dir, file))
        .filter(path => fs.statSync(path).isDirectory());

}

module.exports.getFiles = getFiles;
module.exports.getDirectories = getDirectories;
module.exports.generateStoryScript = generateStoryScript;
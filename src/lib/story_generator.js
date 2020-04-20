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
 */
let generateStoryScript = function generateStoryScript(dir) {
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
    let markdown = '';
    let previousStoryName = '';
    for (let e of dirEntries) {
        if (e.isFile()) {
            let extName = path.extname(e.name);
            let baseName = path.basename(e.name);
            let storyBaseName = path.basename(e.name, extName)
                .replace(/-/mg, "_");
            let storyName = 'story_' + storyBaseName; // To avoid a file called `in` for India - in is a reserved javascript word
            let storyDescription = storyBaseName.replace(/_/mg, " ");

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
                stories = stories + `export const ${storyName} = () => '<img src="${httpDir}/${baseName}" alt="${storyDescription}" >';\n`;
            } else {
                if (baseName.toLowerCase() != 'README.md'.toLowerCase()) {
                    markdown = `import markdown_${storyName} from '../${fsDir}/${baseName}';\n`;
                    markdown += `${storyName}.story = {
  name: "${storyDescription}",
  parameters: {
    notes: { markdown_${storyName} }
  }
};\n`
                }
            }
            previousStoryName = storyName;
        }
    }

    script = script + stories;
    return script;

}


/**
 * 
 * @param {*} dir - the directory where the gallery is
 */
module.exports.traverseGallery = function traverseGallery(dir) {
    try {

        const isDirectory = source => fs.lstatSync(source).isDirectory();
        if (!isDirectory(dir)) {
            throw new Error(dir + " is not a directory");
        }
        if (getFiles(dir).length > 0) {
            let script = generateStoryScript(dir);
            let baseName = path.basename(dir);
            let scriptFileName = 'stories/' + baseName + '.stories.js';
            fs.writeFile(scriptFileName, script, (err) => {
                if (err) throw err;
                console.log("The file " + scriptFileName + " has been saved!");
            });
        }
        for (let f of getDirectories(dir)) {
            traverseGallery(f);
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
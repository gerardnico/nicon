fs = require('fs');
path = require('path');

dir = 'gallery\\composite\\illustrations';
fs.readdirSync(dir)
    .map(file => path.join(dir, file))
    .filter(p => fs.statSync(p).isFile())
    .filter(p => path.extname(p) == ".svg" )
    .filter(p => {
        baseName = path.basename(p);
        lastPart = baseName.substring(baseName.lastIndexOf("_"));
        result = lastPart.match(/[0-9]/g);
        return result != null;
    })
    .forEach(p => {
        baseName = path.basename(p);
        newName = path.join(dir, baseName.substr(0, baseName.lastIndexOf("_")))+".svg";
        fs.renameSync(p,newName);
        console.log("Renamed to "+newName);
    });
const fs = require("fs");

var writeNoteToFile = function (title, body) {
    let jsonStringified;
    const jsonExampleEmpty = {
        notes: [{
            title: title,
            body: body
        }]

    }

    const jsonExampleAppend = {
        title: title,
        body: body
    }
    // read the existing content
    let notesContent = readNotesFromFile();

    if (notesContent) {
        let notesObject = JSON.parse(notesContent);
        let notesArray = notesObject.notes;
        console.log(notesObject);
        notesArray.push(jsonExampleAppend);
        jsonStringified = JSON.stringify(notesObject);
        console.log("++", notesObject);
        fs.writeFileSync("notes.json", jsonStringified);
    } else {
        jsonStringified = JSON.stringify(jsonExampleEmpty);
        fs.writeFileSync("notes.json", jsonStringified);
    }

}

var readNotesFromFile = () => {
    let fileContent = fs.readFileSync("notes.json", "utf8");
    return fileContent;
}

var readNoteFromFile = (title) => {
    let fileContent = fs.readFileSync("notes.json", "utf8");
    let notesObject = JSON.parse(fileContent);
    let returnObj;
    if (notesObject) {
        let notesArray = notesObject.notes;
        notesArray.forEach((noteObj) => {
            if (noteObj && noteObj.title && noteObj.title === title) {
               returnObj = noteObj;
            }
        });
    }
    return returnObj;
}

module.exports = {
    writeNoteToFile: writeNoteToFile,
    readNoteFromFile: readNoteFromFile,
    readNotesFromFile: readNotesFromFile
}
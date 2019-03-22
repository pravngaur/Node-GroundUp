const fileHelper = require("./fileHandlerHelper");
const yargs = require("yargs");

//Add note command
yargs.command({
    command: "addNote",
    describe: "Add a note to the file system.",
    handler: function(){
        fileHelper.writeNoteToFile(yargs.argv.title, yargs.argv.body);
        console.log("Note successfully written to the file.");
    },builder:{
        title:{
            describe: "This is for title",
            demandOption: true,
            type: "string"
        },
        body:{
            describe:"this is for body.",
            type: "string",
            demandOption: true,
        }
    }
});

//Read all notes command
yargs.command({
    command: "readAllNotes",
    handler: function(){
        const notes = fileHelper.readNotesFromFile();
        console.log("Here are all your notes:");
        console.log(notes);
    }
});

//reading a particular note
yargs.command({
    command: "readNote",
    describe: "Read a note from the file system.",
    handler: function(){
        //const noteObj = fileHelper.readNoteFromFile(yargs.argv.title);
        console.log("Your note is: ", fileHelper.readNoteFromFile(yargs.argv.title));
    },builder:{
        title:{
            describe: "This is for title",
            demandOption: true,
            type: "string"
        }
    }
});

yargs.parse();
/**
 * Yargs is the Node JS module that lets developers to work with the terminal commands with some prebuild utilities.
 * It wraps the process object.
 */

 const yargs = require("yargs");

 
 //Adding a note
 yargs.command({
     command:"addNote",
     handler: function(){
         console.log('Adding a note.');
         console.log('Titile:', yargs.argv.title);
         console.log('Body:', yargs.argv.body);
    },
    builder:{
        title:{
            describe: "This is for title",
            demandOption: true,
            type: "string"
        },
        body:{
            describe:"this is for body.",
            type: "string"
        }
    },
     describe:"Lets users to add notes."
 });
 
 //reading a note
 yargs.command({
    command:"readNote",
    handler: function(){
        console.log('reading a note.');
   },
    describe:"Lets users to add notes."
});

//listing the note
yargs.command({
    command:"listingNote",
    handler: function(){
        console.log(yargs.argv);
   },
    describe:"Lets users to add notes."
})

//Removing a given note
yargs.command({
    command:"removingNote",
    handler: function(){
        console.log('Removing a given note.');
   },
    describe:"Lets users to add notes."
})  
yargs.parse();
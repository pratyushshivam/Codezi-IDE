// Retrieve Elements 
 consoleLogList = document.querySelector(".editor__console-logs")
 executeCodeBtn = document.querySelector('.editor__run')
 resetCodeBtn = document.querySelector('.editor__reset')

//Setup Ace
var editor = ace.edit("editor");
var defaultCode = 'console.log("Welcome to codezi")'
var consoleMessages = [];


var editorLib = {
    clearConsoleScreen(){
        consoleMessages.length = 0;

        //Remove all elements in the log list
        while(consoleLogList.firstChild){
            consoleLogList.removeChild(consoleLogList.firstChild)
        }

    },
    printToConsole(){
        consoleMessages.forEach(log =>{
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class;
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);

            consoleLogList.appendChild(newLogItem);
        })

    },
    init(){
        //Configure Ace


        //Set a theme
         editor.setTheme("ace/theme/dracula");


         //Set language

         editor.session.setMode("ace/mode/javascript");

         //Set options
         //set default code
         editor.setValue(defaultCode)
        



    }
}

//Events
executeCodeBtn.addEventListener('click', () => {
     //clear the console messages
     editorLib.clearConsoleScreen();
    // Get input from the code editor
    const userCode = editor.getValue();

    // Run the user code    
    try {
        new Function(userCode)();
    } catch (err) {
        console.error(err);
    }


    //Print to console
    editorLib.printToConsole();


});


resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    editor.setValue(defaultCode);

    //clear the console messages
    editorLib.clearConsoleScreen();
})





editorLib.init();
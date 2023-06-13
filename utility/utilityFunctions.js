const inquirer = require('inquirer');
const fs = require('fs');

function ask(question) {
    return inquirer.prompt(question)
}
function loadTemplate(path) {
    return file = fs.readFileSync(path, 'utf-8');
}

function containsExtension(fileName, pattern) {
    return pattern.test(fileName);
}
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function writeToFile(path,template){
    fs.writeFileSync(path,template);
}
module.exports={
    ask,
    loadTemplate,
    containsExtension,
    capitalizeFirstLetter,
    writeToFile
}



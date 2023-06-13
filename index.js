#!/usr/bin/env node
const figlet=require('figlet');
const gradient = require('gradient-string');
const { ask, loadTemplate, containsExtension, writeToFile ,capitalizeFirstLetter} = require('./utility/utilityFunctions');

const cwd = process.cwd();

const buffer=Buffer.from('E29C85','hex');
const checkMark=buffer.toString('utf-8');


console.log(
  figlet.textSync("TEMPLATE WIZARD!", {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 120,
    whitespaceBreak: true,
  })
);


ask([
  {
    type: 'list',
    name: 'tech',
    message: 'Which template do you want to create?',
    choices: ['React', 'HTML'],
    default: 'React'
  }
]).then((firstAnswer) => {
  const tech = firstAnswer.tech;

  ask([
    {
      type: 'input',
      name: 'name',
      message: tech === 'React' ? "Enter the Component's name:" : "Enter the name of the file:"
    }
  ]).then((secondAnswer) => {
    const isReactTemplate = tech === 'React';
    const extensionRegex = isReactTemplate ? /.js/i : /.html/i;
    const fileName = containsExtension(secondAnswer.name, extensionRegex) ? secondAnswer.name : secondAnswer.name + (isReactTemplate ? '.js' : '.html');

    const templatePath = isReactTemplate ? '/templates/react-template.txt' : '/templates/html-template.txt';
    const template = loadTemplate(__dirname + templatePath);

    const modifiedFileName = isReactTemplate ? capitalizeFirstLetter(fileName.toLowerCase()) : fileName.toLowerCase();

    const replacedTemplate = isReactTemplate ? template.replace(/{Component-Name}/g, modifiedFileName.replace(/.js/, '')) : template;

    try{
        writeToFile(`${cwd}/${modifiedFileName}`, replacedTemplate);
        console.log(checkMark+"The File Was Created Successfully");
    }catch(error){
        console.log("An Error has occured:"+error);
    }
    
  });
});


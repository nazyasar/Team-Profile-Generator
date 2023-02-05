// node
const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/page-template.js");

// lib
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const staffMemberData = [];

const questions = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is your ID number?",
      name: "id",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
    },
    {
      type: "list",
      message: "What is your role?",
      name: "role",
      choices: ["Engineer", "Intern", "Manager"],
    },
  ]);

  // if manager selected

  if (answers.role === "Manager") {
    const managerAnswers = await inquirer.prompt([
      {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
      },
    ]);
    const newManager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      managerAnswers.officeNumber
    );
    staffMemberData.push(newManager);

    // if engineer selected
  } else if (answers.role === "Engineer") {
    const engineerAnswers = await inquirer.prompt([
      {
        type: "input",
        message: "What is your GitHub name?",
        name: "github",
      },
    ]);
    const newEngineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      engineerAnswers.github
    );
    staffMemberData.push(newEngineer);

    // if intern selected
  } else if (answers.role === "Intern") {
    const internAnswers = await inquirer.prompt([
      {
        type: "input",
        message: "What is your school name?",
        name: "school",
      },
    ]);

    const newIntern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      internAnswers.school
    );
    staffMemberData.push(newIntern);
  }
};

async function promptQuestions() {
  await questions();

  const addMemberAnswer = await inquirer.prompt([
    {
      name: "addMember",
      type: "list",
      choices: ["Add a new member", "Create team"],
      message: "What would you like to do next?",
    },
  ]);

  if (addMemberAnswer.addMember === "Add a new answer") {
    return promptQuestions();
  }
  return createTeam();
}

promptQuestions();

function createTeam() {
  console.log("new staff", staffMemberData);
  fs.writeFileSync(
    "./output/index.html",
    generateTeam(staffMemberData),
    "utf-8"
  );
}

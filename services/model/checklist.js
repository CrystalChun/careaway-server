/* Checklist Widget Model
 *
 * description: array of question objects
 */


var Question = require('./question');

function Checklist (questions, due) {
  // for db table
  this.label = "meter"
  this.list = questions || [];
  this.due_date = due || new Date(Date.now());
  this.created_at = new Date(Date.now());
  this.updated_at = null;
}

// add single question objects to checklist
Checklist.prototype.setQuestion = function (newQuestion) {
  // require new question to be a question object
  Question.question = newQuestion;
  // add question to checklist
  this.list.push(Question.question);

  this.updated_at = new Date(Date.now());
}

// add multiple question objects to checklist
Checklist.prototype.setQuestions = function (questions) {
  questions.forEach(()=> {
    // require new questions to be a question objects
    Question.question = this;
    // add each question object to checklist
    this.list.push(Question.question);
  })

  this.updated_at = new Date(Date.now());
}

module.exports = Checklist;

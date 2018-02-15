/* Question Object for Checklist Widget
 *
 * description: string question and boolean (False) flag
 */

function Question (question) {
  this.question = question || '';
  this.check = false;
}

Question.prototype.setQuestion = function(question) {
  this.question = question;
}

Question.prototype.setCheck = function() {
  this.check = true;
}

module.exports = Question;

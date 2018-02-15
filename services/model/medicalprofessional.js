var user = require('./users');
var security = require('./security');

function MedicalProfessional (firstname, lastname , medicalcode, username, password, salt, securityQ1, securityA1, securityQ2, securityA2, securityQ3, securityA3) {
   user.username = username;
   user.password = password;
   user.salt = salt;
   security.securityQ1 = securityQ1;
   security.securityA1 = securityA1;
   security.securityQ2 = securityQ2;
   security.securityA2 = securityA2;
   security.securityQ3 = securityQ3;
   security.securityA3 = securityA3;
   
   this.firstname = firstname || '';
   this.lastname = lastname || '';
   this.medicalcode = medicalcode || '';
   this.username = user.username || '';
   this.password = user.password || '';
   this.salt = user.salt || '';
   this.securityQ1 = security.securityQ1 || '';
   this.securityA1 = security.securityA1 || '';
   this.securityQ2 = security.securityQ2 || '';
   this.securityA2 = security.securityA2 || '';
   this.securityQ3 = security.securityQ3 || '';
   this.securityA3 = security.securityA3 || '';
}

MedicalProfessional.prototype = Object.create(user.prototype);

MedicalProfessional.prototype.DisplayName = function ()  {
    return 'Dr. '+ this.firstname +' '+ this.lastname;
};

module.exports = MedicalProfessional;
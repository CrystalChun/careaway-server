# careaway-server
The server for the CareAway web application.

## Setup 
1. Clone the repository `git clone https://github.com/CrystalChun/careaway-server.git`
2. Create a data folder to house your mongo data
   * On terminal it's `mkdir data`
3. Start mongodb database `mongod --port 27017 --dbpath /path/to/data/folder/data`
4. Go into the project's folder `cd careaway-server` and run `node services` to start the server
## Dependencies
To install the dependencies available in package.json, run `npm install`. 

Currently in the package.json:
* express
* morgan
* body-parser
* module-alias
* helmet
* cors
* promise
* mongodb
* consign
## Module Aliases
#### Description
The `module-alias` library allows the following aliases to be used throughout the files on the server. It encapsulates the routes to each of these locations within the server to make the importing files both cleaner and less error-prone.
`@root` .

#### Account API
| Alias           | Route                                             | 
| :-------------: |---------------------------------------------------| 
| `@account`      | ./services/account_management                     | 
| `@accountModels`| ./services/account_management/app/models          |
| `@accountConfig`| ./services/account_management/config/index.js     |
| `@accountAPI`   | ./services/account_management/config/app.js       |

#### Appointment API
| Alias                | Route                                                 | 
| :-------------------:|-------------------------------------------------------| 
| `@appointment`       | ./services/appointment_scheduling                     |
| `@appointmentModels` | ./services/appointment_scheduling/app/models          |
| `@appointmentConfig` | ./services/appointment_scheduling/config/index.js     |
| `@appointmentAPI`    | ./services/appointment_scheduling/config/app.js       |



#### Treatment Plan API
| Alias             | Route                                            | 
| :---------------: |--------------------------------------------------| 
| `@treatment`      | ./services/treatment_management                  |
| `@treatmentModels`| ./services/treatment_management/app/models       |
| `@treatmentConfig`| ./services/treatment_management/config/index.js  |
| `@treatmentAPI`   | ./services/treatment_management/config/app.js    |







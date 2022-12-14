import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


import '/imports/api/masters'
import '/imports/api/moving_information'
import '/imports/api/materials'
import '/imports/api/staff'
import '/imports/api/masters'
import '/imports/api/order_service'
import '/imports/api/clients'


const SEED_USERNAME = 'KarasiK';
const SEED_PASSWORD = '1';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    console.log("Create User")
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});

//   const user = Accounts.findUserByUsername(SEED_USERNAME);
//
// ServiceConfiguration.configurations.upsert(
//     { service: 'github' },
//     {
//       $set: {
//         loginStyle: 'popup',
//         clientId: '',
//         secret: '',
//       },
//     }
// );


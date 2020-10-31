# node-api

#npm install 

It will install the packages.

#npm run dev

To start the server.

#npm run lint

To check the linting.

## use the postman collection and database file for quick setup which are docs folder

Tables- users,employee
Total APIs : 10
APIs:
 - register
 -login
 -update password(only after login)
 -update password(not login)
 -check user for password change()
 -autocomplete(check with first_name only)
 -logout
 -user listing(filters-firstName,lastName,empId,companyName,order with pagination )
 -fetch user data with id
 -fetch employee details of logged in user

Database used: mysql

*In update password i am assuming that there will be otp and user will enter that but the code has not included

In the doc folder I have added the MySql collection(test) and postman collection also.

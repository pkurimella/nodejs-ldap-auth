# nodejs-ldap-auth
A sample to demonstrate ldap auth with node js


#### Setup
1. Run the openldap as docker container using https://github.com/osixia/docker-openldap
   ```
   docker run -p 389:389 -p 636:636 --name my-openldap-container --detach osixia/openldap:1.2.5
   ```
2. Using LDAP browser add a user to LDAP Directory / Change the test user id & pwd to admin
3. npm install
4. npm test

#### Other tools required
Apache Directory Studio - LDAP Browser

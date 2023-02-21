Performance testing for https://restful-booker.herokuapp.com/ using k6. 

The test flow:
1. Load users from data.json.
2. Create users using the POST method.
3. Get users using the GET service and compare with data.json.
4. Delete users, which were created.
5. Generate a report from the test process. 


Run tests: k6 run testAPI.js

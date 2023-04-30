# Steps to run the Cypress tests:

1) Run the following command on terminal to run with docker-compose.

**docker-compose up --build**

2) If you want to run test cases manually in headless mode please run the following command on terminal.

**npm install && npm run cypress:e2e**

3) If you want to run and watch test running in headed mode, execute following command.

**npm run cypress:headed**

4) If you want to run specific test case for e.g with following command to run API spec only

**npx cypress run --spec "cypress/e2e/apiMovies.cy.js"**

# Test Scenario's

### Feature: Login Functionality

    Scenario: login successfully
        Given I am on login page
        And I enter valid username
        And I enter valid password
        When I click on "Login" button
        Then I should be navigated to dashboard page

    Scenario: login with invalid credentials unsuccessful
        Given I am on login page
        And I enter invalid username
        And I enter invalid password
        When I click on "Login" button
        Then I should see error message

    Scenario: login with empty Password unsuccessful
        Given I am on login page
        And I enter valid username
        When I click on "Login" button
        Then I should see error message "Please enter your password"   

    Scenario: logout successfully
        Given I am on dashboard page after login successfully
        And I click on the profile dropdown menu
        When I click on "Log out" button
        Then I should be navigated to login page

    Scenario: logout successfully and verifying back browser button not login back
        Given I have logged out successfully
        And I have been navigated to login page
        When I click on browser "back arrow" button
        Then I should still be on login page
    
    Scenario: lost password link working
        Given I am on login page
        And I click on Lost password hyperlink
        Then I should be navigated to forgotPassword page


### Feature: Movies API GET ALL top-rated movies & POST give rating to movies

    Scenario: GET top rated movies with default page successfully
        Given I have correct api_key
        And I send request to API
        Then I should receive data of page 1 in response with response code 200

    Scenario: No data returns on incorrect api_key
        Given I have incorrect api_key
        And I send request to API
        Then I should receive error message in response with response code 401

    Scenario: No data returns on page=0
        Given I have correct api_key
        And I send request to API with page=0
        Then I should receive error message in response with response code 422

    Scenario: GET top-rated movies data with page=500 or max page limit
        Given I have correct api_key
        And I send request to API with page=500 or max limit
        Then I should receive data in response with response code 200 and page=500 or max limit

    Scenario: POST rate movies
        Given I have correct api_key,valid token, movieId
        And I send request to POST API
        Then I should receive success response with response code 201

    Scenario: POST rate movies with invalid movieId
        Given I have correct api_key,valid token, invalid movieId
        And I send request to POST API
        Then I should receive error in response with response code 404

    Scenario: POST rate movies without token
        Given I have correct api_key, invalid token, valid movieId
        And I send request to POST API
        Then I should receive error in response with response code 401
    
    Scenario: POST rate movies with incorrect rating not multiple of 0.5
        Given I have correct api_key, valid token, valid movieId
        And I send request to POST API with rating value=7.4
        Then I should receive error message of not multiple of 0.5 in response with response code 400
        
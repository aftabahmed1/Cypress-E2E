Feature: Login Functionality

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
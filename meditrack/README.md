TO DO:

Frontend:
[] Format patients to allow addtional CRUD functionality (add medication, delete med, update med, etc...)
[x] Style obviously
[] For futureIntakeSchema: 
    [] Establish component that a user interacts with to log the frequency of when they'll take meds
    [x] Add logic to build futureIntake array
    [] send futureIntake array to backend
[] For med log:
    [] display as list for now
[x] Add description of app to homepage
[] Load dummy data for Dr.'s schedule and set up functionality to schedule appt
[] Establish all CRUD functionality for...
    [] user: add patient
    [] delete patient
    [] update patient
    [] add medication (for user) 
Backend:
[x] Establish all routes for all CRUD functionality  
    [x] user: login, signup, update user (changing email)
[x] Ensure all middleware operates appropriately
    [x] Determine data to return to frontend when appropriate
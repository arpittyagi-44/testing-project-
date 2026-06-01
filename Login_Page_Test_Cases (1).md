# Login Page Test Cases

## Project
Software Testing Login Module

### Valid Credentials
- Username: `admin`
- Password: `admin123`

| TC ID | Test Scenario | Test Data | Expected Result | Priority |
|------|---------------|-----------|-----------------|----------|
| TC01 | Valid Login | admin / admin123 | User is redirected to index.html | High |
| TC02 | Invalid Username | user / admin123 | Error message displayed | High |
| TC03 | Invalid Password | admin / wrong123 | Error message displayed | High |
| TC04 | Invalid Username & Password | user / wrong123 | Error message displayed | High |
| TC05 | Empty Username | blank / admin123 | Validation or login failure message | High |
| TC06 | Empty Password | admin / blank | Validation or login failure message | High |
| TC07 | Both Fields Empty | blank / blank | Validation or login failure message | High |
| TC08 | Username With Leading Spaces | " admin" | Login should fail or trim input | Medium |
| TC09 | Username With Trailing Spaces | "admin " | Login should fail or trim input | Medium |
| TC10 | Password With Leading Spaces | " admin123" | Login should fail | Medium |
| TC11 | Password With Trailing Spaces | "admin123 " | Login should fail | Medium |
| TC12 | Case Sensitivity Check | ADMIN / ADMIN123 | Login should fail | Medium |
| TC13 | Special Characters in Username | @#$% | Error message displayed | Medium |
| TC14 | Special Characters in Password | @#$% | Error message displayed | Medium |
| TC15 | SQL Injection Attempt | ' OR 1=1 -- | Login should fail | High |
| TC16 | Script Injection Attempt | <script>alert(1)</script> | Login should fail | High |
| TC17 | Multiple Failed Logins | Invalid credentials repeatedly | Error shown every time | Medium |
| TC18 | Successful Login Redirect | admin / admin123 | index.html opens | High |
| TC19 | Session Created After Login | Valid login | loggedIn=true stored in sessionStorage | High |
| TC20 | Direct Access Without Login | Open index.html directly | Redirect to login.html | High |
| TC21 | Logout Functionality | Click Logout | Session removed and redirected to login.html | High |
| TC22 | Browser Refresh After Login | Refresh index.html | User remains logged in during session | Medium |
| TC23 | Browser Close and Reopen | Reopen app | Session ends (sessionStorage cleared) | Medium |
| TC24 | Responsive UI Check | Mobile screen | Login page displays correctly | Low |
| TC25 | Button Click Validation | Click Login button | Login function executes correctly | High |

## Summary

Total Test Cases: 25

Coverage:
- Functional Testing
- Validation Testing
- Session Management Testing
- Security Testing
- UI Testing
- Navigation Testing

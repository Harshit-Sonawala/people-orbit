# User Authentication / Authorization Flows

- Login Flow:
  (FRONTEND)
  - User clicks on top right Login button > Redirected to Login page
  - User enters email and password, submits
    - Formik email validation, password rules regex
    - Formik > Tanstack (different useAuth hook?)
    - Tanstack > Axios POST request to auth/login with email, password in JSON request body

  (BACKEND)
  - NestJS AuthController receives request on POST /auth/login
  - @Public() decorator makes route exempt from global JwtAuthGuard
  - LoginDTO validated in controller
  - DTO validation faliure > 400 Bad Request
  - Goes into AuthService login method with loginDTO
    - calls usersRepository.findOne where email matches
    - Email not matching any entries
      - throw 401 Error
      - log(email not found)
    - bcrypt.compare() password plaintext with stored hash
    - Password mismatch
      - throw 401 Error
      - log(password didnt match)
    - Generate JWT access token (payload, 15min expiry)
    - Generate refresh token (crypto random string, 7d expiry)
      - bcrypt.hash(refreshToken)
      - save hash, userId, expiresAt into refresh_tokens table
      - Set refreshToken as httpOnly, Secure, SameSite=Strict cookie on response.
    - Return shape of response {user: {...}, accessToken }

  (FRONTEND)
  - Tanstack onSuccess
    - success notification
    - store token and user info in Redux
    - redirect to Profile page
  - Tanstack onFailure
    - failure notification

- Signup Flow:
  - User clicks on top right button > Redirected to Login page > Clicks link to Signup page > Signup page
  - User enters email, password, other form fields, submits
    - Formik email, password, user fields validation
    - Formik > Tanstack hook
    - Tanstack > Axios POST request with email, password, user object in JSON reqest body.
    - NestJS route receives > DTO validated > repository save >
    - password is hashed and stored in credentials table
    - call createUser from usersRepository to store in users table
    - success:
      - shape of response {user: {...}, accessToken: }
      - generate JWT access token
      - generate refresh token, store only its hash in db
      - Tanstack onSuccess triggers a success notification
      - store token and user info in Redux
      - redirect to Profile page
    - faliure:
      - Tanstack onFailure should trigger a faliure notification/modal

- Login Backend Flow
  - ...
  - NestJS AuthController receives request on POST /auth/login
    - @Public() decorator makes route exempt from global JwtAuthGuard
    - LoginDTO validated in controller
    - DTO validation faliure > 400 Bad Request
  - Goes into AuthService login method with loginDTO
    - calls usersRepository.findOne where email matches
    - Email not matching any entries
      - throw 401 Error
      - log(email not found)
    - bcrypt.compare() password plaintext with stored hash
    - Password mismatch
      - throw 401 Error
      - log(password didnt match)
    - Generate JWT access token (payload, 15min expiry)
    - Generate refresh token (crypto random string, 7d expiry)
      - bcrypt.hash(refreshToken)
      - save hash, userId, expiresAt into refresh_tokens table
      - Set refreshToken as httpOnly, Secure, SameSite=Strict cookie on response.
    - Return shape of response {user: {...}, accessToken: }
  - Tanstack onSuccess
    - success notification
    - store token and user info in Redux
    - redirect to Profile page
  - Tanstack onFailure
    - failure notification

### Coding Steps/Tasks

- Frontend
  - Login Page
    - Password validation rules - min/max, special chars - regex
  - Signup Page
  - Some error notification/modal functionality with Redux?
  - Tanstack Query useAuth hook
- Backend
  - NestJS login DTO
  - NestJS signup DTO
  - NestJS Auth Module, controller, routes

  - hash password with bcrypt
  - token generation etc logic

- Database
  - New Credentials table with
    id PK
    userId
    pass hash
    role: user | admin
    refresh token hash
    creation timestamp
    expiry timestamp
  - create migration
  - Auth repository with methods to find and compare hash

## Other Future Considerations:

- NestJS Global JWT guard by default. Mark others public explicitly
- NestJS Role-based guards
- Auth Token Refreshing - automatically renew access token before it expires.
- Role based access - only allow admin access to manage-users page
- Clear auth state and redirect to login/signup on logout or session expiry

- Handle 401 globally — intercept in Axios/fetch, trigger silent refresh

- Short lived access token JWT - store in memory.
- Long lived refresh token - httpOnly, SameSite cookie.
- Token rotation on each refresh call - invalidate old one
- refresh token reuse detection - revoke entire family

- Rate limit login endpoint?
- HTTPS?

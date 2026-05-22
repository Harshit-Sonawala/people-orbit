# User Authentication / Authorization Flows

- LOGIN FLOW:  
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
      - throw 401 Unauthorized Error
      - log(email not found)
    - bcrypt.compare() password plaintext with stored hash
    - Password mismatch
      - throw 401 Unauthorized Error
      - log(password didnt match)
    - Generate access token (JWT, 15min expiry)
      - send JWT in response body
    - Generate refresh token (crypto random string, 7d expiry)
      - bcrypt.hash(refreshToken)
      - save hash, userId, expiresAt into sessions table
      - set refreshToken as httpOnly, Secure, SameSite=Strict, maxAge 7 days as response.cookie
      - send refresh token
    - Return shape of response {user: {...}, accessToken }

  (FRONTEND)
  - Tanstack onSuccess
    - store JWT access token and user info in Redux
    - success notification
    - redirect to Profile page
  - Tanstack onFailure
    - failure notification

---

- SIGNUP FLOW:  
  (FRONTEND)
  - User clicks on top right Signup button > Redirected to Signup page
  - User enters name, email, and password (+ confirm password), submits
    - Formik name/email validation, password rules regex, confirm password match check
    - Formik > Tanstack (different useAuth hook?)
    - Tanstack > Axios POST request to auth/signup with name, email, password in JSON request body

  (BACKEND)
  - NestJS AuthController receives request on POST /auth/signup
  - @Public() decorator makes route exempt from global JwtAuthGuard
  - SignupDTO validated in controller
  - DTO validation failure > 400 Bad Request
  - Goes into AuthService signup method with signupDTO
    - calls usersRepository.findOne where email matches
    - Email already exists in table
      - throw 409 Conflict Error
      - log(email already registered)
    - bcrypt.hash() password plaintext
    - save new user record with usersRepository.create(id, name, email, password, ...)
    - Generate access token (JWT, 15min expiry)
      - send JWT in response body
    - Generate refresh token (crypto random string, 7d expiry)
      - bcrypt.hash(refreshToken)
      - save hash, userId, expiresAt into sessions table
      - set refreshToken as httpOnly, Secure, SameSite=Strict, maxAge 7 days as response.cookie
      - send refresh token
    - Return shape of response {user: {...}, accessToken }

  (FRONTEND)
  - Tanstack onSuccess
    - store JWT access token and user info in Redux
    - success notification
    - redirect to Profile page
  - Tanstack onFailure
    - failure notification

---

- REFRESH FLOW /auth/refresh
  (FRONTEND)
  - Axios interceptor catches 401 Unauthorized
    - automatically calls POST /auth/refresh
    - success, gets new accessToken
      - store new accessToken in Redux
      - retry request
    - failure - clear loggedInUser in Redux - redirect to /login

  (BACKEND)
  - NestJS AuthController receives request on POST /auth/refresh
  - @Public() decorator makes it exempt from JwtAuthGuard
  -

---

- LOGOUT FLOW /auth/logout
  (BACKEND)
  - NestJS IsAuthenticated guard added the user from the JWT payload into the Request object
  - AuthController receives the userId from the Request object
  - Calls the AuthService.logout function
    - Compares userId with sessions table userId
    - No match found
      - User not logged in > throw which error?
    - Match found
      - Remove refreshToken row from sessions table
      - log(refresh token deleted for userId)
    - Return response shape {message: "Logged out successfully"}

### Coding Steps/Tasks

- [ ] Database
  - [ ] users table
    - [x] Add password
    - [x] Migration
    - [ ] New sessions table with:
    - [ ] id | userId (FK) | tokenHash | expiresAt | createdAt
    - [ ] Migration
    - [ ] sessions repository methods to find, save, compare hash, etc.

- [ ] Backend
  - [x] Basic Auth Module, controller, routes
  - [x] AuthResponse Type
  - [ ] /auth/login
    - [x] NestJS login DTO
    - [x] repository find one where password matches in users table
    - [x] compare pass with stored hash and success/failure
      - [x] success:
        - [x] NestJS JWT Token generation
        <!-- - [ ] Refresh Token generation
        - [ ] Refresh token hashing
        - [ ] Refresh token repo save in table,
        - [ ] Token rotation on each refresh call - repo delete old row -->
      - [x] failure:
        - [x] throw error
  - [ ] /auth/signup
    - [x] NestJS signup DTO
    - [x] hash password with bcrypt
    - [x] Save user to table with idSlug, hashedPassword, createdOn, updatedOn.
    - [x] Generate JWT accessToken
    - [x] Generate Refresh Token
    - [ ] Store refresh token in sessions table
    - [x] return AuthResponse type
  - [ ] /auth/logout
  - [x] @JwtGuard, @UseGuards(IsAuthenticated) guard creation and specfying in routes.

  - [ ] refresh token reuse detection — if a token is used twice, it should invalidate the entire family (all tokens for that user)
  - [ ] Role column everywhere and NestJS Role-based guards

- Frontend
  - [ ] Login Page
    - [ ] Password validation rules - min/max, special chars
    - [ ] regex
    - [ ] Read accessToken from Redux and send
    - [ ] Link to Signup
    - [ ] Redirect to /profile on success
  - [ ] Signup Page
    - [ ] emailId, password, confirm password validation
    - [ ] Link to Login
    - [ ] Redirect to /profile on success
  - [ ] Next.js Middleware for route protection - private routes (/profile), guest only routes (/login)
  - [ ] Error notification/modal functionality with Redux?
  - [ ] Tanstack Query useAuth hook?
  - [ ] Clear auth state and redirect to login/signup on logout or sessions expiry
  - [ ] Once 15min JWT expires, /auth/refresh strategy - axios interceptor?

## Other Future Considerations:

- [ ] Update the CreateUserForm and CreateUserDto to accept Password
- [ ] Add the role column to the FE & BE User type, update DTOs, add the role on UsersService.create
- [ ] Every request should send access token in Authorization header

- Handle 401 globally — intercept in Axios/fetch, trigger silent refresh
- [ ] Rate limit login endpoint?
- HTTPS? - infrastructure side.

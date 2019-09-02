# Web API Error Codes

1. Invalid username or password.

    When the user name is not in the database or password or username not supplied.

    - app/Http/Controllers/Web/UserController.php

2. The record has deleted or blocked.

   When the using record is deleted.

    - app/Http/Controllers/Web/UserController.php
    - app/Http/Controllers/Web/FormController.php

3. Password incorrect.

    When the user exists and supplied password is incorrect.

    - app/Http/Controllers/Web/UserController.php

4. Your account has an error.

    When all checks passed and user has not a user type.

    - app/Http/Controllers/Web/UserController.php

5. Invalid values supplied.

    When expected parameters not in the request.

    - app/Http/Controllers/Web/FormController.php

6. Sorry! Your operation is not successfull.

    When a database transaction occured or some database exception occured.

    - app/Http/Controllers/Web/FormController.php

7. Email has already taken.

    When entered email has registered with a different email address.

8. Please verify your email address.

    When a user is trying to logged in with a not verified email.

9. Can not find a profile for your request parameters.

    When user given an invalid user id to fetch profile informations.

10. This school has not a teacher.

    Donator trying to donate and but school has not a teacher allocated.
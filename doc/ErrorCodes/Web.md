# Web API Error Codes

1. Invalid username or password.

    When the user name is not in the database or password or username not supplied.

    - app/Http/Controllers/Web/UserController.php

2. User has deleted or blocked.

   When the use is exists with the username and set the status to deleted.

    - app/Http/Controllers/Web/UserController.php

3. Password incorrect.

    When the user exists and supplied password is incorrect.

    - app/Http/Controllers/Web/UserController.php

4. Your account has an error.

    When all checks passed and user has not a user type.

    - app/Http/Controllers/Web/UserController.php
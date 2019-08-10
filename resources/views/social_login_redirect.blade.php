<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Please wait</title>
    <script type="text/javascript">
        localStorage.setItem('userToken','{{ $token }}');

        window.location.href = "{{ config('app.url') }}";
    </script>
</head>
<body>
    <h6>Please wait until redirect you to main page...</h6>
</body>
</html>
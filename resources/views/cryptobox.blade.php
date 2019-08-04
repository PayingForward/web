<!DOCTYPE html><html><head>
    <meta http-equiv='cache-control' content='no-cache'>

    <script src='{{ url('/js/cryptobox.min.js') }}' type='text/javascript'></script>
    </head><body>
    
    <div style='margin:30px 0 5px 480px'>Language: &#160; <?= $languages_list ?></div>
    <?= $payment_box ?>

    @if($message)
        <div style="color:#fff;background:#000;border:double #404040;text-align:center" class="message">
            <?= $message ?>
        </div>
    @endIf

    <a href="{{ url('/') }}"> << Back to site</a>
    
    </body>
    </html>
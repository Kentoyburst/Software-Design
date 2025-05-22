<?php
define('ENVIRONMENT', 'production');

$recaptcha_site_key = '6LeBHvEqAAAAADLaUP5XvVrd2Hvz-FVG_30KeEkU';
$recaptcha_secret_key = '6LeBHvEqAAAAALomB7eQjwZhYLF-cr7YF7nG1q1e';

define('SKIP_CAPTCHA', false);

$db_host = 'localhost';
$db_user = 'thesis_user';
$db_pass = 'secure_password';
$db_name = 'thesis_repository';

define('HASH_COST', 12); // bcrypt cost parameter
define('SESSION_LIFETIME', 3600); // in seconds

ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', ENVIRONMENT === 'production' ? 1 : 0);
ini_set('session.use_only_cookies', 1);
ini_set('session.gc_maxlifetime', SESSION_LIFETIME);
?>
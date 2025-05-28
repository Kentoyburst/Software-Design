<?php
/**
 * phpMyAdmin configuration file
 */

// Generate a random secret key for cookie authentication
$cfg['blowfish_secret'] = 'your-32-character-random-secret-key-here';

// Server configuration
$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['host'] = 'localhost'; // or your MySQL host
$cfg['Servers'][$i]['port'] = 3306; // MySQL port
$cfg['Servers'][$i]['socket'] = '';
$cfg['Servers'][$i]['connect_type'] = 'tcp';
$cfg['Servers'][$i]['extension'] = 'mysqli';

// For development - you might want to set these
$cfg['Servers'][$i]['user'] = ''; // Leave empty for cookie auth
$cfg['Servers'][$i]['password'] = ''; // Leave empty for cookie auth

// Optional: Database name to connect to by default
// $cfg['Servers'][$i]['only_db'] = 'your_database_name';

// Security settings
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['CheckConfigurationPermissions'] = false;

// Directories for saving/loading files
$cfg['UploadDir'] = '';
$cfg['SaveDir'] = '';

// Increase memory and time limits for large operations
$cfg['ExecTimeLimit'] = 300;
$cfg['MemoryLimit'] = '512M';

// Optional: Set default language
$cfg['DefaultLang'] = 'en';

// Optional: Set theme
$cfg['ThemeManager'] = true;
$cfg['ThemeDefault'] = 'pmahomme';

?>

<?php
/**
 * API Admin - Autentificare
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['username']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Date invalide']);
    exit;
}

// Credențiale (în producție, folosește hash-uri și bază de date)
$ADMIN_USERNAME = 'cristi';
$ADMIN_PASSWORD = 'Cristi@Space2026!';

if ($input['username'] === $ADMIN_USERNAME && $input['password'] === $ADMIN_PASSWORD) {
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_username'] = $input['username'];
    $_SESSION['login_time'] = time();

    echo json_encode([
        'success' => true,
        'message' => 'Autentificare reușită',
        'username' => $input['username']
    ]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Credențiale incorecte']);
}

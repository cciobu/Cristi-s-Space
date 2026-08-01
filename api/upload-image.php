<?php
/**
 * API Admin - Upload Imagini
 * Încarcă imagini pe server și returnează calea
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Neautorizat']);
    exit;
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Nicio imagine trimisă']);
    exit;
}

$file = $_FILES['image'];

// Validare
$allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tip fișier invalid. Doar JPG, PNG, GIF, WebP']);
    exit;
}

// Max 5MB
if ($file['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['error' => 'Fișier prea mare. Maximum 5MB']);
    exit;
}

// Generează nume unic
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'project_' . time() . '_' . uniqid() . '.' . $extension;
$targetPath = __DIR__ . '/../img/' . $filename;

// Crează folder dacă nu există
if (!is_dir(__DIR__ . '/../img/')) {
    mkdir(__DIR__ . '/../img/', 0755, true);
}

// Mută fișierul
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Optimizează imaginea (opțional)
    // TODO: Implementează resize/compress dacă vrei

    echo json_encode([
        'success' => true,
        'filename' => $filename,
        'url' => 'img/' . $filename,
        'size' => $file['size']
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Eroare la încărcare']);
}

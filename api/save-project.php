<?php
/**
 * API Admin - Salvare Proiecte
 * Salvează modificările proiectelor direct în fișierele HTML
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Verifică autentificarea (simplu pentru demo)
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Neautorizat']);
    exit;
}

// Primește datele
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['projectId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Date invalide']);
    exit;
}

$projectId = $input['projectId'];
$projectData = $input['data'];

// Calea către fișierul HTML
$filePath = __DIR__ . '/proiecte/' . $projectId . '.html';

if (!file_exists($filePath)) {
    http_response_code(404);
    echo json_encode(['error' => 'Proiectul nu există']);
    exit;
}

// Citește fișierul HTML
$html = file_get_contents($filePath);

// Actualizează conținutul folosind regex

// 1. Titlu proiect (H1)
$html = preg_replace(
    '/<h1>(.*?)<\/h1>/s',
    '<h1>' . htmlspecialchars($projectData['title']) . '</h1>',
    $html
);

// 2. Categorie (kicker)
$html = preg_replace(
    '/<span class="kicker">(.*?)<\/span>/s',
    '<span class="kicker">' . htmlspecialchars($projectData['category']) . '</span>',
    $html
);

// 3. Lead (descriere scurtă)
$html = preg_replace(
    '/<p class="lead">(.*?)<\/p>/s',
    '<p class="lead">' . htmlspecialchars($projectData['lead']) . '</p>',
    $html
);

// 4. Descriere detaliată (primul paragraf după "Despre proiect")
$html = preg_replace(
    '/(<h2>Despre proiect<\/h2>\s*<p>)(.*?)(<\/p>)/s',
    '$1' . htmlspecialchars($projectData['description']) . '$3',
    $html
);

// 5. Caracteristici tehnice
if (isset($projectData['characteristics']) && is_array($projectData['characteristics'])) {
    $characteristicsList = '';
    foreach ($projectData['characteristics'] as $char) {
        $characteristicsList .= '<li>' . htmlspecialchars($char) . '</li>';
    }

    $html = preg_replace(
        '/(<h3[^>]*>Caracteristici[^<]*<\/h3>\s*<ul[^>]*>)(.*?)(<\/ul>)/s',
        '$1' . $characteristicsList . '$3',
        $html
    );
}

// 6. Detalii proiect (client, dată, durată, locație)
$html = preg_replace(
    '/(<td[^>]*>Client:<\/td>\s*<td[^>]*>)(.*?)(<\/td>)/s',
    '$1' . htmlspecialchars($projectData['client']) . '$3',
    $html
);

$html = preg_replace(
    '/(<td[^>]*>Data[^:]*:<\/td>\s*<td[^>]*>)(.*?)(<\/td>)/s',
    '$1' . htmlspecialchars($projectData['date']) . '$3',
    $html
);

$html = preg_replace(
    '/(<td[^>]*>Durat[^:]*:<\/td>\s*<td[^>]*>)(.*?)(<\/td>)/s',
    '$1' . htmlspecialchars($projectData['duration']) . '$3',
    $html
);

$html = preg_replace(
    '/(<td[^>]*>Loca[^:]*:<\/td>\s*<td[^>]*>)(.*?)(<\/td>)/s',
    '$1' . htmlspecialchars($projectData['location']) . '$3',
    $html
);

// 7. Imagine principală (hero)
if (isset($projectData['image'])) {
    $html = preg_replace(
        '/(<div class="hero-image"[^>]*>.*?<img src=")([^"]*)(.*?<\/div>)/s',
        '$1' . htmlspecialchars($projectData['image']) . '$3',
        $html
    );
}

// Salvează fișierul
$backup = $html; // Backup în caz de eroare
if (file_put_contents($filePath, $html) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Eroare la salvare']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Proiectul a fost salvat cu succes!',
    'file' => $projectId . '.html'
]);

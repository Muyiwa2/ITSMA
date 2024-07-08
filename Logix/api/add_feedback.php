<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $feedback = $_POST['feedback'] ?? '';

    if (empty($name) || empty($email) || empty($feedback)) {
        echo json_encode(['error' => 'All fields are required']);
        exit;
    }

    try {
        $pdo = new PDO('mysql:host=localhost;dbname=logix_cfss', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO feedback (name, email, feedback) VALUES (:name, :email, :feedback)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':feedback' => $feedback
        ]);

        echo json_encode(['success' => 'Feedback submitted successfully']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }

    $pdo = null;
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>

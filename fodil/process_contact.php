<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $service = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    if (!$name || !$email || !$phone || !$service || !$message) {
        echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs']);
        exit;
    }

    try {
        $sql = "INSERT INTO contact_requests (name, email, phone, service, message, created_at) 
                VALUES (:name, :email, :phone, :service, :message, NOW())";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':service' => $service,
            ':message' => $message
        ]);

        // Envoyer un email de notification
        $to = "edinburghplumbingdirect@gmail.com";
        $subject = "Nouvelle demande de contact";
        $email_message = "Nouvelle demande de contact reçue :\n\n";
        $email_message .= "Nom : $name\n";
        $email_message .= "Email : $email\n";
        $email_message .= "Téléphone : $phone\n";
        $email_message .= "Service : $service\n";
        $email_message .= "Message : $message\n";

        mail($to, $subject, $email_message);

        echo json_encode(['success' => true, 'message' => 'Votre message a été envoyé avec succès']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Une erreur est survenue lors de l\'envoi du message']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
}
?> 
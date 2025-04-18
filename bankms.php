<?php
session_start();

//Session timeout - Update on every request
$_SESSION['last_activity'] = time(); 
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1800)) {
    session_unset();
    session_destroy();
}

// Generate CSRF token if it doesn't exists - prevents a cross site request forgery(a layer of security)
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    die('CSRF token validation failed');
}

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "bankms";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed" . $conn->connect_error);
}

//Handle user registration & Validate the inputs

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["register"])) {
    $username = htmlspecialchars(trim($_POST["username"]));
    if (!preg_match('/^[a-zA-Z0-9_]{4,20}$/', $username)){
        die("Usernames must be 4-20 chars (letters, numbers, underscores only.)");
    }

    $email = htmlspecialchars(trim($_POST["email"])); 
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/@.+\./', $email)) {
        die("Invalid email address."); //Username - no special characters
    }


    $password = $_POST["password"];
    if (strlen($password) < 12 || 
    !preg_match('/[A-Z]/', $password) ||  // At least 1 uppercase
    !preg_match('/[a-z]/', $password) ||  // At least 1 lowercase
    !preg_match('/[0-9]/', $password) ||  // At least 1 number
    !preg_match('/[\W]/', $password)) {   // At least 1 special char
    die("Password must be 12+ chars with uppercase, lowercase, numbers, and special characters.");
    }

    // Check if email already exists
    $checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    $checkEmail->store_result();


    if ($checkEmail->num_rows > 0) {
        echo "Email already registered!";
    } else {
        // Hash the password for security
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo "Registration successful! You can now login.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    }

  $checkEmail->close();     
 }  


 



// User Login
// Handle user login
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["login"])) {
    //Rate limiting, prevents brute force attacks
    if (!isset($_SESSION['login_attempts'])) {
        $_SESSION['login_attempts'] = 0;
    }
    
    if ($_SESSION['login_attempts'] >= 5) {
        die("Too many attempts. Try again later.");
    }
    
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    // Check if user exists
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $username, $hashedPassword);
        $stmt->fetch();
      
        
        // Verify password
        if (password_verify($password, $hashedPassword)) {
            $_SESSION['login_attempts'] = 0; //Session reset after successful login
            $_SESSION["user_id"] = $id;
            $_SESSION["username"] = $username;
            echo "Login successful! Redirecting...";
            header("Location: employee_dashboard.html"); // Redirect to dashboard 
            exit();
        } else {
            // On failed login:
            $_SESSION['login_attempts'] = ($_SESSION['login_attempts'] ?? 0) + 1;
            echo "Invalid email or password!";
        }
    } else {
        echo "No account found with that email!";
    }

    $stmt->close();
}

 $conn->close();
?>

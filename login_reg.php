<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Registration</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <header>
        <div class="logo">
            <img src="IMGS/moneybag.png" alt="Logo" class="logo-icon">
            <i>Traibino</i>
        </div>
    </header>

    <!-- Login Form -->
    
    <form id="loginForm" class="container" action="bankms.php" method="POST">
     <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        <h2>User Login</h2>
        <div class="input-group">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" name="email" placeholder="Email">
        </div>
        <div class="input-group">
            <i class="fa-solid fa-lock"></i>
            <input type="password" name="password" placeholder="Password">
        </div>
        <div class="options">
            <label><input name="remember" type="checkbox"> Remember me</label>
            <a href="#" onclick="showReset()">Forgot Password?</a>
        </div>
        <button class="submit-btn" type="submit" name="login">Login</button>
        <p>Don't have an account? <a href="#" onclick="showRegister()">Register</a></p>
    </form>

    <!-- Registration Form -->
    <form id="registerForm" class="container hidden" action="bankms.php" method="POST">
     <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        <h2>Registration</h2>
        <div class="input-group">
            <i class="fa-solid fa-user"></i>
            <input type="text" name="username" placeholder="Username" required>
        </div>
        <div class="input-group">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" name="email" placeholder="Email" required>
        </div>
        <div class="input-group">
            <i class="fa-solid fa-lock"></i>
            <input type="password" name="password" placeholder="Password" required>
        </div>
        <label><input type="checkbox" name="terms"> I agree to the terms & conditions</label>
        <button class="submit-btn" name="register" type="submit">Register</button>
        <p>Already have an account? <a href="#" onclick="showLogin()">Login</a></p>
    </form>
      
<!-- Password Reset -->

    <!-- Email Section -->
    <div id="passwordReset" class="container reset hidden">
        <h2>Password Reset</h2>
        <p>Input your email to reset password</p>
        <div class="input-group">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Email">
        </div>
        <button class="submit-btn">Reset</button>
        <p>Do you know your password? <a href="#" onclick="showLogin()">Login</a></p>
    </div>

    <!-- Password Section -->

    <div id="password" class="container reset hidden">
        <h2>Password Reset</h2>
        <p>Set a new password</p>
        <div class="input-group">
            <i class="fa-solid fa-lock"></i>
            <input type="password" placeholder="New Password">
        </div>
        <div class="input-group">
            <i class="fa-solid fa-lock"></i>
            <input type="password" placeholder="Retype New Password">
        </div>
        <button class="submit-btn">Reset</button>
        <p>Do you know your password? <a href="#" onclick="showLogin()">Login</a></p>
    </div>

    <script>
        function showLogin() {      
            document.getElementById('loginForm').classList.remove('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('passwordReset').classList.add('hidden');     
        }  

        function showRegister() {    
            document.getElementById('registerForm').classList.remove('hidden');
            document.getElementById('loginForm').classList.add('hidden');    
        }

        function showReset() {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('passwordReset').classList.remove('hidden');   
        }

        function resetForms() {
        document.getElementById('loginForm').reset();
        document.getElementById('registerForm').reset();
        document.getElementById('passwordReset').reset();
        document.getElementById('password').reset();
    }
        
    </script>
</body>
</html>

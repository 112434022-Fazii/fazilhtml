<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
        }

        .login-container {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            width: 350px;
        }

        .login-container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        .input-group {
            margin-bottom: 15px;
        }

        .input-group label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }

        .input-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            outline: none;
        }

        .input-group input:focus {
            border-color: #4facfe;
        }

        .options {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            font-size: 14px;
        }

        .options a {
            text-decoration: none;
            color: #4facfe;
        }

        .login-btn {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 6px;
            background: #4facfe;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        .login-btn:hover {
            background: #3399ff;
        }

        .signup-link {
            text-align: center;
            margin-top: 15px;
            font-size: 14px;
        }

        .signup-link a {
            color: #4facfe;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <h2>Login</h2>

        <form action="#" method="POST">
            <div class="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required>
            </div>

            <div class="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" required>
            </div>

            <div class="options">
                <label>
                    <input type="checkbox"> Remember Me
                </label>
                <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" class="login-btn">Login</button>
        </form>

        <div class="signup-link">
            Don't have an account? <a href="#">Sign Up</a>
        </div>
    </div>

</body>
</html>

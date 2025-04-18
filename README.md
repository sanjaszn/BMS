# BMS

An Intermediate Project About A Bank Management System

--Currently working on the Navbar

1. Navigation Bar (Main Sections)
   The navigation should allow quick access to core banking operations. Here are the essential sections:

🔹 Employee Panel (For Bank Staff)
Dashboard – Overview of assigned tasks, recent transactions, and customer details.

Manage Customers – Add, edit, and delete customer accounts.

Transactions – Process deposits, withdrawals, transfers, and view transaction history.

Loan Processing – Approve or reject customer loan requests.

Customer Support – Track and respond to customer queries.

🔹 Admin Panel (For Managers & Admins)
Admin Dashboard – Bank performance overview, employee activity, and critical statistics.

User Management – Approve or reject new employee registrations.

Manage Employees – Add, update, and remove employees; assign roles (Teller, Loan Officer, etc.).

System Logs & Audits – Track login attempts, transactions, and security-related events.

Bank Reports – Generate financial reports on transactions, revenue, and loans.

Settings – Manage system security, user roles, and configurations.

2. Dashboard Contents (KPIs & Insights)
   The dashboard should display key metrics and actionable insights:

Total Customers (Active & Inactive)

Total Employees (By Role)

Total Deposits & Withdrawals (Daily, Weekly, Monthly)

Loan Requests Status (Pending, Approved, Rejected)

Recent Transactions (Deposits, Withdrawals, Transfers)

Bank Performance Graphs (Revenue, Loan Approvals, Customer Growth)

Notifications (Pending approvals, alerts, system messages)

3. Additional Features to Consider
   Audit Logs: Tracks employee activity (who accessed/modified what).

Role-Based Access Control (RBAC): Ensures employees only see what they need.

Search & Filters: Allow employees/admins to find customers, transactions, or logs quickly.

Export Options: Generate reports in PDF, Excel, or CSV formats.

-------TODAY - 4-18-25 - SECURITY IMPROVEMENTS WE'VE IMPLEMENTED SO FAR:

1. CSRF Protection
   Added tokens to forms (register/login).

Validated tokens before processing POST requests.

2. Input Validation
   Username: 4-20 chars (letters, numbers, underscores).

Email: Strict format validation (filter_var + regex).

Password: 12+ chars with uppercase, lowercase, numbers, and special chars.

3. Rate Limiting
   Blocks login after 5 failed attempts.

Resets counter on successful login.

4. Sessions & Security
   Session starts with user_id and username on login.

Removed sensitive error messages (e.g., "Invalid password" → "Invalid email/password").

5. Database Safety
   Prepared statements for SQL queries (prevents injection).

Password hashing (password_hash + password_verify).

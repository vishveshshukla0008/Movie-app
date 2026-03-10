# 🔧 Backend Integration Guide

## What Your Backend Needs to Do

Your frontend is now secure! But for it to work properly, **your backend must support HTTP-only cookies and proper token validation**.

Here's exactly what you need to implement:

---

## 1. Set HTTP-Only Cookies on Login 🔒

### Express.js Example:

```javascript
// In your login route (/api/auth/login)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate credentials
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Create JWT token (expires in 24 hours)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // 3. SET HTTP-ONLY COOKIE ← IMPORTANT!
    res.cookie("authToken", token, {
      httpOnly: true, // ✅ JavaScript cannot access
      secure: true, // ✅ Only sent over HTTPS (set to false in development)
      sameSite: "Strict", // ✅ Prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // 4. Return user data (not the token!)
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
```

**What this does:**

- ✅ Creates JWT token
- ✅ Sets it in HTTP-only cookie (safe!)
- ✅ Returns user data to frontend
- ✅ Frontend gets cookie automatically

---

## 2. Verify Token on Every Protected Route 🔐

### Middleware to Verify Token:

```javascript
// Create a middleware file: middleware/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Get token from HTTP-only cookie (browser sends it automatically)
    const token = req.cookies.authToken;

    // If no token, return 401
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    // Continue to next middleware/route
    next();
  } catch (error) {
    // Invalid or expired token
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
```

### Use Middleware on Protected Routes:

```javascript
// Example: /api/auth/getme route
const getMe = (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    const user = await User.findById(req.user.userId);

    res.json({
      message: "User found",
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Apply middleware to routes
app.get('/api/auth/getme', verifyToken, getMe);
app.get('/api/songs', verifyToken, getSongs);  // All protected routes!
```

---

## 3. Enable CORS for Credentials 🌐

### Express CORS Setup:

```javascript
// In your main server.js or app.js
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Parse cookies from requests
app.use(cookieParser());

// Configure CORS with credentials
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://yourdomain.com", // Production
    ],
    credentials: true, // ✅ IMPORTANT! Allow cookies to be sent/received
    optionsSuccessStatus: 200,
  }),
);
```

**Important:**

- `credentials: true` must be set
- Frontend uses `withCredentials: true` in API calls
- Cookies are automatically sent by browser!

---

## 4. Handle Logout 🚪

### Logout Route:

```javascript
const logout = (req, res) => {
  try {
    // Clear the HTTP-only cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({
      message: "Logged out successfully",
      user: null,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

app.get("/api/auth/logout", logout);
```

---

## 5. Handle Token Expiration 🔄

### Automatic 401 Response:

```javascript
// When token expires, jwt.verify() throws an error
// Middleware catches it and returns 401
// Frontend's Axios interceptor catches 401 and logs user out

// User automatically redirected to login! ✅
```

### Optional: Refresh Tokens (Advanced)

If you want to prevent users from being logged out mid-session:

```javascript
// On login, issue TWO tokens:
// 1. accessToken (short-lived, 15 minutes)
// 2. refreshToken (long-lived, 7 days)

// When access token expires, frontend calls /refresh endpoint
// Get new access token without re-login

// This is optional but prevents mid-session logouts!
```

---

## 6. Full Implementation Example 📝

### Complete Server Setup:

```javascript
// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Routes
app.post("/api/auth/login", async (req, res) => {
  try {
    // Validate & get user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/auth/getme", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ user });
});

app.get("/api/auth/logout", (req, res) => {
  res.clearCookie("authToken", { httpOnly: true, secure: true });
  res.json({ message: "Logged out" });
});

app.listen(8080, () => console.log("Server running on port 8080"));
```

---

## ✅ Checklist: What to Implement

- [ ] Install `cookie-parser` package
- [ ] Parse cookies in middleware
- [ ] Create verifyToken middleware
- [ ] Set HTTP-only cookies on login
- [ ] Apply verifyToken to protected routes
- [ ] Clear cookie on logout
- [ ] Enable CORS with credentials: true
- [ ] Set secure: true in production
- [ ] Test with frontend

---

## 🧪 Testing Your Implementation

### Test 1: Check if Cookie is Set

```bash
# After logging in, check cookies:
curl -v http://localhost:8080/api/auth/login \
  -d '{"email":"test@test.com","password":"pass"}' \
  -H "Content-Type: application/json"

# Look for: Set-Cookie: authToken=...;HttpOnly
```

### Test 2: Verify Token is Sent

```bash
# Get cookie from previous response, then:
curl http://localhost:8080/api/auth/getme \
  -H "Cookie: authToken=<your-token>" \
  -v

# Should return user data
```

### Test 3: Check Frontend Can't Read Token

```javascript
// In browser console:
document.cookie; // Won't show authToken (it's httpOnly!)
localStorage.getItem("hasSession"); // Will show "true"
```

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Sending Token in localStorage

```javascript
// WRONG - Frontend stores token
localStorage.setItem("token", jwtToken);
```

Use HTTP-only cookies instead!

### ❌ Mistake 2: Not Setting httpOnly

```javascript
// WRONG - Token accessible to JavaScript
res.cookie("token", jwtToken);
```

**MUST use:**

```javascript
// RIGHT
res.cookie("token", jwtToken, { httpOnly: true });
```

### ❌ Mistake 3: credentials: false

```javascript
// WRONG - Frontend can't send cookies
app.use(cors({ credentials: false }));
```

**MUST use:**

```javascript
// RIGHT
app.use(cors({ credentials: true }));
```

### ❌ Mistake 4: Not Validating on Backend

```javascript
// WRONG - Anyone can access
app.get("/api/user", (req, res) => {
  res.json({ user: req.user }); // req.user not verified!
});
```

**MUST use middleware:**

```javascript
// RIGHT
app.get("/api/user", verifyToken, (req, res) => {
  res.json({ user: req.user }); // req.user is verified!
});
```

---

## 📊 Flow Diagram

```
Frontend Login
     ↓
Sends: { email, password }
     ↓
Backend Validates
     ↓
Backend Creates JWT
     ↓
Backend Sets HTTP-Only Cookie 🔒
     ↓
Backend Returns: { user, message }
     ↓
Frontend Receives Response
     ↓
Frontend Stores: localStorage.hasSession = "true"
     ↓
Frontend Stores: React State user = { ... }
     ↓
Frontend Makes API Calls
     ↓
Browser Auto-Includes Cookie 🔒
     ↓
Backend Verifies Token
     ↓
Request Processed ✅
```

---

## 🎓 Environment Variables

Set these in your `.env` file:

```env
# Backend
NODE_ENV=production  # or "development"
JWT_SECRET=your-super-secret-key-change-this!
PORT=8080

# Frontend (if needed)
VITE_API_URL=http://localhost:8080
```

---

## 🚀 Deploy to Production

1. **Backend:**
   - Set `NODE_ENV=production`
   - Set `JWT_SECRET` to a strong random string
   - Use HTTPS certificate (Let's Encrypt is free!)
   - Enable `secure: true` in cookie options

2. **Frontend:**
   - Build: `npm run build`
   - Deploy to hosting
   - Update API URL to HTTPS

3. **Both:**
   - Test thoroughly on staging first
   - Monitor error logs
   - Keep dependencies updated

---

## 📞 Quick Reference

| Endpoint | Method | Middleware  | Returns           |
| -------- | ------ | ----------- | ----------------- |
| /login   | POST   | None        | { user, message } |
| /getme   | GET    | verifyToken | { user }          |
| /logout  | GET    | None        | { message }       |
| /songs   | GET    | verifyToken | { songs }         |

---

## 💡 Pro Tips

1. **Use Environment Variables** for JWT_SECRET
2. **Set HTTPS** before going to production
3. **Log Failed Login Attempts** for security
4. **Implement Rate Limiting** on login endpoint
5. **Use Refresh Tokens** for better UX (optional)
6. **Monitor Token Expiration** in logs
7. **Keep JWT Secret Long** (32+ characters)

---

**Your backend is now ready to support secure authentication! 🛡️✨**

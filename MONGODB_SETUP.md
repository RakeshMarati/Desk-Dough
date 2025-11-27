 # MongoDB Atlas Setup Guide

Complete step-by-step guide to set up MongoDB Atlas and connect it to your application.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Fill in your details:
   - Email address
   - Password
   - First and Last name
4. Accept terms and click **"Create your Atlas account"**
5. Verify your email address if prompted

## Step 2: Create a Free Cluster

1. After logging in, you'll see the **"Deploy a cloud database"** screen
2. Choose **"M0 FREE"** (Free tier - perfect for development)
3. Select your **Cloud Provider** (AWS, Google Cloud, or Azure)
4. Choose a **Region** closest to you (e.g., `N. Virginia (us-east-1)`)
5. Click **"Create"** (cluster name will be auto-generated)
6. Wait 3-5 minutes for the cluster to be created

## Step 3: Create Database User

1. In the **"Security"** section, click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter:
   - **Username**: `mycafeuser` (or your preferred username)
   - **Password**: Click **"Autogenerate Secure Password"** or create your own
   - **⚠️ IMPORTANT**: Copy and save the password! You won't see it again.
5. Under **"Database User Privileges"**, select **"Atlas admin"** (or "Read and write to any database")
6. Click **"Add User"**

## Step 4: Configure Network Access (Whitelist IP)

1. In the **"Security"** section, click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - ⚠️ **Note**: For production, use specific IP addresses only
4. Click **"Confirm"**

## Step 5: Get Your Connection String

1. Go back to **"Database"** section (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select:
   - **Driver**: `Node.js`
   - **Version**: `5.5 or later` (or latest)
5. Copy the connection string (it will look like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File

1. Open `server/.env` file in your project
2. Replace the `MONGODB_URI` line with your actual connection string:

```env
MONGODB_URI=mongodb+srv://mycafeuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/my-cafe?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `<username>` with your database username (e.g., `mycafeuser`)
- Replace `<password>` with your database password (URL-encode special characters if needed)
- Replace `cluster0.xxxxx` with your actual cluster name
- Add `/my-cafe` before the `?` to specify the database name
- Make sure there are **NO spaces** in the connection string

### URL Encoding Special Characters

If your password contains special characters, encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

**Example:**
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`
- Connection string: `mongodb+srv://user:MyP%40ss%23123@cluster0.xxxxx.mongodb.net/my-cafe?retryWrites=true&w=majority`

## Step 7: Test the Connection

1. Make sure your `.env` file is saved
2. Restart your server:
   ```bash
   cd server
   npm run dev
   ```
3. You should see:
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
   ```

## Troubleshooting

### Error: "Authentication failed"
- Check your username and password are correct
- Make sure password is URL-encoded if it has special characters
- Verify the database user exists in "Database Access"

### Error: "IP not whitelisted"
- Go to "Network Access" in Atlas
- Add your current IP address or use `0.0.0.0/0` for development

### Error: "querySrv EBADNAME"
- Check your connection string format
- Make sure cluster name is correct
- Verify you're using `mongodb+srv://` (not `mongodb://`)

### Error: "Connection timeout"
- Check your internet connection
- Verify IP whitelist includes your IP
- Try a different region if issues persist

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong passwords** - At least 12 characters with mixed case, numbers, and symbols
3. **Limit IP access** - In production, only whitelist specific IPs
4. **Use environment variables** - Never hardcode connection strings
5. **Rotate passwords regularly** - Change database passwords periodically

## Quick Reference

- **Atlas Dashboard**: https://cloud.mongodb.com/
- **Documentation**: https://docs.atlas.mongodb.com/
- **Connection String Format**: 
  ```
  mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
  ```

## Next Steps

Once connected, you can:
1. View your data in Atlas UI (Browse Collections)
2. Use MongoDB Compass (desktop GUI tool)
3. Start creating menu items, categories, and testimonials via your API

---

**Need Help?** Check MongoDB Atlas documentation or community forums.


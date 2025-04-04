# Guide: Configuring E2E Testing with Keycloak

This guide helps you set up Keycloak for end-to-end (E2E) testing purposes, referencing the official Keycloak Docker guide.

---

## Step 1: Start Keycloak Using Docker

Follow the official Keycloak Docker guide to set up Keycloak:

```bash
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.1.4 start-dev
```

Access Keycloak Admin Console:
```
http://your-server-ip:8080
```

Log in using admin credentials:
- Username: `admin`
- Password: `admin`

For more details, refer to the official guide: [Keycloak Docker Guide](https://www.keycloak.org/getting-started/getting-started-docker)

---

## Step 2: Create a New Realm

- Open the Admin Console.
- Click **Create Realm**.
- Enter realm name: `users`
- Click **Create**.

![Add realm](https://www.keycloak.org/resources/images/guides/add-realm.png)

---

## Step 3: Configure a Browser Client

- Select your realm (`users`).
- Go to **Clients → Create client**.
  - Client Type: `OpenID Connect`
  - Client ID: `client-browser`
  - Click **Next**.
- Enable client authentication.
- Set **Valid redirect URIs** to your application’s URL (e.g., `https://domain.com/*`).
- Set **Web origins** to your application’s URL (e.g., `https://domain.com`).
- Click **Save**.

![Add client step 1](https://www.keycloak.org/resources/images/guides/add-client-1.png)

---

## Step 4: Retrieve and Set Credentials

- Under **Clients**, select `client-browser`.
- Go to the **Credentials** tab.
- Copy `Client ID` and `Client Secret`.

Update your `.env` file with these details:

```env
AUTH_KEYCLOAK_ID=****
AUTH_KEYCLOAK_SECRET=****
AUTH_KEYCLOAK_ISSUER=https://my-keycloak-domain.com/realms/users
```

Replace `your-client-id` and `your-client-secret` with the copied values.

![Update client step 2](https://www.keycloak.org/resources/images/guides/add-client-2.png)

---

## Step 5: Enable User Registration

- In Keycloak, navigate to **Realm Settings → Login**.
- Enable **User registration**.
- Save the settings.

![Realm Settings](https://i.imgur.com/AeaNdEW.png)

---

## Step 6: Create Dummy User for E2E Testing

In Keycloak, create a new user for E2E tests:

- Navigate to **Users → Create new user**.
- Username: `e2e_tester`
- Email: `e2e_tester@techwithanirudh.com`
- Click **Create**.
- Set the initial password (`e2e_tester_password`) under the **Credentials** tab.
- Disable **Temporary** to ensure the password is permanent.

Update `.env` file with test credentials:

```env
# E2E Testing Credentials
TEST_KEYCLOAK_USERNAME=e2e_tester
TEST_KEYCLOAK_EMAIL=e2e_tester@techwithanirudh.com
TEST_KEYCLOAK_PASSWORD=e2e_tester_password
```

![Create user](https://www.keycloak.org/resources/images/guides/add-user.png)

![Set password](https://www.keycloak.org/resources/images/guides/set-password.png)

## Additional Notes

- Disable Cloudflare proxy for the Keycloak domain.
- Set the issuer URL in your `.env` file without a trailing slash:

---

You’re now ready to use Keycloak for E2E testing in your environment!

---

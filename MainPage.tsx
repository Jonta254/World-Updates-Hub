import React, { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

const APP_ID = "app_58b9f46a248d22c7258d051c0e1adafc";

export default function MainPage() {
  const [user, setUser] = useState<{
    username?: string;
    profilePictureUrl?: string;
    walletAddress?: string;
  } | null>(null);

  const [permissions, setPermissions] = useState<{
    notifications: boolean;
    contacts: boolean;
    microphone: boolean;
  } | null>(null);

  const [insideWorldApp, setInsideWorldApp] = useState(false);

  useEffect(() => {
    setInsideWorldApp(MiniKit.isInstalled());
    setUser(MiniKit.user);

    async function getPermissions() {
      try {
        const perms = await MiniKit.getPermissions();
        setPermissions(perms);
      } catch (e) {
        console.error("Failed to get permissions:", e);
      }
    }

    getPermissions();
  }, []);

  async function handleWalletAuth() {
    try {
      const result = await MiniKit.commandsAsync.walletAuth({
        app_id: APP_ID,
      });
      if (result?.walletAddress) {
        setUser(MiniKit.user);
      }
    } catch (e) {
      console.error("Wallet auth failed", e);
    }
  }

  async function requestNotificationPermission() {
    try {
      await MiniKit.commandsAsync.requestPermission("notifications");
      const perms = await MiniKit.getPermissions();
      setPermissions(perms);
    } catch (e) {
      console.error("Request permission failed", e);
    }
  }

  if (!insideWorldApp) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>Please open this mini app inside World App for full functionality.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to FlashAid</h1>

      {user ? (
        <div style={{ textAlign: "center" }}>
          <p>
            Hello, <strong>{user.username || "User"}</strong>!
          </p>

          {user.profilePictureUrl && (
            <img
              src={user.profilePictureUrl}
              alt="Profile"
              width={80}
              height={80}
              style={{ borderRadius: "50%", marginBottom: 10 }}
            />
          )}

          <p style={{ fontSize: 12, wordBreak: "break-word" }}>
            Wallet address: <br /> {user.walletAddress || "Not available"}
          </p>

          <button
            onClick={() => alert("Next action here")}
            style={{
              marginTop: 20,
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              backgroundColor: "#0078d4",
              color: "white",
              border: "none",
            }}
          >
            Continue
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Please login to continue.</p>
          <button
            onClick={handleWalletAuth}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              backgroundColor: "#2a9d8f",
              color: "white",
              border: "none",
            }}
          >
            Login with Wallet
          </button>
        </div>
      )}

      {permissions && !permissions.notifications && (
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <p>Enable notifications for updates</p>
          <button
            onClick={requestNotificationPermission}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              backgroundColor: "#e76f51",
              color: "white",
              border: "none",
            }}
          >
            Allow Notifications
          </button>
        </div>
      )}
    </div>
  );
}

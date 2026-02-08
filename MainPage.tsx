import React, { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

const APP_ID = "app_58b9f46a248d22c7258d051c0e1adafc";

export default function MainPage() {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
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
    return <div>Please open this mini app inside World App for full functionality.</div>;
  }

  return (
    <div>
      <h1>Welcome to FlashAid</h1>
      {user ? (
        <div>
          <p>Hello, <strong>{user.username || "User"}</strong>!</p>
          {user.profilePictureUrl && (
            <img src={user.profilePictureUrl} alt="Profile" width="80" height="80" />
          )}
          <p>Your wallet address: {user.walletAddress}</p>
          <button onClick={() => alert("Next action here")}>Continue</button>
        </div>
      ) : (
        <div>
          <p>Please login to continue.</p>
          <button onClick={handleWalletAuth}>Login with Wallet</button>
        </div>
      )}

      {permissions && !permissions.notifications && (
        <div>
          <p>Enable notifications for updates</p>
          <button onClick={requestNotificationPermission}>Allow Notifications</button>
        </div>
      )}
    </div>
  );
}

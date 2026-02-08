import React, { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

const APP_ID = "app_58b9f46a248d22c7258d051c0e1adafc";

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const [insideWorldApp, setInsideWorldApp] = useState(false);

  useEffect(() => {
    setInsideWorldApp(MiniKit.isInstalled());
    setUser(MiniKit.user);
  }, []);

  async function handleWalletAuth() {
    try {
      const result = await MiniKit.commandsAsync.walletAuth({
        app_id: APP_ID,
      });
      if (result?.walletAddress) {
        setUser(MiniKit.user);
      }
    } catch (error) {
      console.error("Wallet auth failed", error);
    }
  }

  if (!insideWorldApp) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>Please open this mini app inside World App for full functionality.</p>
      </div>
    );
  }

  if (user) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>Welcome back, {user.username || "User"}!</h2>
        {user.profilePictureUrl && (
          <img
            src={user.profilePictureUrl}
            alt="Profile"
            width={80}
            height={80}
            style={{ borderRadius: "50%", margin: "20px auto" }}
          />
        )}
        <p>Your wallet address:</p>
        <p style={{ fontSize: 12, wordBreak: "break-word" }}>
          {user.walletAddress || "Not available"}
        </p>
        <button
          onClick={() => alert("Proceed to next step")}
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
    );
  }

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Login to World Updates Hub</h2>
      <button
        onClick={handleWalletAuth}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          cursor: "pointer",
          backgroundColor: "#2a9d8f",
          color: "white",
          border: "none",
          marginTop: 20,
        }}
      >
        Login with Wallet
      </button>
    </div>
  );
            }


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll } from "firebase/storage";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Starting Firebase Connection Test (ESM)...");

// Helper to clean values
const cleanValue = (val) => {
    if (!val) return "";
    let v = val.trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
    }
    return v;
};

// 1. Manually load .env
const envPath = path.resolve(__dirname, '../.env');
const envVars = {};

if (fs.existsSync(envPath)) {
    console.log(`📂 Parsing .env file at: ${envPath}`);
    const envContent = fs.readFileSync(envPath, 'utf8');

    // Split by newlines (handle both \n and \r\n)
    const lines = envContent.replace(/\r\n/g, '\n').split('\n');

    lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        // Simple split by first '='
        const idx = trimmed.indexOf('=');
        if (idx === -1) return;

        const key = trimmed.substring(0, idx).trim();
        const value = trimmed.substring(idx + 1);

        envVars[key] = cleanValue(value);
    });
} else {
    console.warn("⚠️ No .env file found!");
}

// 2. Map env vars to config
const configFromEnv = {
    apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: envVars.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: envVars.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log("Environment Variables Loaded:", Object.keys(configFromEnv).filter(k => !!configFromEnv[k]));

let firebaseConfig = configFromEnv;

if (!firebaseConfig.projectId) {
    console.error("❌ ERROR: Missing 'NEXT_PUBLIC_FIREBASE_PROJECT_ID' in .env file.");
    console.error("   Please ensure your .env file contains all required Firebase keys.");
    process.exit(1);
}

// 3. Test Connection
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function checkConnection() {
    console.log(`\n🌍 Testing connection to project: '${firebaseConfig.projectId}'`);

    try {
        const testRef = ref(storage, "connectivity-test-" + Date.now());
        await listAll(testRef);
        console.log("✅ CONNECTION SUCCESSFUL!");
        console.log("   (Access granted to Storage bucket)");
    } catch (error) {
        const code = error.code || 'unknown';

        if (code === 'storage/unauthorized') {
            console.log("✅ CONNECTION SUCCESSFUL (Permission Denied)");
            console.log("   ➤ The app CAN reach Firebase.");
            console.log("   ➤ Access denied as expected (Security Rules currently block public reads).");
        } else if (code === 'storage/object-not-found') {
            console.log("✅ CONNECTION SUCCESSFUL");
        } else if (code === 'auth/network-request-failed') {
            console.error("❌ NETWORK ERROR: Could not reach Firebase servers.");
        } else if (code === 'storage/invalid-argument') {
            console.error("❌ CONFIGURATION ERROR: Check your projectId, apiKey, and storageBucket.");
        } else {
            console.error(`❌ CONNECTION FAILED: ${code}`);
            console.error(`   Message: ${error.message}`);
        }
    }
}

checkConnection();

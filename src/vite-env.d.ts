/// <reference types="vite/client" />

// vite-env.d.ts
interface ImportMetaEnv {
    readonly VITE_APPWRITE_PROJECT: string;
    readonly VITE_APPWRITE_ENDPOINT: string;
    readonly VITE_APPWRITE_DATABASE: string;
    readonly VITE_APPWRITE_COLLECTION_INTERVIEW_QUESTIONS: string;
    readonly VITE_APPWRITE_STORAGE_BUCKET_BEHAVIORAL_QUESTIONS: string;
    // Add other environment variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
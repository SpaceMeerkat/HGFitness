// apiConfig.ts
// The backend stage comes from the build, not the branch:
// EXPO_PUBLIC_API_URL is set per build profile in eas.json (preview/production -> staging).
// Local `npx expo start` falls back to dev unless overridden in .env.local.
const DEV_API_URL = 'https://66sq79qyu6.execute-api.af-south-1.amazonaws.com/dev';
export const BASE_API_URL = process.env.EXPO_PUBLIC_API_URL ?? DEV_API_URL;
export const AUTH_API_URL = `${BASE_API_URL}/auth`;
export const USER_API_URL = `${BASE_API_URL}/user`;
export const S3_API_URL = 'https://hgfitnessimages.s3.af-south-1.amazonaws.com/programCards';

// Add other endpoints as needed

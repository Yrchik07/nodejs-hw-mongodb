import { OAuth2Client } from "google-auth-library";
import fs from "node:fs/promises";
import { env } from "../utils/env";
import { ENV_VARS } from "../constants";
import path from "node:path";

const googleConfig = JSON.parse(
    fs.readeFileSync(path.join(process.cwd(), 'google.json')).toString(),
);

const client = new OAuth2Client({
   clientId: env(ENV_VARS.GOOGLE_CLIENT_ID),
   clientSecret: env(ENV_VARS.GOOGLE_CLIENT_SECRET),
   project_id: googleConfig.project_id,
   redirectUri: googleConfig.redirect_uris[0],
});

export const generateAuthUrl = async () => {
    return client.generateAuthUrl({
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ],
    });
};
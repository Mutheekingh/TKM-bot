const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUkwMS8vdVA0MStLYTc3YngxaFNPMS9MQ1E1enY1cXZycURZeVphUzNtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVGtxcVA0aTZoVXZ4M1VwbjBaMU5xeXVqREI3T25YV3NlczZEbkNLQS9ncz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTktKdnZkUTUyS0ZGcGU3VFdWZGJIaEIzdUdkMDlmOVdrd01ZTjNHTjI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYb2FNK3VLNzA3N3BwUzdWTjVSTWY1Q3A3T0RHTHByYXVSS1YxcGlwT0N3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVPK0ZBWTFQMGMwWHNqN3BqOHFSM0cvL3JwT0dwam5hLzhBSjBETllMbG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImszaEY2ZXF4UFRYKzh6YTcvbk5ySUtQbkZDeERiQVBXTmlGc2VveFZBQzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUxxU0xnSW0wK3A5QWZsTElyU2xlbmhyNCt0NUtnZjB6VjJwUnVXcEZVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEtoUStlakxHYXBGQ1J1WjRXbUFZMk80aXlqemdOWWZsbWxvZ1ZycHFDaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitGMVNYdnpmWEhleUtXbWpFVjRlS1VvSkJHb2VYRTgrRWRKdzdORzJuYk56dkFLdVgxRUdZUHZEOUM0eEhDR2NhU2JjclB2U0xWc3cyMWxXSk1oT2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzYsImFkdlNlY3JldEtleSI6ImJ0NVVGVTZaRklNVm5LZ1NoeE1HdSsxRENBdVRkb2U0OGpNSms3UXpkU1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Il9SaGgtQjVKU002NC1yWU55bGV1VGciLCJwaG9uZUlkIjoiMmE5MTBjM2ItZjVhMS00ZjY5LWFiOTEtM2EwMzc5NWY0YjcyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVyR2EvQnFGc1JjQ2ZDZGMzclkzZWQya2g0TT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0eHRsblVta2lCbytITnBjeE14ZURGNWo1bjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVFRKV0FQQjkiLCJtZSI6eyJpZCI6IjI1NDcyMzc4MDU0NToyMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWlnMDRzRUVPNjQ2TFFHR0E0Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiU2hCaVNJNmhHK2hDcHdIZjV2V2RJbmZYWWJBL2hvT2t1RTBPVWgvVEVRbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibFE3Q2FHV2dpTmtLM2dvQ2VYKzd6Z0owWmtSS1JGRUkvclVGN0FFM1duMjJBR0Qwc2trUVgwekMxZ05sMVVPUFhhYjVIVkpFWnBNN0tnTklSZXNqRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IkdwSmx2czduSlkvV3ZaZ3cxVzlFRExRSHJBZ3pqRWpkNERhaHhUU1A1ZlJ1YUNEbHM3b3RhNFdWNkh0cnV1ZjFvQjc3RnJYZjNKQXNUVGRsZlFnSmlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzIzNzgwNTQ1OjIwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVvUVlraU9vUnZvUXFjQjMrYjFuU0ozMTJHd1A0YURwTGhORGxJZjB4RUsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEzNzU4NjcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTUFJIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Muthee Kingh",
    NUMERO_OWNER : process.env.OWNER_NUM || "254723780545",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'K I N G H-BOT',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

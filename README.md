# Brevify
Summarizes videos and audio into chapters and full transcriptions.

## Assembly AI API Key
You need an api key from https://www.assemblyai.com/.
If you are deploying on replit add a secret named "assembly" and put your api key inside.
Otherwise, uncomment the normal way and comment the replit way in secrets.js and insert your api key.

**TODO/NOTE: API KEY TRANSMISSION IS NOT SECURE ENOUGH FOR PUBLIC USE**

## Running Server locally
Make sure you have nodejs and npm

#### Run tailwind (only in dev time)
`cd client`

`npx tailwindcss -i ./source.css -o ./dist.css --watch`

#### Run nodejs (all time)
`npm install`

`node server.js`

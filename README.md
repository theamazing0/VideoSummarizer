# Run tailwind
cd client
npx tailwindcss -i ./source.css -o ./dist.css --watch

# Run nodejs
npm install
node server.js
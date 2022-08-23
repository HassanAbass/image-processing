## Image Processing project

Installing packages
```
npm install
```
Run linting commands, will run both prettier and eslint 
```
npm run lint
```
Building and testing, setup the production files and test code
```
npm run test
```
start server
```
node dist/index.js
```
How it work: you are required to send image file name, width, height, EX
Available filenames :

`encenadaport.jpg|fjord.jpg|icelandwaterfall.jpg|palmtunnel.jpg|santamonica.jpg`
```
{SERVER_URL}/api/images?fileName=palmtunnel.jpg&width=1000&height=600
```
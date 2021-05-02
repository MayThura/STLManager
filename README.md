# STLManager

This project consists of two main parts: `file-server` for back-end and `stl-viewer` for front-end.

`file-server` is the server to control the uploading and downloading of the STL files. It is implemented in nodejs and Koa. `stl-viewer` is the client side project, which is implement in react, three and fiber to display the STL files.


When the user chooses a STL file, it will upload the file to the server. In this project, it assumes that the server database is in the local computer, so the uploaded file location is `stl-viewer/public`. Consequently, if the user wants to download the file, the STL files only from `stl-viewer/public` can be chosen to download. (In the real world project, this needs to be taken care by the service like AWS.) Whenever the user chooses the file to download or upload, it will be displayed on the web page so that the user can check the file out. 

## Installation
Install `yarn` if you don't have it already

```
npm install -g yarn
```


To install the server,
- Change directory to `file-server`
```
cd path/to/file-server
```
- Install yarn packages
```
yarn
```
- Run the server
```
node server.js
```
It will be running on `http://localhost:3001`


To install the client,
- Change directory to `stl-viewer`
```
cd path/to/stl-viewer
```
- Install yarn packages
```
yarn
```
- Run the client
```
yarn start
```
It will be running on `http://localhost:3000`

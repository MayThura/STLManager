# 3D Picture Uploader and Viewer

This innovative application allows users to upload, view, and download 3D STL files directly from a web page. Aimed at providing a seamless experience for 3D content creators and enthusiasts, this platform makes it easy to share and explore 3D models.

## Project Structure

The project is divided into two main components:

### `file-server` (Back-end)

- Technology: Built with Node.js and Koa, file-server handles the uploading and downloading of STL files.
- Functionality: It serves as the backend server, managing file transactions and ensuring smooth data flow between the client and server.

### `stl-viewer` (Front-end)

- Technology: Developed with React and powered by Three.js and Fiber, `stl-viewer` provides a dynamic interface for displaying STL files.
- Features: Users can interact with the web page to upload STL files, which are then rendered for online viewing. The application supports downloading STL files, allowing users to save content locally.

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

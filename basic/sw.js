self.addEventListener('install', event => {
    console.log("installation complete");
});

self.addEventListener('activate', event => {
    console.log("activation complete");
});

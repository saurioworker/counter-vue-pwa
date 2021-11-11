if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./sw.js")
        .then((reg) => console.log("Service Worker registrado"))
        .catch((err) => console.log(err));
}
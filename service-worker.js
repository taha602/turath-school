self.addEventListener("push", function (event) {

    let data = {};

    try {

        data = event.data ? event.data.json() : {};

    } catch (e) {

        data = {
            title: "إشعار جديد",
            body: event.data ? event.data.text() : ""
        };

    }

    const title =
        data.title || "مدرسة التراث الكربلائي الحسيني";

    const options = {
        body: data.body || "",
        icon: data.icon || undefined,
        badge: data.icon || undefined,
        dir: "rtl",
        lang: "ar",
        data: { url: data.url || "/" }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );

});


self.addEventListener("notificationclick", function (event) {

    event.notification.close();

    const url =
        (event.notification.data && event.notification.data.url) || "/";

    event.waitUntil(
        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then(function (clientList) {

                for (const client of clientList) {

                    if ("focus" in client) {

                        return client.focus();

                    }

                }

                if (clients.openWindow) {

                    return clients.openWindow(url);

                }

            })
    );

});

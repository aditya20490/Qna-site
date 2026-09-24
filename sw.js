self.addEventListener("push", event => {

  let data = {
    title: "Aditya Contact Portal",
    body: "You have a new answer."
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (error) {
      console.log("Push data was not JSON.");
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/Qna-site/icon-192.png",
      badge: "/Qna-site/icon-192.png",
      data: {
        url: "/Qna-site/"
      }
    })
  );

});


self.addEventListener("notificationclick", event => {

  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(windowClients => {

      for (const client of windowClients) {

        if ("focus" in client) {
          client.navigate("/Qna-site/");
          return client.focus();
        }

      }

      if (clients.openWindow) {
        return clients.openWindow("/Qna-site/");
      }

    })
  );

});

import { createLibp2p } from "../src";

const TOPIC = "/mesh.aicacia.com/example";

async function onLoad() {
  const libp2p = await createLibp2p();

  (window as any).libp2p = libp2p;

  libp2p.pubsub.subscribe(TOPIC);

  async function onSendMessage() {
    const input = document.getElementById("message") as HTMLInputElement,
      message = input.value;

    if (message) {
      await libp2p.pubsub.publish(TOPIC, new TextEncoder().encode(message));
      onMessage(message, "me");
      input.value = "";
    }
  }

  document.getElementById("message").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      onSendMessage();
    }
  });
  document.getElementById("send").addEventListener("click", onSendMessage);

  function onMessage(mesage: any, from: string) {
    const li = document.createElement("li");
    li.innerHTML = `${from}: ${mesage}`;
    document.getElementById("messages").appendChild(li);
  }

  libp2p.pubsub.on(TOPIC, (message) => {
    onMessage(new TextDecoder().decode(message.data), message.from);
  });

  libp2p.on("peer:discovery", (peerId) => {
    console.log(`Found peer ${peerId.toB58String()}`);
  });

  libp2p.connectionManager.on("peer:connect", (connection) => {
    console.log(`Connected to ${connection.remotePeer.toB58String()}`);
  });

  libp2p.connectionManager.on("peer:disconnect", (connection) => {
    console.log(`Disconnected from ${connection.remotePeer.toB58String()}`);
  });
}

window.addEventListener("load", onLoad);

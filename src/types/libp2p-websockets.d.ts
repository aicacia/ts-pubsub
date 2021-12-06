declare module "libp2p-websockets" {
  import type { TransportFactory } from "libp2p";
  const Websockets: TransportFactory;
  export default Websockets;
}

declare module "libp2p-mplex" {
  import type { MuxerFactory } from "libp2p";
  const Mplex: MuxerFactory;
  export default Mplex;
}

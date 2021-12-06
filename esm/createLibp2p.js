import Libp2p from "libp2p";
import Websockets from "libp2p-websockets";
import WebRTCStar from "libp2p-webrtc-star";
import { NOISE } from "@chainsafe/libp2p-noise";
import Mplex from "libp2p-mplex";
import Bootstrap from "libp2p-bootstrap";
import FloodSub from "libp2p-floodsub";
export async function createLibp2p() {
    const libp2p = await Libp2p.create({
        addresses: {
            listen: [
                "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
                "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
            ],
        },
        modules: {
            transport: [Websockets, WebRTCStar],
            connEncryption: [NOISE],
            streamMuxer: [Mplex],
            pubsub: FloodSub,
            peerDiscovery: [Bootstrap],
        },
        config: {
            peerDiscovery: {
                [Bootstrap.tag]: {
                    enabled: true,
                    list: [
                        "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
                        "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
                        "/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp",
                        "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
                        "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
                    ],
                },
                pubsub: {
                    enabled: true,
                    emitSelf: false,
                },
            },
        },
    });
    await libp2p.start();
    return libp2p;
}

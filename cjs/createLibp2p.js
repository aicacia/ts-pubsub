"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLibp2p = void 0;
const tslib_1 = require("tslib");
const libp2p_1 = (0, tslib_1.__importDefault)(require("libp2p"));
const libp2p_websockets_1 = (0, tslib_1.__importDefault)(require("libp2p-websockets"));
const libp2p_webrtc_star_1 = (0, tslib_1.__importDefault)(require("libp2p-webrtc-star"));
const libp2p_noise_1 = require("@chainsafe/libp2p-noise");
const libp2p_mplex_1 = (0, tslib_1.__importDefault)(require("libp2p-mplex"));
const libp2p_bootstrap_1 = (0, tslib_1.__importDefault)(require("libp2p-bootstrap"));
const libp2p_floodsub_1 = (0, tslib_1.__importDefault)(require("libp2p-floodsub"));
function createLibp2p() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const libp2p = yield libp2p_1.default.create({
            addresses: {
                listen: [
                    "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
                    "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
                ],
            },
            modules: {
                transport: [libp2p_websockets_1.default, libp2p_webrtc_star_1.default],
                connEncryption: [libp2p_noise_1.NOISE],
                streamMuxer: [libp2p_mplex_1.default],
                pubsub: libp2p_floodsub_1.default,
                peerDiscovery: [libp2p_bootstrap_1.default],
            },
            config: {
                peerDiscovery: {
                    [libp2p_bootstrap_1.default.tag]: {
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
        yield libp2p.start();
        return libp2p;
    });
}
exports.createLibp2p = createLibp2p;

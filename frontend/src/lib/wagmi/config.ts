import { http, createConfig, createStorage, cookieStorage } from "@wagmi/core";
import { Chain } from "@wagmi/core/chains";
import { injected } from "wagmi/connectors";


const polygon_amoy_testnet = {
  id: 80002,
  name: "Polygon Amoy Testnet",
  nativeCurrency: { name: "Matic", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-amoy.polygon.technology/"] },
  },
  blockExplorers: {
    default: {
      name: "amoy",
      url: "https://amoy.polygonscan.com/",
    },
  },
  testnet: true,
} as const satisfies Chain;

export const config = createConfig({
  chains: [polygon_amoy_testnet],
  connectors: [injected()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [polygon_amoy_testnet.id]: http(),
  },
});

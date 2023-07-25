
import { isMobile } from 'react-device-detect';
import Box from "./components/Box";
import Navbar from "./components/Navbar";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = '108e51b6ecddbfe5f14d216a1ed99a40'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  const renderScreenRotationMessage = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="rotate-message text-center">
          <p className="text-2xl font-bold">Please rotate your screen</p>
          <p className="text-lg">to view this content.</p>
        </div>
      </div>
    );
  };

  const renderHomePage = () => {
    return (
      <WagmiConfig config={wagmiConfig}>
        <div className="bg-cover">
          <Navbar />
          <Box />
        </div>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    );
  };

  return (
    <>
      {isMobile ? renderScreenRotationMessage() : renderHomePage()}
    </>
  );
}

export default App;

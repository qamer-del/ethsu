import { useEffect, useState } from 'react';
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
  const [orientation, setOrientation] = useState('');

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      );
    };

    handleOrientationChange();

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const shouldShowRotateMessage = orientation === 'portrait';

  return (
   <>
   <WagmiConfig config={wagmiConfig}>
   <div className="bg-cover ">
      {shouldShowRotateMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white text-center">
          <p className="text-lg">
            Please rotate your phone to view this page.
          </p>
        </div>
      )}

      <div className={shouldShowRotateMessage ? 'hidden' : ''}>
        <Navbar />
        <Box />
      </div>
    </div>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

      </WagmiConfig>
    
   </>
  );
}

export default App;

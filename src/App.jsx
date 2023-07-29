

import  { useState, useEffect } from 'react';
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
  const [appConfig, setAppConfig] = useState(null);
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  async function getConfig() {
    try {
      const res = await fetch('/config.json');
      const data = await res.json();
      setAppConfig(data);
    } catch (error) {
      console.error('Error fetching config:', error);
      setAppConfig(null);
    }
  }

  useEffect(() => {
    getConfig();
    function handleOrientationChange(e) {
      setIsPortrait(e.matches);
    }

    const mediaQueryList = window.matchMedia("(orientation: portrait)");
    mediaQueryList.addEventListener('change', handleOrientationChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  const renderScreenRotationMessage = () => {
    return (
      <div className="flex items-center flex-col justify-center h-screen bg-gray-900 text-white">
        <div className="rotate-message text-center">
          <p className="text-2xl font-bold">Please rotate your devise</p>
          <p className="text-lg text-gray-500">to view the website .</p>
        </div>
        <div className="">
        <img
           src="./animation_lkivvsq9_small.gif"
            alt="Rotate your device"
            className="rotate-image"
          />
        </div>
      </div>
    );
  };

  const renderHomePage = () => {
    return (
      <WagmiConfig config={wagmiConfig}>
       <div className="bg-cover">
          <Navbar />
          <Box appConfig={appConfig}/>
        </div>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    );
  };

 return (
    <>
      {isMobile && isPortrait ? renderScreenRotationMessage() :  renderHomePage() }
    </>
 );
}
export default App;
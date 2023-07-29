import React, { useState } from 'react';
import { useWeb3Modal} from '@web3modal/react'
import { 
  useAccount, 
  useDisconnect,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from "wagmi";
import { parseEther } from "viem";

const Box = ({ appConfig }) =>{
  const { CONTRACT_ADDRESS, PRICE } = appConfig ? appConfig : {};
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const label = isConnected ? "Disconnect" : "Connect";
  const [count, setCount] = useState(1);
  const ethPrice = PRICE || 0;
  // do this instead
  const [ethAmount, setEthAmount] = useState(0);

  const value = (count * ethPrice).toFixed(4).substring(0, 4);
  const [loading, setLoading] = useState(false);
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        name: 'publicMint',
        type: 'function',
        stateMutability: 'payable',
        inputs: [{ internalType: 'uint32', name: 'quantity', type: 'uint32' }],
        outputs: [],
      },
    ],
    functionName: 'publicMint',
    args: [Number(count)],
    value: parseEther(value),
  })

  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleIncrement = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  async function onWrite() {
    setLoading(true);

    write();

    setLoading(false);

  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  return (
    
    <div className= "absolute mx-4 border-[#6f7081] border bg-[#131313]  md:top-[5%] lg:top-[10%] left-[5%] sm:w-[30%] w-[65%] py-4">
      <div className="container mx-auto  text-center flex flex-col lg:gap-10 md:gap-1  justify-center">
        <h1 className=" text-gradient font-black text-center text-sm md:text-xl ">
          LIVE MINT
        </h1>
        <div className="flex flex-row justify-center items-center md:mt-2 sm:mt-1">
          <div className="flex items-center space-x-4">
            <button
              className="bg-gradient-to-r from-indigo-900 to-purple-600  text-white text-sm font-bold w-5 h-5 lg:w-9 lg:h-9 rounded-full"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="w-14 text-3xl text-center bg-[#180f28]  text-white">
              {count}
            </span>
            <button
              className="bg-gradient-to-r from-indigo-900 to-purple-600  text-white text-sm font-bold w-5 h-5 lg:w-9 lg:h-9  rounded-full"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <p className="text-center justify-start text-white">
          ETH: {value}
        </p>
        <button className="bg-gradient-to-r from-indigo-900 to-purple-600 lg:p-4 p-1" hidden={isConnected} onClick={onClick} disabled={loading}>{loading ? "Loading..." : label}</button>
        <span>
        <button hidden={!isConnected} className="opacity-20 cursor-no-drop bg-gradient-to-r from-indigo-900 to-purple-600 lg:px-8 lg:py-4 px-4 py-2 mx-4 rounded-md" disabled
      title="Coming Soon"
    >
      Stake
    </button>
        <button hidden={!isConnected}
          className="bg-gradient-to-r from-indigo-900 to-purple-600 lg:px-8 lg:py-4 px-4 py-2 mx-4 rounded-md"
          disabled={!isConnected} onClick={() => onWrite()}>
            {loading || isLoading ? 'Minting...' : ' Mint '}
        </button>
        
        </span>
        {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Box;

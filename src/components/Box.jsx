import { useState } from "react";

const Box = () => {
  const [count, setCount] = useState(0);
  const ethPrice = 5; 
  const value = count * ethPrice;

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="mt-20 ml-20 w-[27%] h-56 relative" >
      <div className="container mx-auto flex flex-col ">
        <h1 className="text-center md:text-3xl font-bold text-indigo-600">
          LIVE MINT
        </h1>
        <div className="flex flex-row justify-center items-center mt-12">
          <div className="flex items-center space-x-4">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="w-36 text-3xl text-center bg-indigo-600 px-4 py-1 text-white">
              {count}
            </span>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <p className="  mt-3 bg-slate-600 px-16 py-5 text-center ">ETH:{' '}{value}</p>
        <button className=" text-3xl text-center mt-10">Connect Walet</button>
      </div>
    </div>
  );
};

export default Box;

import { useState } from "react";

const Box = () => {
  const [count, setCount] = useState(0);
const ethPrice = 0.05;
const value = (count * ethPrice).toFixed(4).substring(0, 4);

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

  return (
    <div className="   absolute text-center  w-[230px]  md:left-10 md:top-10 lg:left-20 lg:top-20 xl:left-10 xl:top-20 2xl:left-56 2xl:top-20  ">
      <div className="container mx-auto  text-center flex flex-col md:gap-3 xl:gap-7 justify-center">
        <h1 className=" text-gradient font-black text-center text-sm md:text-xl ">
          LIVE MINT
        </h1>
        <div className="flex flex-row justify-center items-center md:mt-2 sm:mt-1">
          <div className="flex items-center space-x-4">
            <button
              className="bg-gradient-to-r from-indigo-900 to-purple-600  text-white text-sm font-bold sm:w-6 sm:h-6 xl:w-10 xl:h-10  rounded-full"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="w-14 text-3xl text-center bg-[#180f28]  text-white">
              {count}
            </span>
            <button
              className="bg-gradient-to-r from-indigo-900 to-purple-600  text-white text-sm font-bold  sm:w-6 sm:h-6 xl:w-10 xl:h-10  rounded-full"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <p className="  w-32 md:w-32 py-2 text-center ml-10 text-white">
          ETH: {value}
        </p>
        <button className=" bg-gradient-to-r from-indigo-900 to-purple-600 p-5 ml-2  md:text-xl text-sm text-center mr-3 mt-0 xl:mt-24  ">Connect Wallet</button>
      </div>
    </div>
  );
};

export default Box;

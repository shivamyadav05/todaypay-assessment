"use client";

interface KeyWindowProps {
    handleButton: (value: string) => void;
  }

const KeyWindow: React.FC<KeyWindowProps> = ({handleButton}) => {
  const sciKey = [
    "(", ")", "mc", "m+", "m-", "mr", "2nd", "x²", "x³", "xʸ", "eˣ", "10ˣ", "¹/x", "²√x", "³√x", "ʸ√x", "ln", "log₁₀", "x!", "sin", "cos", "tan", "e", "EE", "Rad", "sinh", "cosh", "tanh", "π", "Rand"
  ];
  const basicButton = ["C", "+/-", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

  return (
    <div className="bg-[#555555] flex w-max">
      <div className=" grid grid-cols-6 hidden md:grid ">
        {sciKey.map((item, index) => (
          <button className="p-5 border cursor-pointer border-neutral-700 text-white bg-[#555555] text-xl " key={index} onClick={()=>handleButton(item)}>{item}</button>
   ))}
      </div>
      <div className="grid grid-cols-4 ">
        {basicButton.map((item, index) => {
          const isNumberButton = /\d|\./.test(item);
          const isLastButtonInRow = (index + 1) % 4 === 0;
          const isEqualButton = item === "=";
          const bgColor = isNumberButton ? 'bg-[#73736d]' : 'bg-[#555555]';
          const specialBgColor = (isLastButtonInRow || isEqualButton) ? 'bg-[#efa13b]' : bgColor;  
          return (
            <button  //numeric button component
              className={`p-5 border cursor-pointer text-white border-neutral-700 text-xl ${specialBgColor} ${item === '0' ? 'col-span-2' : ''}`} 
              key={index}
              onClick={() => handleButton(item)}  
              >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default KeyWindow;

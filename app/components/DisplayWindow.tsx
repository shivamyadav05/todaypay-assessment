"use client";

interface DisplayWindowProps {
    expression: string;

}

const DisplayWindow:React.FC<DisplayWindowProps> = ({expression}) => {
    return(
        <div className="bg-[#414141] h-24 flex items-end justify-end ">
            <p className="text-6xl font-thin text-white m-4">{expression}</p>
        </div>
    );
};
 export default DisplayWindow;
"use client";
import ConfettiExplosion from "react-confetti-explosion";
import Calculator from "./components/Calculator";
import { RecoilRoot, useRecoilValue } from "recoil";

export default function Home() {

  return (
    <RecoilRoot>      
    <div className="flex items-center justify-center mt-10 ">
    <Calculator />
  </div>
  </RecoilRoot>
  );
}

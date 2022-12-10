import React from "react";
import { useSelector } from "react-redux";
import {IRootState} from '../store'

export default function Controls() {
	const open = useSelector((state: IRootState) => state.controls.open);
  return (
    <div>
      <div className="fixed bottom-0 left-[12.5%] w-[75vw] backdrop-blur-lg text-white bg-[rgba(40,40,40,.8)] z-10 p-20 rounded-t-2xl" style={{top: !open ?  '100vh' : undefined}}>
        Hello world
      </div>
    </div>
  );
}

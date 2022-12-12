import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState } from "../store";
import { Close } from "@mui/icons-material";
import { close } from "./data";

export default function Controls() {
  const { open, selected } = useAppSelector((state) => state.controls);
  const dispatch = useAppDispatch();
  return (
    <div className="select-none">
      <div
        className="fixed bottom-0 left-[12.5%] w-[75vw] backdrop-blur-lg text-white bg-[rgba(40,40,40,.8)] z-10 p-20 rounded-t-2xl transition-all duration-500 ease-in-out flex"
        style={{ top: !open ? "100vh" : undefined }}
      >
        <div>
          <div className="text-3xl">
            {selected.name} ({selected.x}, {selected.y})
          </div>
        </div>

        <button className="ml-auto -mr-10 -mt-20" onClick={() => dispatch(close())}>
          <Close />
        </button>
      </div>
    </div>
  );
}

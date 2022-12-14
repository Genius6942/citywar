import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "../store/hooks";

import { initWorld } from "./world";

export default function Renderer() {
  const ref = useRef(null) as any as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { renderer, stop } = initWorld(dispatch);
    ref.current.appendChild(renderer.domElement);
    console.log("Restarting...");
    return () => {
      ref.current.removeChild(renderer.domElement);
      stop();
    };
  }, []);

  return <div ref={ref}></div>;
}

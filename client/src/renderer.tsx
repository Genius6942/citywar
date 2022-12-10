import React, { useEffect, useRef } from "react";

import { initWorld } from "./world";

export default function Renderer() {
  const ref = useRef(null) as any as React.MutableRefObject<HTMLDivElement>;
  useEffect(() => {
		const {renderer} = initWorld();
    ref.current.appendChild(renderer.domElement);
    return () => {
      ref.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref}></div>;
}

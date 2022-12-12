import React from "react";
import Renderer from "./rendering/renderer";

import Controls from './controls';

export default function App() {
  return (
		<main>
			<Renderer/>
			<Controls/>
		</main>
	)
}

const Constants = {
  /**
   * time for each tick in seconds
   */
  TICK_TIME: 60,
  GAME: {
    ID_LENGTH: 12,
		/**
		 * units of the grid for each side (square)
		 */
		GRID_SIZE: 50,
		/**
		 * size of a tile in meters as displayed in threejs
		 */
		TILE_SIZE: 1,
  },
};

Object.freeze(Constants);

export default Constants;

//
// Game Vars
//
export const gettingHairyPulseSpeed = 500,
  ghoulCountGettingHairy = 2,
  ghoulCountGameOver = 3,
  enableSound = true,
  volume = 0.4,
  stages = [
    // TBH I might rewrite this system, not happy with
    // the way waves tick over.
    // Should just be.. a speed it pumps them out
    // and an amount of time to survive.
    // Yeah, I overcomplicated it. Should have known
    // when writing Math.pow(.. -2)..
    {
      waveChange: 2000,
      wavesToSurvive: 4, // * 1000/waveChange = total ghouls
      ghoulCountGameOver: 10,
      ghoulCountGettingHairy: 7 // 3/4 gameOver-ish
    },
    {
      waveChange: 1000,
      ghoulCountGettingHairy: 30,
      ghoulCountGameOver: 50,
      wavesToSurvive: 30
    },
    {
      waveChange: 2000,
      ghoulCountGettingHairy: 60,
      ghoulCountGameOver: 120,
      wavesToSurvive: 3
    }
  ];

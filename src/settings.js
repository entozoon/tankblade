//
// Game Vars
//
export const gettingHairyPulseSpeed = 500,
  ghoulCountGettingHairy = 2,
  ghoulCountGameOver = 3,
  enableSound = true,
  volume = 0.4,
  stagesConfig = [
    {
      // totalGhouls = 1000/ghoulFrequency * survivalTime/1000
      ghoulFrequency: 1000,
      survivalTime: 12000,
      ghoulCountGettingHairy: 80,
      ghoulCountGameOver: 999
    },
    {
      ghoulFrequency: 333,
      survivalTime: 12000,
      ghoulCountGettingHairy: 15,
      ghoulCountGameOver: 20 // of 36
    },
    {
      ghoulFrequency: 150,
      survivalTime: 12000,
      ghoulCountGettingHairy: 30,
      ghoulCountGameOver: 45 // of 80
    },
    {
      ghoulFrequency: 80,
      survivalTime: 18000,
      ghoulCountGettingHairy: 60,
      ghoulCountGameOver: 75 // of 150
    }
    // insane, but doable:
    // {
    //   ghoulFrequency: 50,
    // }
  ];

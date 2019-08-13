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
      ghoulCountGameOver: 100
    },
    {
      ghoulFrequency: 333,
      survivalTime: 12000,
      ghoulCountGettingHairy: 20,
      ghoulCountGameOver: 25
    },
    {
      ghoulFrequency: 80,
      survivalTime: 15000,
      ghoulCountGettingHairy: 60,
      ghoulCountGameOver: 90
    },
    {
      ghoulFrequency: 50,
      survivalTime: 15000,
      ghoulCountGettingHairy: 80,
      ghoulCountGameOver: 120
    }
  ];

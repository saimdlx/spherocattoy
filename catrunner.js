var speed = 0;
//For use in Sphero EDU ProgramRunner
async function startProgram() {
  setMainLed({ r: 255, g: 255, b: 255 });
  
  while (true) { //as app is running.
    while (!(Math.sqrt((getAcceleration().x ** 2) + (getAcceleration().y ** 2) + (getAcceleration().z ** 2)) > 1 || getRandomInt(1, 100) > 95)) {
      
      if (getRandomInt(1, 1000) > 990) {
        await spin(3600, 4);
      }
      await delay(0.025);
    }
    
    if (getRandomInt(1, 10) === 1) {
      await delay(getRandomInt(5, 30));
    }
    
    speed = getRandomInt(180, 255);
    setHeading(getRandomFloat(0, 360));
    
    while (!(getAcceleration().z < 0.6 || getRandomInt(1, 10) === 1)) {
      setSpeed(speed);
      await fade({ r: 4, g: 255, b: 0 }, { r: 0, g: 71, b: 18 }, 0.2);
      await delay(0.3);
      await fade({ r: 0, g: 71, b: 10 }, { r: 4, g: 255, b: 0 }, 0.2);
      await delay(0.025);
    }
    
    stopRoll();
    await strobe({ r: 0, g: 255, b: 16 }, 0.2, 3);
    await delay(0.025);
  }
}

async function onCollision() {
  stopRoll();
  await spin(3600, 2);
  await roll(getHeading(), -255, 0.3);
  await roll(getRandomFloat(0, 360), getRandomInt(100, 255), getRandomFloat(0.5, 1));
}

registerEvent(EventType.onCollision, onCollision);

async function onLanding() {
  stopRoll();
  await spin(3600, 3);
  await roll(getHeading(), -255, 0.3);
  await roll(getRandomFloat(0, 360), getRandomInt(100, 255), getRandomFloat(0.5, 2));
  await spin(3600, 1);
}

registerEvent(EventType.onLanding, onLanding);

async function onGyroMax() {
  stopRoll();
  await spin(3600, 2);
  await roll(getHeading(), -255, 0.3);
  await roll(getRandomFloat(0, 360), getRandomInt(100, 255), getRandomFloat(0.5, 2));
}

registerEvent(EventType.onGyroMax, onGyroMax);

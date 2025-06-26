class Car {
  #brand;
  #model;
  #speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.isTrunkOpen = carDetails.isTrunkOpen;
  }

  displayInfo() {
    console.log(
      `${this.#brand} - ${this.#model} - Speed: ${this.#speed} km/h - Trunk: ${
        this.isTrunkOpen
      }`
    );
  }
  go() {
    this.#speed += 5;
    this.limitedSpeed();
    this.openTrunk();
  }
  brake() {
    this.#speed -= 5;
    this.limitedSpeed();
  }

  openTrunk() {
    if (this.#speed > 0) {
      this.isTrunkOpen = false;
    } else {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    return (this.isTrunkOpen = false);
  }

  limitedSpeed() {
    if (this.#speed >= 200) return (this.#speed = 200);
    if (this.#speed <= 0) return (this.#speed = 0);
  }
}

class RaceCar extends Car {
  acelleration;

  constructor(carDetails) {
    super(carDetails);
    this.isTrunkOpen = false;
    this.acelleration = carDetails.acelleration;
  }
  go() {
    this.speed += this.acelleration;
    this.limitedSpeed();
  }
  brake() {
    this.speed -= this.acelleration;
    this.limitedSpeed();
  }
  limitedSpeed() {
    if (this.speed >= 300) return (this.speed = 300);
    if (this.speed <= 0) return (this.speed = 0);
  }

  closeTrunk() {
    return (this.isTrunkOpen = false);
  }

  openTrunk() {
    return (this.isTrunkOpen = false);
  }

  displayInfo() {
    console.log(
      `${this.brand} - ${this.model} - Speed: ${this.speed} km/h - Trunk: ${this.isTrunkOpen}`
    );
  }
}

const firstCar = new Car({
  brand: "Toyota",
  model: "Corolla",
  isTrunkOpen: true,
});
const secondCar = new Car({
  brand: "Tesla",
  model: "Model 3",
  isTrunkOpen: false,
});

firstCar.go();
firstCar.go();
firstCar.brake();

firstCar.displayInfo();
secondCar.openTrunk();
secondCar.displayInfo();

const racingCar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acelleration: 20,
});
/*
racingCar.go();
racingCar.go();
racingCar.brake();

racingCar.displayInfo();
*/

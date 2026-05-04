import { differenceInHours } from "date-fns";

interface IChiller {
  get color(): string;
  get alert(): boolean;
}

export class Chiller {
  public static COLORS = {
    GREEN: "Green",
    BLACK: "Black",
    YELLOW: "Yellow",
    RED: "Red",
  };
  public static TYPES = [
    "Air Blast Freezer",
    "Chiller Bawang",
    "Reefer Container",
  ];
  private connection = false;
  constructor(
    timestamp: Date,
    private readonly ignition: number,
    private readonly temperature: number
  ) {
    const diffHours = differenceInHours(new Date(), timestamp);
    this.connection = diffHours < 1;
  }

  get isConnected() {
    return this.connection;
  }

  get isIgnited() {
    return !!this.ignition;
  }

  get temperatureValue() {
    return this.temperature;
  }
  static instance(
    chillerType: string,
    timestamp: Date,
    ignition: number,
    temperature: number
  ): AirBlastFreezer | ReeferContainer | ChillerBawang {
    let className = "";
    Chiller.TYPES.forEach((t) => {
      if (chillerType.includes(t)) {
        className = t.replaceAll(/\s/g, "");
      }
    });
    switch (className) {
      case "ChillerBawang":
        return new ChillerBawang(timestamp, ignition, temperature);
        break;
      case "ReeferContainer":
        return new ReeferContainer(timestamp, ignition, temperature);
        break;
      default:
        return new AirBlastFreezer(timestamp, ignition, temperature);
        break;
    }
  }
}

class AirBlastFreezer extends Chiller implements IChiller {
  get color() {
    return this.isConnected ? Chiller.COLORS.GREEN : Chiller.COLORS.BLACK;
  }

  get alert() {
    return !this.isConnected;
  }
}

class ChillerBawang extends Chiller implements IChiller {
  get color() {
    if (!this.isConnected) {
      return Chiller.COLORS.BLACK;
    }

    if (!this.isIgnited) {
      return Chiller.COLORS.YELLOW;
    }

    if (this.temperatureValue > 10) {
      return Chiller.COLORS.RED;
    }

    return Chiller.COLORS.GREEN;
  }

  get alert() {
    return !(
      this.isConnected &&
      this.isIgnited &&
      this.temperatureValue < 10
    );
  }
}

class ReeferContainer extends Chiller implements IChiller {
  get color() {
    if (!this.isConnected) {
      return Chiller.COLORS.BLACK;
    }

    if (!this.isIgnited) {
      return Chiller.COLORS.YELLOW;
    }

    if (this.temperatureValue > -10) {
      return Chiller.COLORS.RED;
    }

    return Chiller.COLORS.GREEN;
  }

  get alert() {
    return !(
      this.isConnected &&
      this.isIgnited &&
      this.temperatureValue < -10
    );
  }
}

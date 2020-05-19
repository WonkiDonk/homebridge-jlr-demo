require("@babel/polyfill");
import callbackify from "./util/callbackify"
import { JaguarLandRoverRemoteService } from "./util/remote";
import { myCredentials } from "./credentials.private"
import { API, HAP } from 'homebridge';
import { BatteryService, ChargingState } from "hap-nodejs/gen/"

let hap: HAP;

export default function (homebridge: API) {
  hap = homebridge.hap

  homebridge.registerAccessory(
    "homebridge-jlr-demo",
    "Hack My Jaguar",
    JaguarLandRoverAccessory,
  );
}

class JaguarLandRoverAccessory {
  private readonly batteryService: BatteryService
  private readonly jlrRemoteService: JaguarLandRoverRemoteService
  private readonly lowBatteryThreshold: number

  constructor(private log: any, config: any) {
    const name = config["name"]

    this.lowBatteryThreshold = config["lowBatteryThreshold"] || 25
    this.jlrRemoteService = new JaguarLandRoverRemoteService(log, myCredentials)
    this.batteryService = this.configureBatteryService(name)
  }

  getServices = () => [this.batteryService]

  private configureBatteryService = (name: string): BatteryService => {
    const service = new hap.Service.BatteryService(name, "vehicle")

    service
      .getCharacteristic(hap.Characteristic.BatteryLevel)
      .on("get", callbackify(this.getBatteryLevel));
    service
      .getCharacteristic(hap.Characteristic.ChargingState)
      .on("get", callbackify(this.getChargingState));
    service
      .getCharacteristic(hap.Characteristic.StatusLowBattery)

    return service
  }

  getBatteryLevel = async (): Promise<number> => {
    this.log("Getting battery level");

    const vehicleStatus = await this.jlrRemoteService.getVehicleStatus();
    const chargeLevel = vehicleStatus.EV_STATE_OF_CHARGE;

    return chargeLevel
  };

  getChargingState = async (): Promise<ChargingState> => {
    this.log("Getting charging state.");

    const vehicleStatus = await this.jlrRemoteService.getVehicleStatus();
    const chargingStatus = vehicleStatus.EV_CHARGING_STATUS;

    return chargingStatus === "CHARGING"
      ? hap.Characteristic.ChargingState.CHARGING
      : hap.Characteristic.ChargingState.NOT_CHARGING;
  };

  getStatusLowBattery = async (): Promise<boolean> => {
    this.log("Getting low battery status");

    const batteryLevel = await this.getBatteryLevel();

    return batteryLevel < this.lowBatteryThreshold;
  };
}

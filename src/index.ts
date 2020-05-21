require("@babel/polyfill");
import { API, HAP } from "homebridge"
import { JaguarLandRoverRemoteApi } from "./util/remote"
import { myCredentials } from "./credentials.private"
import { BatteryService, ChargingState } from "hap-nodejs/gen/"
import { HomeKitChargerService } from "./services/charger"
import { HomeKitLockService } from "./services/lock"
import { HomeKitPreconditioningService } from "./services/preconditioning"
import callbackify from "./util/callbackify"

let hap: HAP;

export default function (homebridge: API) {
  hap = homebridge.hap

  homebridge.registerAccessory(
    "homebridge-jlr-demo",
    "Hacking My Jaguar",
    JaguarLandRoverAccessory
  )
}

class JaguarLandRoverAccessory {
  private readonly services: any[]
  private readonly jlrRemoteApi: JaguarLandRoverRemoteApi

  constructor(private log: any, config: any) {
    const name = config["name"]

    this.jlrRemoteApi = new JaguarLandRoverRemoteApi(log, myCredentials)
    this.services = [
      this.createBatteryService(name),
      new HomeKitChargerService(name, log, this.jlrRemoteApi, hap.Service, hap.Characteristic).getService(),
      new HomeKitLockService(name, log, this.jlrRemoteApi, hap.Service, hap.Characteristic).getService(),
      new HomeKitPreconditioningService(name, 21, 18, log, this.jlrRemoteApi, hap.Service, hap.Characteristic).getService()
    ]
  }

  getServices = () => this.services

  private createBatteryService = (name: string): BatteryService => {
    const service = new hap.Service.BatteryService(name, "vehicle")

    service
      .getCharacteristic(hap.Characteristic.BatteryLevel)
      .on("get", callbackify(this.getBatteryLevel))

    service
      .getCharacteristic(hap.Characteristic.ChargingState)
      .on("get", callbackify(this.getChargingState))

    return service
  }

  private getBatteryLevel = async (): Promise<number> => {
    this.log("Getting battery level")

    const vehicleStatus = await this.jlrRemoteApi.getVehicleStatus()
    const chargeLevel = vehicleStatus.EV_STATE_OF_CHARGE

    return chargeLevel
  }

  private getChargingState = async (): Promise<ChargingState> => {
    this.log("Getting charging state")

    const vehicleStatus = await this.jlrRemoteApi.getVehicleStatus()
    const chargingStatus = vehicleStatus.EV_CHARGING_STATUS

    return chargingStatus === "CHARGING"
      ? hap.Characteristic.ChargingState.CHARGING
      : hap.Characteristic.ChargingState.NOT_CHARGING
  }
}

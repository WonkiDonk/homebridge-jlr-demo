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

}

class JaguarLandRoverAccessory {
  private readonly services: any[]
  private readonly jlrRemoteApi: JaguarLandRoverRemoteApi

  constructor(private log: any, config: any) {
    const name = config["name"]

    this.jlrRemoteApi = new JaguarLandRoverRemoteApi(log, myCredentials)
    this.services = [
    ]
  }

  getServices = () => this.services
}

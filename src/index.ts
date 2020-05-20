require("@babel/polyfill");
//#region Imports
import callbackify from "./util/callbackify"
import { API, HAP } from "homebridge"
import { JaguarLandRoverRemoteApi } from "./util/remote"
import { myCredentials } from "./credentials.private"
import { BatteryService, ChargingState } from "hap-nodejs/gen/"
import { HomeKitChargerService } from "./services/charger"
import { HomeKitLockService } from "./services/lock"
import { HomeKitPreconditioningService } from "./services/preconditioning"
//#endregion

let hap: HAP;

export default function (homebridge: API) {

}

class JaguarLandRoverAccessory {
  private readonly services: any[]
  private readonly jlrRemoteService: JaguarLandRoverRemoteApi

  constructor(private log: any, config: any) {
    const name = config["name"]

    this.jlrRemoteService = new JaguarLandRoverRemoteApi(log, myCredentials)
    this.services = [
    ]
  }

  getServices = () => this.services
}

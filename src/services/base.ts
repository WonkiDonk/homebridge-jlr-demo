import { JaguarLandRoverRemoteService } from "../util/remote";

export abstract class HomeKitService {
  protected readonly Characteristic: any;
  protected readonly incontrol: JaguarLandRoverRemoteService;
  protected readonly log: Function;
  protected service: any;

  constructor(log: Function, jlrRemoteService: JaguarLandRoverRemoteService, Characteristic: any) {
    this.log = log;
    this.incontrol = jlrRemoteService;
    this.Characteristic = Characteristic;
  }

  getService = () => this.service;
}

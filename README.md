# homebridge-jlr-incontrol

Jaguar Land Rover InControl plug in for [Homebridge](https://homebridge.io/).

Example config.json:

    {
      "accessories": [
        {
          "accessory": "Hacking My Jaguar",
          "name": "I-PACE",
          "vin": "1AAAAA111AA111111",
          "username": "foo@bar.uk",
          "password": "foobar",
          "pin": 1234,
          "deviceId": "UUID",
          "lowBatteryThreshold": 25,
          "targetTemperature": 21
        }
      ]
    }

- `deviceId` needs to be a unique device identifier to identify your Homebridge.
- `lowBatteryThresold` defines the battery level below which the battery is considered to be low.
  Defaults to 25% if the value is not specified.

Exposes:

- Battery service;
- Door Lock service;
- Vehicle pre-conditioning on/off switch.

If you use the example above, you would gain Siri commands like:

- _"What is the charge level on the I-PACE?"_ (check the charge level of the battery)
- _"Is the I-PACE charging?"_ (is the car charging?)
- _"Is the I-PACE locked?"_ (check if the car is locked)
- _"Open the I-PACE"_ (unlock the vehicle)
- _"Turn on the I-PACE Preconditioning"_ (pre-condition the I-PACE)
- _"Set the I-PACE Preconditioning to 18 degrees"_

## Development

You can run Rollup in watch mode to automatically transpile code as you write it:

```sh
  yarn dev
```

## Acknowledgements

This plug in is based on the work of [jlrpy](https://github.com/ardevd/jlrpy) and the excellent
reverse engineering of the [InControl API](https://documenter.getpostman.com/view/6250319/RznBMzqo)
contributed by [ardevd](https://github.com/ardevd).

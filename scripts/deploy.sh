# $HOMEBRIDGE_CONFIG should be path to homebridge configuration folder (e.g.: /home/pi/homebridge/config if you're using the default Homebridge on Raspberry Pi docker image)
scp package.json pi@linuxpi2:$HOMEBRIDGE_CONFIG/node_modules/homebridge-jlr-demo/
scp dist/index.js pi@linuxpi2:$HOMEBRIDGE_CONFIG/node_modules/homebridge-jlr-demo/dist/
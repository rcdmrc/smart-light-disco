const { Client } = require('tplink-smarthome-api');
const Config = require('./config')
const bulb = require('./bulb');

const client = new Client();

(async () => {
  const config = Config()
  const hosts = config.get('bulbs')
  const colorPalette = config.get('color_palette')
  const colorNames = Object.keys(colorPalette)
  const changeInterval = config.get('change_interval', 5000)
  const transitionPeriod =  config.get('transition_period', 300)

  let bulbs = []

  for ( const i in hosts ) {
    const host = hosts[i]
    const hostConfig = Config(new Map(Object.entries(host)))

    const myLabel = hostConfig.get('label', 'bulb')
    const myColors = hostConfig.get('colors', colorNames)
    const myTransitionPeriod = hostConfig.get('transition_period', transitionPeriod)
    const myInitialColor = hostConfig.get('initial_color', null)
    const device = await client.getDevice({host: host.host})

    const isOn = await device.getPowerState()
  
    if (!isOn) {
      await device.togglePowerState()
    }

    bulbs.push(new bulb.BulbWrapper(myLabel, device, colorPalette, myColors, myInitialColor, myTransitionPeriod))
  }

  const bulbParty = new bulb.BulbParty(bulbs, changeInterval)

  bulbParty.startParty()
})()

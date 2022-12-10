require('log-timestamp');
const assert = require('assert');

class BulbWrapper {
  constructor (label, bulb, color_palette, colors, initial_color = null, transition_period = 500) {
    this.label = label
    this.bulb = bulb
    this.color_palette = color_palette
    this.colors = colors
    this.brightness = 100
    this.transition_period = transition_period

    assert ( this.colors != null && this.colors.length > 1)
    if ( initial_color == null ) {
      this.color_index = 0
    } else {
      assert( this.colors.indexOf(initial_color) > -1 /* initial_color is not valid */)
      this.color_index = initial_color == null ? 0: this.colors.indexOf(initial_color)
    }
    assert ( this.color_index > -1 /* initial_color is not part of the color selection */)
  }

  setColor (color) {
    const defaults = {
      brightness: this.brightness,
      transition_period: this.transition_period
    }

    const lightSettings = Object.assign(
      {},
      defaults,
      color
    )

    lightSettings.color_temp = lightSettings.colorTemp

    return this.bulb.lighting.setLightState(lightSettings)
  }

  /**
   * Returns the definition of the next color in the list
   * @returns 
   */
  getNextColor() {
    const index = this.color_index
    if ( this.color_index + 1 < this.colors.length ) {
      this.color_index += 1
    } else {
      this.color_index = 0
    }
    let color = this.colors[index]
    return this.color_palette.get(color)
  }

  /**
   * Change the color to the next one on the list
   */
  async setNextColor() {
    let color = this.getNextColor()
    this.setColor(color)
  }
}

class BulbParty {
  constructor (bulbs, change_interval) {
    this.bulbs = bulbs
    this.changeInterval = change_interval
    this.interval = null
  }

  async setBulbNextColor(bulb) {
    await bulb.setNextColor()
  }

  async setNextColor(changeInterval) {
    const tasks = this.bulbs.map(this.setBulbNextColor)
    const results = await Promise.all(tasks)
    this.interval = setTimeout(async () => { this.setNextColor() }, this.changeInterval);
  }

  startParty () {

    this.setNextColor(this.changeInterval)
  }
}

exports.BulbParty = BulbParty
exports.BulbWrapper = BulbWrapper
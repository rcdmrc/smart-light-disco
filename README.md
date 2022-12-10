# Party Mode For Supported TP-LINK Smart Bulbs

This is a modification of [smart-light-disco](https://github.com/jrudio/smart-light-disco):

1. Adds support for more than one light bulb.
2. Uses NodeJS configuration files to describe the behavior. You'll be able to configure simple patterns in which all light bulbs change to the next configured color, in lockstep.
3. Support for describing a custom color palette via the configuration files.

My goal was to control two light bulbs to cycle through a set of colors, each bulb starting with a different color.

## Installation

1. Install the requirements with: `npm install`
2. Create a nodejs config file in the `config/` directory. More info about NodeJS config files [here](https://www.npmjs.com/package/config). 
3. Start the server with: `npm start`


const config = require('config')

class NiceMap {
    constructor(data) {
        this.data = data
    }

    get(key, fallback) {
        if (fallback == undefined) {
            return this.data.get(key)
        }

        if (this.data.has(key)) {
            return this.data.get(key)
        }
        return fallback
    }
}

function Config(d=null) {
    if ( d == null ) {
        return new NiceMap(config)
    } else {
        return new NiceMap(d)
    }
}

module.exports = Config
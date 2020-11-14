const dictionary = require("./dictionary.json")

module.exports = class ResponseCode{
    constructor(){
        this.status = new Set(),
        this.timestamp = new Date(),
        this.dictionary = dictionary
    }

    /* Frontend Functions */
    title(code){
        let result
        switch(`${code}`[0]){
            case "2": result = this.dictionary.success[code] || null
            break;
            case "4": result = this.dictionary.error[code] || null
            break;
            default: result = null
        }

        if(!result) throw new Error(`invalid response code of "${code}" in title() block`)
        return result.title
    }
    description(code){
        let result
        switch(`${code}`[0]){
            case "2": result = this.dictionary.success[code] || null
            break;
            case "4": result = this.dictionary.error[code] || null
            break;
            default: result = null
        }

        if(!result) throw new Error(`invalid response code of "${code}" in description() block`)
        return result.description
    }

    /* Backend Functions */
    pushCode(...codes){
        // responsecode.pushCode(<code :Array>)
        if(!Array.isArray(codes)) throw new Error(`argument must be an array. Found in .pushCode() of argument: "${codes}"`)
        codes.forEach(code => this.status.add(code))
    }
    pushData(data){
        // responsecode.pushData(<data :Object|Array>)
        if(typeof this.data == "undefined") this.data = data
        else if(Array.isArray(this.data)) this.data = [...this.data, ...data]
        else if(Object.keys(this.data).length) this.data = {...this.data, ...data}
        else this.data = data
    }
    pushTrace(){
        // responsecode.pushTrace(<data :Object|Array>)
        if(typeof this.trace == "undefined") this.trace = trace
        else if(Array.isArray(this.trace)) this.trace = [...this.trace, ...trace]
        else if(Object.keys(this.trace).length) this.trace = {...this.trace, ...trace}
        else this.trace = trace
    }
    result(){
        return {
            status: [...this.status],
            data: typeof this.data != "undefined" ? this.data : undefined,
            trace: typeof this.trace != "undefined" ? this.trace : undefined,
            timestamp: this.timestamp
        }
    }
}

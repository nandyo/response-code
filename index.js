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
        // responsecode.pushCode(<<code :Number>,...>)
        codes.forEach(code=>{
            // if(typeof code != "number") throw new Error(`argument must be a number. Found in pushCode() of argument: "${code}"`)
            this.status.add(code)
        })
    }
    deleteCode(...codes){
        codes.forEach(code=> this.status.delete(code))
    }
    pushData(data){
        // responsecode.pushData(<data :Object|Array>)
        if(typeof this.data == "undefined") this.data = data
        else if(Array.isArray(this.data)) this.data = [...this.data, ...data]
        else if(Object.keys(this.data).length) this.data = {...this.data, ...data}
        else this.data = data
    }
    pushTrace({code, trace}){
        // responsecode.pushTrace({code: <code :Number>, trace: <custom error handle in front :Any>})
        if(typeof this.trace == "undefined") this.trace = {[code]: trace}
        else this.trace = {...this.trace, ...{[code]: trace}}
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

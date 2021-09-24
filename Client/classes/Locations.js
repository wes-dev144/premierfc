export default class Location {
    constructor(zip, city, state) {
        this.zip = zip
        this.city = city
        this.state = state
    }
    string() {
        return this.city + ", " + this.state + " " + this.zip
    }
}
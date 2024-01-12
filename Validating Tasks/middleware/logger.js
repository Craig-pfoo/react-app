const EvenEmitter = require('events');
class TestApplication extends EvenEmitter {
    loadApplication(message) {
        console.log(`${message}`);
        this.emit('loadApplication', message);
    }
}
module.exports = TestApplication;
import ActionHandler from './ActionHandler';

export default class EnqueueHandler implements ActionHandler {
    handle(data) {
        console.log(data);
    }
}
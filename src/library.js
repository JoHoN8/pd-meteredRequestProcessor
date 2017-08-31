/**
    app name pdmeteredrequestprocessor
 */
import * as statics from './constants';

/**
 * meteredRequestProcessor is a class that allows you to pass in multiple items to process
 * and controls how many requests will be sent to the server at a time
 * when all items are finished processing they will be passed to the .then of the init.
 */
export class meteredRequestProcessor {

    /**
     * ItemsToProcess is an array of anything you want, but each item in this array and the order number will be passed to addToProcessingCallback
     * and that function MUST return a native promise.
     * the order number is your id to locate elements (dom or whatever) based on the specific item processing
     * the processingCompletedCallback will be passed the order number and the process status (success or fail) to trigger any completed side effects
     * @param {any[]} itemsToProcess 
     * @param {function} addToProcessingCallback 
     * @param {function} processingCompletedCallBack 
     */
    constructor(itemsToProcess, addToProcessingCallback, processingCompletedCallback) {
        this.addedItems = [];
        this._processingItems = [];
        this.addedItems = this.addedItems.concat(itemsToProcess);
        this.toProcessingCB = addToProcessingCallback;
        this.postProcessingCB = processingCompletedCallback;
        this._totalToProcess = 3;
    }
    _totalProcessingItems() {
        let totalProcessing = 0;
        this._processingItems.forEach(item => {
            if (!item.completed) {
                totalProcessing++;
            }
        });
        return totalProcessing;
    }
    _finshProcessor() {

        this._mainResolve(this._processingItems);
    }
    _promiseDoneHelper(obj, data, status) {
        obj.response = data;
        obj.status = status;
        obj.completed = true;

        if (this.postProcessingCB) {
            this.postProcessingCB(obj.place, obj.status);
        }
    }
    _addToProcessor(index, promise) {
        let obj = {
            place: index,
            completed: false,
            status: 'processing'
        };

        promise
        .then((data) => {
            this._promiseDoneHelper(obj, data, statics.completedSuccess);
            this._postProcessing();
        }).catch((error) => {
            this._promiseDoneHelper(obj, error, statics.completedFail);
            this._postProcessing();
        });
        this._processingItems.push(obj);
    }
    _preProcessing() {
        //this function needs to be recursive, and keep totalToProcess in the array
        //check length of processing items if total to process then stop
        let totalProcessing = this._totalProcessingItems();

        if (this.addedItems.length === 0 || totalProcessing === this._totalToProcess) {
            //items are not done processing but there is no more to add or
            //processing array has compacity so just get out
            return;
        }
        //if not call addToProcessingCallBack, store in var and tack on a then
        let nextAvailableIndex = this._processingItems.length,
            nextItemToProcess = this.addedItems.shift(),
            cbProcessed = this.toProcessingCB(nextItemToProcess, nextAvailableIndex);
        
        if (!(cbProcessed instanceof Promise)) {
            //function passed in by user is not setup correctly, it must return a promise
            throw new Error(statics.incorrectAddToProcessingReturnType);
        }
        //create object and add to processing array
        this._addToProcessor(nextAvailableIndex, cbProcessed);
        this._preProcessing();    
    }
    _postProcessing() {
        //check if this is last call if yes then finish process
        let totalProcessing = this._totalProcessingItems();
        if (totalProcessing === 0 && this.addedItems.length === 0) {
            //process finished call finishing function and get out
            this._finshProcessor();
            return;
        }
        //else call preProcessing
        this._preProcessing();
    }
    /**
     * Allows you to change the total amount of simultaneous items to be procesed. 
     * @param {number} count 
     */
    changeConcurrentProcessing(count) {
        this._totalToProcess = count;
    }
    /**
     * Starts the processing process.
     * returns a native promise to .then off of, no need to catch, all item (success or fail) will be processed and passed to the .then
     * the items passed to the .then will be and array of objects with the following structure
     *  {
     *      place: number,
     *      completed: boolean,
     *      status: string (success or fail)
     *      response: the data returned from the server
     *  }
     * @returns {promise}
     */
    init() {
        return new Promise((resolve, reject) => {
            this._mainResolve = resolve;
            this._mainReject = reject;

            this._preProcessing();
        });
        
    }
}
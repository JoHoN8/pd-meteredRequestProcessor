/**
    app name pdmeteredrequestprocessor
 */
import * as statics from './constants';

export class meteredRequestProcessor {

    /**
     * items to process is an array of anything you want, but each item in this array will be passed to addToProcessingCallback
     * and that function MUST return a native promis.
     * @param {any[]} itemsToProcess 
     * @param {function} addToProcessingCallback 
     */
    constructor(itemsToProcess, addToProcessingCallback) {
        this.addedItems = [];
        this.processingItems = [];
        this.addedItems = this.addedItems.concat(itemsToProcess);
        this.toProcessingCB = addToProcessingCallback;
        this.totalToProcess = 3;
    }
    _totalProcessingItems() {
        let totalProcessing = 0;
        this.processingItems.forEach(item => {
            if (!item.completed) {
                totalProcessing++;
            }
        });
        return totalProcessing;
    }
    _finshProcessor() {
        return this.processingItems;
    }
    _addToProcessor(index, promise) {
        let obj = {
            place: index,
            processingItem: promise,
            completed: false,
            status: 'processing'
        };

        obj
        .processingItem
        .then(() => {
            obj.completed = true;
            obj.status = "completed";
            this._postProcessing();
        }).catch(() => {
            obj.completed = true;
            obj.status = "failed";
            this._postProcessing();
        });
        this.processingItems.push(obj);
    }
    _preProcessing() {
        //this function needs to be recursive, and keep totalToProcess in the array
        //check length of processing items if total to process then stop
        let totalProcessing = this._totalProcessingItems();

        if (this.addedItems.length === 0 || totalProcessing === this.totalToProcess) {
            //items are not done processing but there is no more to add or
            //processing array has compacity so just get out
            return;
        }
        //if not call addToProcessingCallBack, store in var and tack on a then
        let nextAvailableIndex = this.processingItems.length,
            nextItemToProcess = this.addedItems.shift(),
            cbProcessed = this.toProcessingCB(nextItemToProcess);
        
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
    init() {
        this._preProcessing();
    }
}
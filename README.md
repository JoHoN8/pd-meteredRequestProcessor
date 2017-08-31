<a name="meteredRequestProcessor"></a>

## meteredRequestProcessor
meteredRequestProcessor is a class that allows you to pass in multiple items to processand controls how many requests will be sent to the server at a timewhen all items are finished processing they will be passed to the .then of the init.

**Kind**: global class  

* [meteredRequestProcessor](#meteredRequestProcessor)
    * [new meteredRequestProcessor(itemsToProcess, addToProcessingCallback, processingCompletedCallBack)](#new_meteredRequestProcessor_new)
    * [.changeConcurrentProcessing(count)](#meteredRequestProcessor+changeConcurrentProcessing)
    * [.init()](#meteredRequestProcessor+init) ⇒ <code>promise</code>

<a name="new_meteredRequestProcessor_new"></a>

### new meteredRequestProcessor(itemsToProcess, addToProcessingCallback, processingCompletedCallBack)
ItemsToProcess is an array of anything you want, but each item in this array and the order number will be passed to addToProcessingCallbackand that function MUST return a native promise.the order number is your id to locate elements (dom or whatever) based on the specific item processingthe processingCompletedCallback will be passed the order number and the process status (success or fail) to trigger any completed side effects


| Param | Type |
| --- | --- |
| itemsToProcess | <code>Array.&lt;any&gt;</code> | 
| addToProcessingCallback | <code>function</code> | 
| processingCompletedCallBack | <code>function</code> | 

<a name="meteredRequestProcessor+changeConcurrentProcessing"></a>

### meteredRequestProcessor.changeConcurrentProcessing(count)
Allows you to change the total amount of simultaneous items to be procesed.

**Kind**: instance method of [<code>meteredRequestProcessor</code>](#meteredRequestProcessor)  

| Param | Type |
| --- | --- |
| count | <code>number</code> | 

<a name="meteredRequestProcessor+init"></a>

### meteredRequestProcessor.init() ⇒ <code>promise</code>
Starts the processing process.returns a native promise to .then off of, no need to catch, all item (success or fail) will be processed and passed to the .thenthe items passed to the .then will be and array of objects with the following structure {     place: number,     completed: boolean,     status: string (success or fail)     response: the data returned from the server }

**Kind**: instance method of [<code>meteredRequestProcessor</code>](#meteredRequestProcessor)  

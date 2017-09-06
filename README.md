## Classes

<dl>
<dt><a href="#meteredRequestProcessor">meteredRequestProcessor</a></dt>
<dd><p>meteredRequestProcessor is a class that allows you to pass in multiple items to process
and controls how many requests will be sent to the server at a time
when all items are finished processing they will be passed to the .then of the init.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#itemCompleted">itemCompleted</a> : <code>function</code></dt>
<dd><p>The processingCompletedCallback will be passed the order number and the process status (success or fail) to trigger any completed side effects
The order number is your id to locate elements (dom or whatever) based on the specific item processing</p>
</dd>
<dt><a href="#preProcessor">preProcessor</a> : <code>function</code></dt>
<dd><p>The index and itemData to process will be passed to this function
it MUST return a native promise.
the order number is your id to locate elements (dom or whatever) based on the specific item processing</p>
</dd>
</dl>

<a name="meteredRequestProcessor"></a>

## meteredRequestProcessor
meteredRequestProcessor is a class that allows you to pass in multiple items to processand controls how many requests will be sent to the server at a timewhen all items are finished processing they will be passed to the .then of the init.

**Kind**: global class  

* [meteredRequestProcessor](#meteredRequestProcessor)
    * [.setItemProcessedCB(cb)](#meteredRequestProcessor+setItemProcessedCB) ⇒ <code>void</code>
    * [.setPreProcessingCB(cb)](#meteredRequestProcessor+setPreProcessingCB) ⇒ <code>promise</code>
    * [.changeConcurrentProcessing(count)](#meteredRequestProcessor+changeConcurrentProcessing)
    * [.init(itemsToProcess)](#meteredRequestProcessor+init) ⇒ <code>promise</code>

<a name="meteredRequestProcessor+setItemProcessedCB"></a>

### meteredRequestProcessor.setItemProcessedCB(cb) ⇒ <code>void</code>
Sets the callback that will be called when an item is finished processing

**Kind**: instance method of [<code>meteredRequestProcessor</code>](#meteredRequestProcessor)  

| Param | Type |
| --- | --- |
| cb | [<code>itemCompleted</code>](#itemCompleted) | 

<a name="meteredRequestProcessor+setPreProcessingCB"></a>

### meteredRequestProcessor.setPreProcessingCB(cb) ⇒ <code>promise</code>
Sets the callback that will be called to add items to be processed

**Kind**: instance method of [<code>meteredRequestProcessor</code>](#meteredRequestProcessor)  

| Param | Type |
| --- | --- |
| cb | [<code>preProcessor</code>](#preProcessor) | 

<a name="meteredRequestProcessor+changeConcurrentProcessing"></a>

### meteredRequestProcessor.changeConcurrentProcessing(count)
Allows you to change the total amount of simultaneous items to be procesed.

**Kind**: instance method of [<code>meteredRequestProcessor</code>](#meteredRequestProcessor)  

| Param | Type |
| --- | --- |
| count | <code>number</code> | 

<a name="meteredRequestProcessor+init"></a>

### meteredRequestProcessor.init(itemsToProcess) ⇒ <code>promise</code>
Starts the processing process.ItemsToProcess is an array of anything you want, but each item in this arrayReturns a native promise to .then off of, no need to catch, all item (success or fail) will be processed and passed to the .thenthe items passed to the .then will be and array of objects with the following structure {     place: number,     completed: boolean,     status: string (success or fail)     response: the data returned from the server }

**Kind**: instance method of [<code>meteredRequestProcessor</code>](#meteredRequestProcessor)  

| Param | Type |
| --- | --- |
| itemsToProcess | <code>array</code> | 

<a name="itemCompleted"></a>

## itemCompleted : <code>function</code>
The processingCompletedCallback will be passed the order number and the process status (success or fail) to trigger any completed side effectsThe order number is your id to locate elements (dom or whatever) based on the specific item processing

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| status | <code>string</code> | 
| index | <code>number</code> | 

<a name="preProcessor"></a>

## preProcessor : <code>function</code>
The index and itemData to process will be passed to this functionit MUST return a native promise.the order number is your id to locate elements (dom or whatever) based on the specific item processing

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| itemData | <code>\*</code> | 
| index | <code>number</code> | 


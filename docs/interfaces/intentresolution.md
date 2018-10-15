[fdc3-api](../README.md) > [IntentResolution](../interfaces/intentresolution.md)

# Interface: IntentResolution

IntentResolution provides a standard format for data returned upon resolving an intent.

```javascript
//resolve a "Chain" type intent
var intentR = await agent.raiseIntent("intentName", context);
//resolve a "Client-Service" type intent with data response
var intentR = await agent.raiseIntent("intentName", context);
var dataR = intentR.data;
```

## Hierarchy

**IntentResolution**

## Index

### Properties

* [data](intentresolution.md#data)
* [source](intentresolution.md#source)
* [version](intentresolution.md#version)

---

## Properties

<a id="data"></a>

### `<Optional>` data

**● data**: *`object`*

*Defined in [interface.ts:51](/src/interface.ts#L51)*

___
<a id="source"></a>

###  source

**● source**: *`string`*

*Defined in [interface.ts:50](/src/interface.ts#L50)*

___
<a id="version"></a>

###  version

**● version**: *`string`*

*Defined in [interface.ts:52](/src/interface.ts#L52)*

___


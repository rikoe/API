[fdc3-api](../README.md) > [DesktopAgent](../interfaces/desktopagent.md)

# Interface: DesktopAgent

A Desktop Agent is a desktop component (or aggregate of components) that serves as a launcher and message router (broker) for applications in its domain.

A Desktop Agent can be connected to one or more App Directories and will use directories for application identity and discovery. Typically, a Desktop Agent will contain the proprietary logic of a given platform, handling functionality like explicit application interop workflows where security, consistency, and implementation requirements are proprietary.

## Hierarchy

**DesktopAgent**

## Index

### Methods

* [broadcast](desktopagent.md#broadcast)
* [contextListener](desktopagent.md#contextlistener)
* [intentListener](desktopagent.md#intentlistener)
* [open](desktopagent.md#open)
* [raiseIntent](desktopagent.md#raiseintent)
* [resolve](desktopagent.md#resolve)

---

## Methods

<a id="broadcast"></a>

###  broadcast

▸ **broadcast**(context: *[Context](../#context)*): `void`

*Defined in [interface.ts:125](/src/interface.ts#L125)*

Publishes context to other apps on the desktop.

```javascript
agent.broadcast(context);
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| context | [Context](../#context) |

**Returns:** `void`

___
<a id="contextlistener"></a>

###  contextListener

▸ **contextListener**(handler: *`function`*): [Listener](listener.md)

*Defined in [interface.ts:146](/src/interface.ts#L146)*

Listens to incoming context broadcast from the Desktop Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| handler | `function` |

**Returns:** [Listener](listener.md)

___
<a id="intentlistener"></a>

###  intentListener

▸ **intentListener**(intent: *`string`*, handler: *`function`*): [Listener](listener.md)

*Defined in [interface.ts:141](/src/interface.ts#L141)*

Listens to incoming Intents from the Agent.

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | `string` |
| handler | `function` |

**Returns:** [Listener](listener.md)

___
<a id="open"></a>

###  open

▸ **open**(name: *`string`*, context?: *[Context](../#context)*): `Promise`<`void`>

*Defined in [interface.ts:87](/src/interface.ts#L87)*

Launches/links to an app by name.

If a Context object is passed in, this object will be provided to the opened application via a contextListener. The Context argument is functionally equivalent to opening the target app with no context and broadcasting the context directly to it.

If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.

```javascript
//no context
    agent.open('myApp');
    //with context
    agent.open('myApp', context);
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `string` |
| `Optional` context | [Context](../#context) |

**Returns:** `Promise`<`void`>

___
<a id="raiseintent"></a>

###  raiseIntent

▸ **raiseIntent**(intent: *`string`*, context: *[Context](../#context)*, target?: *`string`*): `Promise`<[IntentResolution](intentresolution.md)>

*Defined in [interface.ts:136](/src/interface.ts#L136)*

Raises an intent to the desktop agent to resolve.

```javascript
//raise an intent to start a chat with a given contact
const intentR = await agent.resolve("StartChat", context);
//use the IntentResolution object to target the same chat app with a new context
agent.raiseIntent("StartChat", newContext, intentR.source);
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent | `string` |
| context | [Context](../#context) |
| `Optional` target | `string` |

**Returns:** `Promise`<[IntentResolution](intentresolution.md)>

___
<a id="resolve"></a>

###  resolve

▸ **resolve**(intent: * `string` &#124; `undefined`*, context?: *[Context](../#context)*): `Promise`<[ActionMetadata](actionmetadata.md)[]>

*Defined in [interface.ts:117](/src/interface.ts#L117)*

Resolves an intent & context pair to a mapping of Intents and Apps (action metadata).

Resolve is effectively granting programmatic access to the Desktop Agent's resolver. Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific. If the intent argument is undefined, then all possible intents - and apps corresponding to the intents - are resolved for the provided context. If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.

```javascript
// find what intents and apps are supported for a given context
const actionMetadata = await agent.resolve(null, context);
// e.g.:
// [{
//     intent: { name: "StartCall", displayName: "Call" },
//     apps: [{ name: "Skype" }]
// },
// {
//     intent: { name: "StartChat", displayName: "Chat" },
//     apps: [{ name: "Skype" }, { name: "Symphony" }, { name: "Slack" }]
// }];

// select a particular intent to raise, targeted at a particular app
const selectedAction = actionMetadata[1];
const selectedApp = selectedAction.apps[0];

await agent.raiseIntent(selectedAction.intent.name, context, selectedApp.name);
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| intent |  `string` &#124; `undefined`|
| `Optional` context | [Context](../#context) |

**Returns:** `Promise`<[ActionMetadata](actionmetadata.md)[]>

___


type Context = Object;
type IntentName = String;
type AppIdentifier = String;

enum OpenError {
  AppNotFound = "AppNotFound",
  ErrorOnLaunch = "ErrorOnLaunch",
  AppTimeout = "AppTimeout",
  ResolverUnavailable = "ResolverUnavailable"
}

enum ResolveError {
  NoAppsFound = "NoAppsFound",
  ResolverUnavailable = "ResolverUnavailable",
  ResolverTimeout = "ResolverTimeout"
}

/**
 * App metadata is Desktop Agent specific - but should support a name property.
 */
interface AppMetadata {
  name: AppIdentifier;
}

interface Listener {
  /**
   * Unsubscribe the listener object.
   */
  unsubscribe();
}

/**
 * A Desktop Agent is a desktop component (or aggregate of components) that serves as a
 * launcher and message router (broker) for applications in its domain.
 * 
 * A Desktop Agent can be connected to one or more App Directories and will use directories for application
 * identity and discovery. Typically, a Desktop Agent will contain the proprietary logic of
 * a given platform, handling functionality like explicit application interop workflows where
 * security, consistency, and implementation requirements are proprietary.
 */
interface DesktopAgent {
  /**
   * Launches/links to an app by name.
   * 
   * If opening errors, it returns an `Error` with a string from the `OpenError` enumeration.
   */
  open(name: String, context: Context): Promise<void>;

  /**
   * Resolves a intent & context pair to a list of App names/metadata.
   *
   * Resolve is effectively granting programmatic access to the Desktop Agent's resolver. 
   * Returns a promise that resolves to an Array. The resolved dataset & metadata is Desktop Agent-specific.
   * If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.
   */
  resolve(intent: IntentName, context: Context): Promise<Array<AppMetadata>>;

  /**
   * Publishes context to other apps on the desktop.
   */
  broadcast(context: Context): void;

  /**
   * Sends an intent with the specified name and context, optionally to
   * a specific target application (bypassing the resolver).
   * 
   * @param intent - The name of the intent to send
   * @param context - The context object relating to the intent
   * @param target - The target application, if this is a targeted intent
   * 
   * @returns {Promise<void>} A promise that resolves if the intent successfully
   * results in launching an application, or an {@link Error} if rejected, where the message
   * matches one of the values of {@link ResolveError}.
   */
  sendIntent(intent: IntentName, context: Context, target?: AppIdentifier): Promise<void>;

  /**
   * Listens to incoming Intents from the Agent.
   */
  intentListener(intent: IntentName, handler: (context: Context) => void): Listener;

  /**
   * Listens to incoming context broadcast from the Desktop Agent.
   */
  contextListener(handler: (context: Context) => void): Listener;
}
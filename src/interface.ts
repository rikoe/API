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

interface Intent {
  intent: IntentName;
  context: Context;
  /**
   * Name of app to target for the Intent. Use if creating an explicit intent
   * that bypasses resolver and goes directly to an app.
   */
  target?: AppIdentifier;
  
  /**
   * Dispatches the intent with the Desktop Agent.
   * 
   * Accepts context data and target (if an explicit Intent) as optional args.
   * Returns a Promise - resolving if the intent successfully results in launching an App.
   * If the resolution errors, it returns an `Error` with a string from the `ResolveError` enumeration.
   */
  send(context: Context, target?: AppIdentifier): Promise<void>
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
   * Launches an application by its name, optionally providing context to use
   * when opening. If the app is already open, it will be brought to the front.
   * 
   * @param name - The identifier of the application to launch
   * @param context - An optional {Context} object provided to the application when it is launched, via its {ContextListener}
   * 
   * @returns A promise that resolves successfully if the application was opened,
   * and resolves with an {Error} where the message will match the {OpenError} enumeration.
   */
  open(name: AppIdentifier, context?: Context): Promise<void>;

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
   * Constructs a new intent
   */
  intent(intent: IntentName, context: Context, target: String): Intent;

  /**
   * Listens to incoming Intents from the Agent.
   */
  intentListener(intent: IntentName, handler: (context: Context) => void): Listener;

  /**
   * Listens to incoming context broadcast from the Desktop Agent.
   */
  contextListener(handler: (context: Context) => void): Listener;
}
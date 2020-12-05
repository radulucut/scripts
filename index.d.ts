export class ScriptStore {
  public load(url: string): Promise<void>;
  public isLoaded(url: string): boolean;
}


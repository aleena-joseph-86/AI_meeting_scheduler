export interface InvokeLLM {
  invoke(prompt: string): Promise<any>;
}

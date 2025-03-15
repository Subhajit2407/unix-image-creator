
import { toast } from "sonner";

export interface GenerateImageParams {
  positivePrompt: string;
  model?: string;
  numberResults?: number;
  outputFormat?: string;
  CFGScale?: number;
  scheduler?: string;
  strength?: number;
  promptWeighting?: "compel" | "sdEmbeds" | "none";
  seed?: number | null;
  lora?: string[];
}

export interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
  seed: number;
  NSFWContent: boolean;
  imageUUID?: string;
}

const API_ENDPOINT = "wss://ws-api.runware.ai/v1";

export class RunwareService {
  private ws: WebSocket | null = null;
  private apiKey: string | null = null;
  private connectionSessionUUID: string | null = null;
  private messageCallbacks: Map<string, (data: any) => void> = new Map();
  private isAuthenticated: boolean = false;
  private connectionPromise: Promise<void> | null = null;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.connectionPromise = this.connect();
  }

  private connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        reject(new Error("Maximum reconnect attempts reached"));
        return;
      }

      this.ws = new WebSocket(API_ENDPOINT);
      
      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
        this.authenticate().then(resolve).catch(reject);
      };

      this.ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        
        if (response.error || response.errors) {
          console.error("WebSocket error response:", response);
          const errorMessage = response.errorMessage || response.errors?.[0]?.message || "An error occurred";
          toast.error(errorMessage);
          return;
        }

        if (response.data) {
          response.data.forEach((item: any) => {
            if (item.taskType === "authentication") {
              console.log("Authentication successful, session UUID:", item.connectionSessionUUID);
              this.connectionSessionUUID = item.connectionSessionUUID;
              this.isAuthenticated = true;
            } else {
              const callback = this.messageCallbacks.get(item.taskUUID);
              if (callback) {
                callback(item);
                this.messageCallbacks.delete(item.taskUUID);
              }
            }
          });
        }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.log("WebSocket closed, attempting to reconnect...");
        this.isAuthenticated = false;
        this.reconnectAttempts++;
        
        setTimeout(() => {
          this.connectionPromise = this.connect();
        }, 1000 * Math.min(this.reconnectAttempts, 5));
      };
    });
  }

  private authenticate(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error("WebSocket not ready for authentication"));
        return;
      }
      
      const authMessage = [{
        taskType: "authentication",
        apiKey: this.apiKey,
        ...(this.connectionSessionUUID && { connectionSessionUUID: this.connectionSessionUUID }),
      }];
      
      // Set up a one-time authentication callback
      const authTimeout = setTimeout(() => {
        this.ws?.removeEventListener("message", authCallback);
        reject(new Error("Authentication timeout"));
      }, 10000);
      
      const authCallback = (event: MessageEvent) => {
        const response = JSON.parse(event.data);
        if (response.data?.[0]?.taskType === "authentication") {
          clearTimeout(authTimeout);
          this.ws?.removeEventListener("message", authCallback);
          resolve();
        }
      };
      
      this.ws.addEventListener("message", authCallback);
      this.ws.send(JSON.stringify(authMessage));
    });
  }

  async generateImage(params: GenerateImageParams): Promise<GeneratedImage> {
    // Wait for connection and authentication before proceeding
    if (!this.connectionPromise) {
      this.connectionPromise = this.connect();
    }
    
    try {
      await this.connectionPromise;
    } catch (error) {
      console.error("Connection failed:", error);
      this.connectionPromise = this.connect();
      await this.connectionPromise;
    }

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN || !this.isAuthenticated) {
      this.connectionPromise = this.connect();
      await this.connectionPromise;
    }

    const taskUUID = crypto.randomUUID();
    
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.messageCallbacks.delete(taskUUID);
        reject(new Error("Image generation timeout"));
      }, 60000);

      const message = [{
        taskType: "imageInference",
        taskUUID,
        model: params.model || "runware:100@1",
        width: 1024,
        height: 1024,
        numberResults: params.numberResults || 1,
        outputFormat: params.outputFormat || "WEBP",
        steps: 4,
        CFGScale: params.CFGScale || 1,
        scheduler: params.scheduler || "FlowMatchEulerDiscreteScheduler",
        strength: params.strength || 0.8,
        lora: params.lora || [],
        ...params,
      }];

      if (!params.seed) {
        delete message[0].seed;
      }

      if (message[0].model === "runware:100@1") {
        delete message[0].promptWeighting;
      }

      this.messageCallbacks.set(taskUUID, (data) => {
        clearTimeout(timeoutId);
        if (data.error) {
          reject(new Error(data.errorMessage));
        } else {
          resolve(data);
        }
      });

      this.ws.send(JSON.stringify(message));
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Create a singleton instance
let runwareInstance: RunwareService | null = null;

export const getRunwareService = (apiKey: string): RunwareService => {
  if (!runwareInstance || runwareInstance.apiKey !== apiKey) {
    runwareInstance = new RunwareService(apiKey);
  }
  return runwareInstance;
};

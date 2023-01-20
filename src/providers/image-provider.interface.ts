export interface ImageProvider {
  getImages(from: Date, to: Date): Promise<string[]> | string[];
}

export const IMAGE_PROVIDER_TOKEN = Symbol('ImageProvider');

function toJSON<T>(data: T): string {
  return JSON.stringify(data);
}

function fromJSON<T>(data: string): T {
  return JSON.parse(data);
}

export { toJSON, fromJSON };

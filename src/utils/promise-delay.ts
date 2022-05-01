let currentTimeoutId: ReturnType<typeof setTimeout>;

export function promiseDelayDisplacing(delay:number): Promise<void> {
  clearTimeout(currentTimeoutId);
  return new Promise((resolve) => {
    currentTimeoutId = setTimeout(resolve, delay);
  });
}

export function promiseDelay(delay:number):Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

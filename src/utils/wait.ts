const WAIT_TIMEOUT_MS = 1000;

function wait(waitMS = WAIT_TIMEOUT_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, waitMS));
}

export { wait, WAIT_TIMEOUT_MS };

const DEBOUNCE_TIMEOUT_MS = 500;

interface Options {
  debounceMS?: number;
}

function useDebounce({ debounceMS = DEBOUNCE_TIMEOUT_MS }: Options = {}) {
  let debounceTimeout: NodeJS.Timeout = null!;

  function debounce(func: () => void) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, debounceMS);
  }

  return { debounce };
}

export { useDebounce, DEBOUNCE_TIMEOUT_MS };

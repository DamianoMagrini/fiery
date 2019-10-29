import { AppState } from '.';

const STATE_ITEM_KEY = 'state';

const storage = localStorage || sessionStorage;

export const save_state = async (
  state: Partial<AppState>
): Promise<boolean> => {
  try {
    storage.setItem(
      STATE_ITEM_KEY,
      JSON.stringify({
        ...JSON.parse(storage.getItem(STATE_ITEM_KEY)),
        ...state
      })
    );
    return true;
  } catch {
    return false;
  }
};

export const load_state = (): Partial<AppState> | undefined => {
  try {
    return JSON.parse(storage.getItem(STATE_ITEM_KEY) || '{}');
  } catch {
    return {};
  }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore For debugging purposes.
window.flush_state = (): boolean => {
  try {
    storage.removeItem(STATE_ITEM_KEY);
    return true;
  } catch {
    return false;
  }
};

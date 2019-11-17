import { writable } from 'svelte/store';
import mermaid from 'mermaid';
import { Base64 } from 'js-base64'
import {push, pop, replace} from 'svelte-spa-router'

export const codeStore = writable(undefined);
export const fromUrl = data => {
  let code;
  let state;
  try {
    let stateStr = Base64.decode(data)
    state = JSON.parse(stateStr);

    console.log('state from url', state)

    if (state.code === undefined) { // not valid json
//      state = { code: '', mermaid: { theme: themeFromUrl } }
		}
		code = state.code;
  } catch (e) {
    console.error('Init error', e);
		code = `graph TD
			A[Client] --> B[Load Balancer2]
			B --> C[Server01]
			B --> D[Server02]
			D --> F[Server03]
			D --> I[Server02]
			D --> H[Server05]
			D --> G[Server04]
		`;
		state = { code, mermaid: { theme: 'default' } };
  }

  codeStore.set(state);

};
export const updateCodeStore = newState => {
  codeStore.set(newState);
  push('/edit/' + Base64.encode(JSON.stringify(newState)))
};
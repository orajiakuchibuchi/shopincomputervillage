import { Action } from "@ngrx/store";

export function simpleReducer(state: string = 'Hello World', action: Action) {
  console.log(action.type, state);

  switch (action.type) {
    case 'ENGLISH':
      return state = 'en';
    case 'YORUBA':
      return state = 'yoruba';
    case 'HAUSA':
      return state = 'hausa';
    case 'IGBO':
      return state = 'igbo';
    default:
      return state;
  }
}


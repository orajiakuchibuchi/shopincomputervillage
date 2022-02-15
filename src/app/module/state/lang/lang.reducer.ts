import { Action } from "@ngrx/store";

export function langReducer(state: string = 'EN', action: Action) {
  console.log(action.type, state);

  switch (action.type) {
    case 'EN':
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


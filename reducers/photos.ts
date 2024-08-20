enum TypesOfActions {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

interface IAppState {
  loading: boolean;
  error: boolean;
  photos: IPhoto[];
  nextPage: number;
}

export interface IPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export const actionCreators = {
  loading: () => ({ type: TypesOfActions.LOADING }),
  failure: () => ({ type: TypesOfActions.FAILURE }),
  success: (photos: IPhoto[], page: number) => ({
    type: TypesOfActions.SUCCESS,
    payload: { photos, page },
  }),
};

// an interface for our actions - inferred from the actioncreators for the reducer
interface IAppAction {
  type: TypesOfActions;
  payload?: { photos: IPhoto[]; page: number };
}

export const initialState: IAppState = {
  loading: false,
  error: false,
  photos: [],
  nextPage: 1,
};
// We'll concatenate the infinite list of photos into a photos array, keeping track of the next page to fetch with nextPage.

// a reducer function to handle each of our actions.
// handling a SUCCESS action, we concatenate the existing photos array with the new page of photos and increment the nextPage counter.
export function reducer(state: IAppState, action: IAppAction) {
  switch (action.type) {
    case TypesOfActions.LOADING:
      return { ...state, loading: true, error: false };
    case TypesOfActions.SUCCESS:
      if (action.payload) {
        return {
          ...state,
          loading: false,
          error: false,
          photos: [...state.photos, ...action.payload.photos],
          nextPage: state.nextPage + 1,
        };
      }
    case TypesOfActions.FAILURE:
      return { ...state, loading: false, error: true };
  }
}

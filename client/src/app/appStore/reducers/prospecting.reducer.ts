import { ALLPROSPECTINGACTIONS, ProspectingActionTypes } from '../actions/prospecting.actions';

export interface State {
  error: string | null;
  prospectList: Array<any>;
  filteredList: Array<any>;
  selectedProspect: Array<any>;
  success: string | null;
  recentStageProspect: Array<any>;
}

const initialState: State = {
  error: null,
  prospectList: [],
  filteredList: [],
  selectedProspect: [],
  success: null,
  recentStageProspect: []
};

export function reducer(state: any = initialState, action: ALLPROSPECTINGACTIONS) {
  switch (action.type) {
    case ProspectingActionTypes.GETPROSPECTLIST_SUCCESS: {
      return {
        ...state,
        success: 'Prospect List fetched successfully',
        prospectList: action.payload,
        filteredList: action.payload
      };
    }
    case ProspectingActionTypes.GETPROSPECTLIST_FAILURE: {
      return {
        ...state,
        success: null,
        error: 'Unable to fetch prospect list'
      };
    }
    case ProspectingActionTypes.FILTERPROSPECTBYTYPE_FAILURE: {
      return {
        ...state,
        success: null,
        error: 'Unable to filter by type'
      };
    }
    case ProspectingActionTypes.FILTERPROSPECTBYTYPE_SUCCESS: {
      return {
        ...state,
        success: 'filtered prospect list successfully',
        error: null,
        filteredList: action.payload
      };
    }
    case ProspectingActionTypes.ADDPROSPECT_SUCCESS: {
      return {
        ...state,
        success: 'Prospect added successfully',
        error: null
      };
    }
    case ProspectingActionTypes.ADDPROSPECT_FAILURE: {
      return {
        ...state,
        success: null,
        error: 'unable to add prospect'
      };
    }
    case ProspectingActionTypes.GETPROSPECTDETAILBYID_SUCCESS: {
      return {
        ...state,
        success: 'prospect detail by id fetched successfully',
        selectedProspect: action.payload,
        error: null
      };
    }
    case ProspectingActionTypes.GETPROSPECTDETAILBYID_FAILURE: {
      return {
        ...state,
        error: 'unable to fetch prospect detail by id',
        selectedProspect: [],
        success: null
      };
    }
    case ProspectingActionTypes.STAGEPROSPECT_SUCCESS: {
      return {
        ...state,
        error: null,
        success: 'Staged Prospect Successfully',
        recentStageProspect: action.payload
      };
    }
    case ProspectingActionTypes.STAGEPROSPECT_FAILURE: {
      return {
        ...state,
        success: null,
        error: 'unable to staged prospect',
        recentStageProspect: []
      };
    }
    case ProspectingActionTypes.GETPROSPECTPRODUCTSANDINDUSTRIES_SUCCESS: {
      return {
        ...state,
        error: null,
        success: 'Products and industries fetched successfully',
        recentStageProspect: action.payload
      };
    }
    case ProspectingActionTypes.GETPROSPECTPRODUCTSANDINDUSTRIES_FAILURE: {
      return {
        ...state,
        success: null,
        error: 'unable to fetched products and industries',
        recentStageProspect: []
      };
    }
  }
}

export const isProspectOperationSuccess = (state: State) => state.success;
export const getProspectList = (state: State) => state.prospectList;
export const getProspectFilteredList = (state: State) => state.filteredList;
export const getSelectedProspect = (state: State) => state.selectedProspect;
export const getrecentStageProspect = (state: State) => state.recentStageProspect;
export const isProspectOperationfail = (state: State) => state.error;

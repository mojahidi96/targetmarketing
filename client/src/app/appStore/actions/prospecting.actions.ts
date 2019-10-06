import { Action } from '@ngrx/store';

// import type function
import { type } from '../utils';
import { USER, CHAMBER, PROSPECT, SALESREP } from '../interfaces/user';

export const ProspectingActionTypes = {
  GETPROSPECTLIST: type('[prospect-action] get-allprospect'),
  GETPROSPECTLIST_SUCCESS: type('[prospect-action] get-allprospect-success'),
  GETPROSPECTLIST_FAILURE: type('[prospect-action] get-allprospect-failure'),
  FILTERPROSPECTBYTYPE: type('[prospect-action] filter-prospect-by-type'),
  FILTERPROSPECTBYTYPE_SUCCESS: type('[prospect-action] filter-prospect-by-type-success'),
  FILTERPROSPECTBYTYPE_FAILURE: type('[prospect-action] filter-prospect-by-type-failure'),
  STAGEPROSPECT: type('[prospect-action] stage-prospect'),
  STAGEPROSPECT_SUCCESS: type('[prospect-action] stage-prospect-success'),
  STAGEPROSPECT_FAILURE: type('[prospect-action] stage-prospect-failure'),
  ADDPROSPECT: type('[prospect-action] add-prospect'),
  ADDPROSPECT_SUCCESS: type('[prospect-action] add-prospect'),
  ADDPROSPECT_FAILURE: type('[prospect-action] add-prospect'),
  GETPROSPECTDETAILBYID: type('[prospect-action] get-prospect-detail-byId'),
  GETPROSPECTDETAILBYID_SUCCESS: type('[prospect-action] get-prospect-detail-byId-success'),
  GETPROSPECTDETAILBYID_FAILURE: type('[prospect-action] get-prospect-detail-byId-failure'),
  GETPROSPECTPRODUCTSANDINDUSTRIES: type('[prospect-action] get-prospect-product-industries'),
  GETPROSPECTPRODUCTSANDINDUSTRIES_SUCCESS: type('[prospect-action] get-prospect-product-and-industries-success'),
  GETPROSPECTPRODUCTSANDINDUSTRIES_FAILURE: type('[prospect-action] get-prospect-product-and-industries-failure'),
};

export class GetProspectList implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTLIST;
  constructor(public payload: any) { }
}
export class GetProspectListSuccess implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTLIST_SUCCESS;
  constructor(public payload: any) { }
}
export class GetProspectListFailure implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTLIST_FAILURE;
  constructor(public payload: any) {
  }
}
export class FilterProspectByType implements Action {
  readonly type: string = ProspectingActionTypes.FILTERPROSPECTBYTYPE;
  constructor(public payload: { type: string, value: string }) { }
}
export class FilterProspectByTypeSuccess implements Action {
  readonly type: string = ProspectingActionTypes.FILTERPROSPECTBYTYPE_SUCCESS;
  constructor(public payload: any) { }
}
export class FilterProspectByTypeFailure implements Action {
  readonly type: string = ProspectingActionTypes.FILTERPROSPECTBYTYPE_FAILURE;
  constructor(public payload: any) { }
}
export class StageProspect implements Action {
  readonly type: string = ProspectingActionTypes.STAGEPROSPECT;
  constructor(public payload: any) { }
}
export class StageProspectSuccess implements Action {
  readonly type: string = ProspectingActionTypes.STAGEPROSPECT_SUCCESS;
  constructor(public payload: any) { }
}
export class StageProspectFailure implements Action {
  readonly type: string = ProspectingActionTypes.STAGEPROSPECT_FAILURE;
  constructor(public payload: any) { }
}
export class AddProspect implements Action {
  readonly type: string = ProspectingActionTypes.ADDPROSPECT;
  constructor(public payload: any) { }
}
export class AddProspectSuccess implements Action {
  readonly type: string = ProspectingActionTypes.ADDPROSPECT_SUCCESS;
  constructor(public payload: any) { }
}
export class AddProspectFailure implements Action {
  readonly type: string = ProspectingActionTypes.ADDPROSPECT_FAILURE;
  constructor(public payload: any) { }
}
export class GetProspectDetailById implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTDETAILBYID;
  constructor(public payload: { id: string }) { }
}
export class GetProspectDetailByIdSuccess implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTDETAILBYID_SUCCESS;
  constructor(public payload: { id: string }) { }
}
export class GetProspectDetailByIdFailure implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTDETAILBYID_FAILURE;
  constructor(public payload: { id: string }) { }
}

export class GetProspectProductsAndIndustries implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTPRODUCTSANDINDUSTRIES;
  constructor(public payload: any) { }
}

export class GetProspectProductsAndIndustriesSuccess implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTPRODUCTSANDINDUSTRIES_SUCCESS;
  constructor(public payload: any) { }
}
export class GetProspectProductsAndIndustriesFailure implements Action {
  readonly type: string = ProspectingActionTypes.GETPROSPECTPRODUCTSANDINDUSTRIES_FAILURE;
  constructor(public payload: any) { }
}

export type ALLPROSPECTINGACTIONS = GetProspectList
  | GetProspectListSuccess
  | GetProspectListFailure
  | FilterProspectByType
  | FilterProspectByTypeSuccess
  | FilterProspectByTypeFailure
  | StageProspect
  | StageProspectSuccess
  | StageProspectFailure
  | AddProspect
  | AddProspectSuccess
  | AddProspectFailure
  | GetProspectDetailById
  | GetProspectDetailByIdSuccess
  | GetProspectDetailByIdFailure
  | GetProspectProductsAndIndustries
  | GetProspectProductsAndIndustriesSuccess
  | GetProspectProductsAndIndustriesFailure;

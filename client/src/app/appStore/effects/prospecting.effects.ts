import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProspectingService } from 'src/app/appServices/prospecting.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import {
  ProspectingActionTypes, GetProspectList,
  GetProspectListSuccess, GetProspectListFailure, FilterProspectByType,
  FilterProspectByTypeSuccess, FilterProspectByTypeFailure, StageProspect,
  AddProspect, GetProspectDetailById, StageProspectSuccess, AddProspectSuccess,
  AddProspectFailure, GetProspectDetailByIdFailure, GetProspectDetailByIdSuccess,
  StageProspectFailure,
  GetProspectProductsAndIndustries,
  GetProspectProductsAndIndustriesSuccess,
  GetProspectProductsAndIndustriesFailure
} from '../actions/prospecting.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProspectingEffects {
  @Effect()
  public GetProspectList: Observable<Action> = this.actions
    .ofType(ProspectingActionTypes.GETPROSPECTLIST)
    .debounceTime(500)
    .map((action: GetProspectList) => action.payload)
    .switchMap(payload => {
      const reqPayload = payload;
      return this.prospectingService.getProspectList(reqPayload)
        .map((response) => {
          return new GetProspectListSuccess(response);
        })
        .catch((error) => {
          return of(new GetProspectListFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public GetProspectListSuccess: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.GETPROSPECTLIST_SUCCESS),
    tap((response) => {
      this.toastr.success('Data Fetched Successfully', 'Operation Success', { timeOut: 1000 });

    })
  );

  @Effect({ dispatch: false })
  public GetProspectListFailure: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.GETPROSPECTLIST_FAILURE),
    tap((response) => {
      this.toastr.error('unable to fetch data', 'Operation Failure', { timeOut: 1000 });
    })
  );

  @Effect()
  public FilterProspectByType: Observable<Action> = this.actions
    .ofType(ProspectingActionTypes.FILTERPROSPECTBYTYPE)
    .debounceTime(500)
    .map((action: FilterProspectByType) => action.payload)
    .switchMap(payload => {
      const reqPayload = payload;
      return this.prospectingService.getProspectsByType(reqPayload)
        .map((response) => {
          return new FilterProspectByTypeSuccess(response);
        })
        .catch((error) => {
          return of(new FilterProspectByTypeFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public FilterProspectByTypeSuccess: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.FILTERPROSPECTBYTYPE_SUCCESS),
    tap((response) => {
      this.toastr.success('Prospect Filtered Successfully', 'Operation Success', { timeOut: 1000 });

    })
  );

  @Effect({ dispatch: false })
  public FilterProspectByTypeFailure: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.FILTERPROSPECTBYTYPE_FAILURE),
    tap((response) => {
      this.toastr.error('Unable to Filtered', 'Operation Failure', { timeOut: 1000 });
    })
  );
  @Effect()
  public StageProspect: Observable<Action> = this.actions
    .ofType(ProspectingActionTypes.STAGEPROSPECT)
    .debounceTime(500)
    .map((action: StageProspect) => action.payload)
    .switchMap(payload => {
      const reqPayload = payload;
      return this.prospectingService.stageProspect(reqPayload)
        .map((response) => {
          return new StageProspectSuccess(response);
        })
        .catch((error) => {
          return of(new StageProspectFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public StageProspectSuccess: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.STAGEPROSPECT_SUCCESS),
    tap((response) => {
      this.toastr.success('Stage Prospect Successfully', 'Operation Success', { timeOut: 1000 });

    })
  );

  @Effect({ dispatch: false })
  public StageProspectFailure: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.STAGEPROSPECT_FAILURE),
    tap((response) => {
      this.toastr.error('Unable to stage prospect', 'Operation Failure', { timeOut: 1000 });
    })
  );

  @Effect()
  public AddProspect: Observable<Action> = this.actions
    .ofType(ProspectingActionTypes.ADDPROSPECT)
    .debounceTime(500)
    .map((action: AddProspect) => action.payload)
    .switchMap(payload => {
      const reqPayload = payload;
      return this.prospectingService.addProspect(reqPayload)
        .map((response) => {
          return new AddProspectSuccess(response);
        })
        .catch((error) => {
          return of(new AddProspectFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public AddProspectSuccess: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.ADDPROSPECT_SUCCESS),
    tap((response) => {
      this.toastr.success('Prospect Added Successfully', 'Operation Success', { timeOut: 1000 });

    })
  );

  @Effect({ dispatch: false })
  public AddProspectFailure: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.ADDPROSPECT_FAILURE),
    tap((response) => {
      this.toastr.error('Unable Added Prospect', 'Operation Failure', { timeOut: 1000 });
    })
  );

  @Effect()
  public GetProspectDetailById: Observable<Action> = this.actions
    .ofType(ProspectingActionTypes.GETPROSPECTDETAILBYID)
    .debounceTime(500)
    .map((action: GetProspectDetailById) => action.payload)
    .switchMap(payload => {
      const reqPayload = payload;
      return this.prospectingService.getProspectDetailById(reqPayload)
        .map((response) => {
          return new GetProspectDetailByIdSuccess(reqPayload);
        })
        .catch((error) => {
          return of(new GetProspectDetailByIdFailure(error));
        });
    });

  @Effect({ dispatch: false })
  public GetProspectDetailByIdSuccess: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.GETPROSPECTDETAILBYID_SUCCESS),
    tap((response) => {
      this.toastr.success('Prospect Fetched Successfully', 'Operation Success', { timeOut: 1000 });

    })
  );

  @Effect({ dispatch: false })
  public GetProspectDetailByIdFailure: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.GETPROSPECTDETAILBYID_FAILURE),
    tap((response) => {
      this.toastr.error('Unable to fetch prospect details', 'Operation Failure', { timeOut: 1000 });
    })
  );

  @Effect()
  public GetProspectProductsAndIndustries: Observable<Action> = this.actions
    .ofType(ProspectingActionTypes.GETPROSPECTPRODUCTSANDINDUSTRIES)
    .debounceTime(500)
    .map((action: GetProspectProductsAndIndustries) => action.payload)
    .switchMap(payload => {
      const reqPayload = payload;
      return this.prospectingService.getProspectProductAndIndustries(reqPayload)
        .map((response) => {
          return new GetProspectProductsAndIndustriesSuccess(reqPayload);
        })
        .catch((error) => {
          return of(new GetProspectProductsAndIndustriesFailure(error));
        });
    });

  @Effect({ dispatch: false })
  public GetProspectProductsAndIndustriesSuccess: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.GETPROSPECTPRODUCTSANDINDUSTRIES_SUCCESS),
    tap((response) => {
      this.toastr.success('Prospect Product and Industries Fetched Successfully', 'Operation Success', { timeOut: 1000 });

    })
  );

  @Effect({ dispatch: false })
  public GetProspectProductsAndIndustriesFailure: Observable<Action> = this.actions.pipe(
    ofType(ProspectingActionTypes.GETPROSPECTPRODUCTSANDINDUSTRIES_FAILURE),
    tap((response) => {
      this.toastr.error('Unable to fetch prospect product and industries', 'Operation Failure', { timeOut: 1000 });
    })
  );

  constructor(private actions: Actions,
    private prospectingService: ProspectingService,
    private router: Router,
    private toastr: ToastrService) { }

}

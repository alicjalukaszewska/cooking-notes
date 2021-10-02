import { MutationTree } from "vuex";
import { AppState, Recipe, NameId, Filter, SortOption } from './types';
import Firebase from "firebase/app";
import { filterRecipeList, manageActiveFilters } from "@/services/filter.service";

export const mutations: MutationTree<AppState> = {
  updateRecipesList(state, payload: Recipe[]) {
    state.recipeList = payload;
    state.filteredRecipeList = payload;
  },
  updateActiveRecipe(state, payload: Recipe) {
    state.activeRecipe = payload;
  },
  updateIngredientsList(state, payload: NameId[]) {
    state.ingredientsList = payload;
  },
  updateUser(state, payload: Firebase.User | undefined | null) {
    if (!payload) {
      state.user = undefined
    } else {
      state.user = {
        uid: payload.uid,
        email: payload.email
      }
    }
  },
  filterList(state, payload: Filter) {    
    state.activeFilters = manageActiveFilters(payload, [...state.activeFilters])
    state.filteredRecipeList = filterRecipeList(state.activeFilters, state.recipeList) || state.recipeList
  },
  sortRecipeList(state, payload: SortOption) {
    const field = payload.id
    const sortedRecipeList = state.filteredRecipeList.sort((a, b) => String(a[field]).localeCompare(String(b[field])))
    state.filteredRecipeList = payload.order === 'ASC' ? sortedRecipeList : sortedRecipeList.reverse()
  }
};

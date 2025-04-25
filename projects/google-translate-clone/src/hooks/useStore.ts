import { useReducer } from "react";
import { Action, FromLanguage, Language, State } from "../types";
import { AUTO_LANGUAGE } from "../constants";

const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

function reducer(state: State, action: Action): State {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    if( state.fromLanguage === AUTO_LANGUAGE) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      loading,
      fromText: state.result,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    if(state.fromLanguage === action.payload) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      fromLanguage: action.payload,
      result: '', 
      loading
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    if(state.toLanguage === action.payload) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== ''
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export const useStore = () => {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

    //Crear funciones para no usar directamente el dispatch
    const interchangeLanguage = () => {
        dispatch({ type: 'INTERCHANGE_LANGUAGES'})
    }

    const setFromLanguage = (fromLanguage: FromLanguage) => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload: fromLanguage})
    }

    const setToLanguage = (toLanguage: Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload: toLanguage})
    }

    const setFromText = (fromText: string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload: fromText})
    }

    const setResult = (result: string) => {
        dispatch({ type: 'SET_RESULT', payload: result})
    }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,

    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  };
};

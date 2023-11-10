import { GLOBAL } from "../defines";

const initialState = {
  language: "en",
  currency: {
    locales: "bn-BD",
    currency: "BDT",
  },
  category: "All",
  keyword: "",
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL.SET_LANGUAGE:
      return {
        ...state,
        language: action.lang,
      };
    case GLOBAL.SET_CURRENCY:
      return {
        ...state,
        currency: {
          locales:
            action.cur === "BDT"
              ? "bn-BD"

              : "us-US",
          currency: action.cur,
        },
      };
    case GLOBAL.SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case GLOBAL.SET_SEARCH:
      return {
        ...state,
        keyword: action.keyword,
      };
    default:
      return state;
  }
};

export default globalReducer;

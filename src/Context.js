import React, { useReducer } from "react";
/*
interface Action {}

class ChangeSite implements Action {
  type: "CHANGE_SITE" = "CHANGE_SITE";
  payload!: Site;
}

class ToggleShowArchived implements Action {
  type: "TOGGLE_SHOW_ARCHIVED" = "TOGGLE_SHOW_ARCHIVED";
  flag!: boolean;
}

class ToggleShowMediaModal implements Action {
  type: "TOGGLE_SHOW_MEDIA_MODAL" = "TOGGLE_SHOW_MEDIA_MODAL";
  payload!: any;
}

class SuggestAction implements Action {
  type: "SUGGEST_ACTION" = "SUGGEST_ACTION";
  payload!: any;
}
*/
const ACTION_TYPES = {
  CHANGE_SITE: "CHANGE_SITE",
  TOGGLE_SHOW_ARCHIVED: "TOGGLE_SHOW_ARCHIVED",
  TOGGLE_SHOW_MEDIA_MODAL: "TOGGLE_SHOW_MEDIA_MODAL",
  SUGGEST_ACTION: "SUGGEST_ACTION"
};

const initialState = {
  show_archived: false,
  show_media_modal: false,
  toggleShowMediaModal: payload => {},
  toggleShowState: flag => {},
  site: {},
  image_data: { src: "", alt: "", caption: "" },
  setSite: site => {},
  suggest_kw: { keyword: "" },
  suggestFn: payload => {}
};

const AppCtxt = React.createContext({ ...initialState });

function appReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SHOW_ARCHIVED:
      return {
        ...state,
        show_archived: action.flag
      };
    case ACTION_TYPES.TOGGLE_SHOW_MEDIA_MODAL:
      return {
        ...state,
        show_media_modal: action.payload.show,
        image_data: action.payload.image_data
      };
    case ACTION_TYPES.SUGGEST_ACTION:
      return {
        ...state,
        suggest_kw: action.payload
      };
    case ACTION_TYPES.CHANGE_SITE:
      let site = {
        name: action.payload.name,
        id: action.payload.id
      };
      localStorage.setItem("CURRENT_SITE", JSON.stringify(site));
      return {
        ...state,
        site
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function CtxtProvider(props) {
  const [state, dispatch] = useReducer(appReducer, { ...initialState });

  const toggleShowState = flag => {
    dispatch({ flag: flag, type: ACTION_TYPES.TOGGLE_SHOW_ARCHIVED });
  };

  function toggleShowMediaModal(payload) {
    dispatch({ payload: payload, type: ACTION_TYPES.TOGGLE_SHOW_MEDIA_MODAL });
  }

  function setSite(site) {
    dispatch({ site: site, type: ACTION_TYPES.CHANGE_SITE });
  }

  function suggestFn(payload) {
    dispatch({ payload: payload, type: ACTION_TYPES.SUGGEST_ACTION });
  }
  /*
  React.useMemo(() => {
    if (localStorage.getItem("CURRENT_SITE")) {
      setSite(JSON.parse("" + localStorage.getItem("CURRENT_SITE")));
    }
    console.log("state.show_archived", state.show_archived);
  }, []);
  */
  return (
    <AppCtxt.Provider
      value={{
        show_archived: state.show_archived,
        show_media_modal: state.show_media_modal,
        image_data: state.image_data,
        toggleShowMediaModal,
        toggleShowState,
        site: state.site,
        setSite,
        suggest_kw: state.suggest_kw,
        suggestFn
      }}
      {...props}
    />
  );
}

export { AppCtxt, CtxtProvider };

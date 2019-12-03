import React, { useReducer } from "react";

const ACTION_TYPES = {
  CHANGE_SITE: "CHANGE_SITE",
  TOGGLE_SHOW_ARCHIVED: "TOGGLE_SHOW_ARCHIVED",
  TOGGLE_SHOW_MEDIA_MODAL: "TOGGLE_SHOW_MEDIA_MODAL",
  SUGGEST_ACTION: "SUGGEST_ACTION",
  UPDATESITE_ACTION: "UPDATESITE_ACTION",
  SET_DASHBOARD_SITE: "SET_DASHBOARD_SITE",
  SET_TAGS: "SET_TAGS"
};

const initialState = {
  show_archived: false,
  show_media_modal: false,
  toggleShowMediaModal: payload => {},
  toggleShowState: flag => {},
  site: {},
  dashboard_site: {},
  image_data: { src: "", alt: "", caption: "" },
  setSite: site => {},
  setDashboardSite: site => {},
  will_update_site: { id: "", name: "", url: "", logoUrl: "" },
  updateSite: site => {},
  suggest_kw: { keyword: "" },
  tags: [],
  tags_arr: [],
  setTags: tags => {},
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
    case ACTION_TYPES.SET_TAGS:
      let tags_arr = [];
      action.tags.forEach(tag => (tags_arr[tag.hashtag] = tag.id));
      return {
        ...state,
        tags_arr: tags_arr,
        tags: action.tags
      };
    case ACTION_TYPES.UPDATESITE_ACTION:
      return {
        ...state,
        will_update_site: action.site
      };
    case ACTION_TYPES.SET_DASHBOARD_SITE:
      return {
        ...state,
        dashboard_site: action.site
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

  function setDashboardSite(site) {
    dispatch({ site: site, type: ACTION_TYPES.SET_DASHBOARD_SITE });
  }

  function updateSite(site) {
    dispatch({ site: site, type: ACTION_TYPES.UPDATESITE_ACTION });
  }

  function suggestFn(payload) {
    dispatch({ payload: payload, type: ACTION_TYPES.SUGGEST_ACTION });
  }

  function setTags(tags) {
    dispatch({ tags: tags, type: ACTION_TYPES.SET_TAGS });
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
        will_update_site: state.will_update_site,
        dashboard_site: state.dashboard_site,
        setDashboardSite,
        updateSite,
        setSite,
        suggest_kw: state.suggest_kw,
        suggestFn,
        tags: state.tags,
        tags_arr: state.tags_arr,
        setTags
      }}
      {...props}
    />
  );
}

export { AppCtxt, CtxtProvider };

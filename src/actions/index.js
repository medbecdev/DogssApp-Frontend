import {
  sortAlphAsc,
  sortAlphDesc,
  sortLightest,
  sortHeaviest,
} from "./sorting_cbs/sortings";

export const fetchBreedsFromAPI = ({ source, temp, sorting }, query) => {
  return function (dispatch) {
    return fetch(
      query
        ? `https://dogsapp-backend-production-74e7.up.railway.app/dogs?name=${query}`
        : `https://dogsapp-backend-production-74e7.up.railway.app/dogs`
    )
      .then((response) => response.json())
      .then((data) => {
        if (typeof data !== "object") throw new Error(data);

        switch (sorting) {
          case "AtoZ":
            return data.sort(sortAlphAsc);

          case "ZtoA":
            return data.sort(sortAlphDesc);

          case "lightest":
            return data.sort(sortLightest);

          case "heaviest":
            return data.sort(sortHeaviest);

          default:
            return;
        }
      })
      .then((data) => {
        switch (source) {
          case "all":
            return data;

          case "api":
            return data.filter((i) => !i.createdInDb);

          case "submissions":
            return data.filter((i) => i.createdInDb === true);

          default:
            return;
        }
      })
      .then((data) => {
        if (temp === "all") {
          return data;
        } else {
          return data.filter((i) => i.temperament.includes(temp));
        }
      })
      .then((data) => {
        dispatch({ type: "GET_BREEDS", payload: data });
      })
      .catch((e) => dispatch({ type: "GET_BREEDS", payload: e.message }));
  };
};

export const fetchTemperamentsFromAPI = () => {
  return function (dispatch) {
    return fetch(
      `https://dogsapp-backend-production-74e7.up.railway.app/temperaments`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "GET_TEMPERAMENTS", payload: data });
      });
  };
};

export const getFilters = (source, temp, sorting) => {
  return { type: "GET_FILTERS", payload: { source, temp, sorting } };
};

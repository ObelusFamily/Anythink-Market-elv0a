import React from "react";
import logo from "../../imgs/logo.png";
import { connect } from "react-redux";
import {
  CHANGE_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
} from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
  searchTerm: state.itemList,
});

const mapDispatchToProps = (dispatch) => ({
  onInputChange: async (payload) => {
    if (payload.target.value.length > 2) {
      const response = await fetch(
        `http://localhost:3000/api/items?title=${payload.target.value}`
      );
      const json = await response.json();
      const items = json["items"];
      dispatch({
        type: CHANGE_SEARCH_TERM,
        payload: payload.target.value,
        items,
      });
    } else {
      const response = await fetch(`http://localhost:3000/api/items`);
      const json = await response.json();
      const items = json["items"];
      dispatch({ type: CLEAR_SEARCH_TERM, items: items });
    }
  },
});

const toggleInput = () => {
  document.getElementById("search-box").style.display = "contents";
};

const Banner = (props) => {
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">
            A place to <span onClick={toggleInput}>get </span>
          </span>
          <div id="search-box" style={{ display: "none" }}>
            <input
              onChange={props.onInputChange}
              placeholder="What is it that you truly desire?"
            />
          </div>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);

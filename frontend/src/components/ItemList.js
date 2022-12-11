import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  searchTerm: state.itemList.searchTerm,
});

const ItemList = (props) => {
  if (!props.items) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.searchTerm && props.items.length === 0) {
    return (
      <div className="scold-text" id="empty">
        <h1>☹</h1>
        <p>
          No items found for "<strong>{props.searchTerm}</strong>"
        </p>
      </div>
    );
  }

  if (props.items.length === 0) {
    return <div className="py-4 no-items">No items are here... yet.</div>;
  }

  return (
    <div className="container py-2">
      <div className="row">
        {props.items.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps)(ItemList);

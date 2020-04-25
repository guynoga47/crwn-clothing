import React from "react";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";
import { connect } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

const Directory = (props) => {
  return (
    <div className="directory-menu">
      {props.sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps}></MenuItem>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sections: selectDirectorySections(state),
});

export default connect(mapStateToProps)(Directory);

import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="inputs">
          <input
            placeholder="search title"
            onChange={(e) => this.props.filterTitle(e)}
            id="search-title"
          />
          <input
            placeholder="search place"
            onChange={(e) => this.props.filterPlace(e)}
            id="search-place"
          />
          <select onChange={this.props.searchCategoryChange}>
            <option value="">select category</option>
            <option value="birthday">birthday</option>
            <option value="nameday">nameday</option>
            <option value="anniversary">anniversary</option>
            <option value="meet">meet</option>
            <option value="concert">concert</option>
          </select>
        </div>
        <div className="headerH1">
          <h1> List Of Events </h1>
        </div >
        <div className="add-button">
          <button
            className="my-button-plus"
            onMouseOver={() => this.props.clearInputs()}
            onClick={() => this.props.toggleModal()} >
            +
          </button>
        </div>
      </header>
    );
  }
}

export default Header;

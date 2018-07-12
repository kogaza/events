import React from 'react';
import Modal from 'react-modal';

class ModalEdit extends React.Component {
  render() {
    return (
      <Modal className="edit-modal"
        isOpen={this.props.isActive}
        onRequestClose={() => this.toggleModal()}
      >
        <div >
          <form onSubmit={this.props.editSubmit}>
            <label>
              <p>title:</p>
              <input type="text"
                name="title"
                className="input-form-modal"
                value={this.props.title}
                onChange={(e) => this.props.handleTitleChange(e)}
              />
            </label>
            <label>
              <p>description:</p>
              <input type="text"
                name="description"
                className="input-form-modal"
                value={this.props.description}
                onChange={(e) => this.props.handleDescriptionChange(e)}
              />
            </label>
            <label>
              <p>organizer:</p>
              <input type="text"
                name="organizer"
                className="input-form-modal"
                value={this.props.organizer}
                onChange={(e) => this.props.handleOrganizerChange(e)}
              />
            </label>
            <label>
              <p>place:</p>
              <input type="text"
                name="place"
                className="input-form-modal"
                value={this.props.place}
                onChange={(e) => this.props.handlePlaceChange(e)}
              />
            </label>
            <label>
              <p>start:</p>
              <input id="datetime"
                type="datetime-local"
                name="place"
                className="input-form-modal"
                value={this.props.startDate}
                onChange={(e) => this.props.handleStartDateChange(e)}
              />
            </label>
            <label>
              <p>end:</p>
              <input id="datetime"
                type="datetime-local"
                name="place"
                className="input-form-modal"
                value={this.props.endDate}
                onChange={(e) => this.props.handleEndDateChange(e)}
              />
            </label>
            <label>
              <p>picture (link):</p>
              <input type="text"
                name="picture"
                className="input-form-modal"
                value={this.props.picture}
                onChange={(e) => this.handlePictureChange(e)}
              />
            </label>
            <label>
              <p>kategory:</p>
              <select value={this.props.kategory}
                onChange={(e) => this.props.handleCategoryChange(e)}>
                <option value="">select category</option>
                <option value="birthday">birthday</option>
                <option value="nameday">nameday</option>
                <option value="anniversary">anniversary</option>
                <option value="meet">meet</option>
                <option value="concert">concert</option>
              </select>
            </label>
            <div>
              <input type="submit" value="Save" className="my-button" />
              <button onClick={this.toggleModal} className="my-button"> Hide </button>
            </div>
          </form>
        </div>
        <div className='footerStyle'>
        </div>
      </Modal>
    );
  }
}

export default ModalEdit;

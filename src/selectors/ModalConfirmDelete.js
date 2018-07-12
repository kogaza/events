import React from 'react';
import Modal from 'react-modal';

class ModalConfirmDelete extends React.Component {
  render() {
    return (
      <Modal className="confirm-delete"
          isOpen={this.props.isOpen}
          onRequestClose={() => this.prosp.confirmDelete()}
        >
          <button className="my-button"
            onClick={(e) => this.props.deleteEvent(this.props.id)}
          >Confirm delete</button>
          <button className="my-button"
            onClick={() => this.props.noDeleteEvent()}>Cancel</button>
        </Modal>
    );
  }
}

export default ModalConfirmDelete;

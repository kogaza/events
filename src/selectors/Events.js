import React from 'react';

class Events extends React.Component {
  render() {
    let actualEvents;
    if (this.props.filteredEvents.length === 0 && this.props.numbersOfLetters === 0) {
      actualEvents = this.props.events;
    } else {
      actualEvents = this.props.filteredEvents;
    }
    const afterCategory = actualEvents.filter(event =>
      (event.category === this.props.filtredCategory || this.props.filtredCategory === "")
    );
    console.log("after: ", afterCategory);
    let showEvents = afterCategory.map((p, i) => {

      return <article key={i} className="" >
        <div>
          <h2>{p.title}</h2>
        </div>
        <div>
          <p>description: {p.description}</p>
        </div>
        <div>
          <p>organizer: {p.organizer}</p>
        </div>
        <div>
          <p>place: {p.place}</p>
        </div>
        <div className="event-date">
          <div className="start-end">
            <p>start: <b>{p.startDate.replace("T", ", ")}</b></p>
          </div>
          <div className="start-end">
            <p>end: <b>{p.endDate.replace("T", ", ")}</b></p>
          </div>
        </div>
        <div>
          <p>remaining time: {p.remainingDate}</p>
        </div>
        <div>
          <p>kategory: {p.category}</p>
        </div>
        <div className="pict articleelements">
          <img src={p.picture} alt="img" width="150px" height="100px" className="picture" />
        </div>
        <div className="buttons articleelements">
          <button
            className="my-button"
            onClick={() => this.props.editEvent(p.id)}
          >
            Edit
          </button>
          <button
            className="my-button"
            onMouseOver={() => this.props.prepareDeleteEvent(p.id)}
            onClick={this.props.confirmDelete} >
            Delete
          </button>
        </div>
      </article >
    })
    return showEvents;
  }
}

export default Events;

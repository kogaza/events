import React from 'react';
import Modal from 'react-modal';
import Events from './selectors/Events';
import Header from './selectors/Header';
import ModalEdit from './selectors/ModalEdit';
import ModalConfirmDelete from './selectors/ModalConfirmDelete';
import './App.css';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      qID: 1,
      isActive: false,
      confirmDelete: false,
      filteredEvents: [],
      numbersOfLetters: 0,
      filtredCategory: "",

      events: [
        {
          id: 0,
          title: "Spotkanie",
          description: "Zobaczmy sie ponownie",
          organizer: "Sąsiadki",
          place: "Park",
          startDate: "2018-07-22T12:00",
          remainingDate: "",
          endDate: "2018-08-13T14:00",
          picture: 'http://i49.tinypic.com/2isk3dj.jpg',
          category: 'meet'
        },
        {
          id: 1,
          title: "Urodziny",
          description: "Świętuj moje urodziny",
          organizer: "Solenizant",
          place: "Klub",
          startDate: "2018-07-17T08:30",
          remainingDate: "",
          endDate: "2018-07-17T23:59",
          picture: 'http://i43.tinypic.com/2rdykxi.jpg',
          category: 'birthday'
        },
        {
          id: 2,
          title: "Imieniny",
          description: "Wpadnij na Zygmunta",
          organizer: "Zygmunt",
          place: "Mieszkanie Zygi",
          startDate: "2018-08-22T13:15",
          remainingDate: "",
          endDate: "2018-08-24T18:45",
          picture: 'http://i47.tinypic.com/158438z.jpg',
          category: 'nameday'
        },
        {
          id: 3,
          title: "Rocznica ślubu",
          description: "Wypij za nich razem z nami",
          organizer: "Szwagier",
          place: "U szwagra",
          startDate: "2018-07-02T07:55",
          remainingDate: "",
          endDate: "2018-07-03T11:05",
          picture: 'http://i48.tinypic.com/9uuf12.jpg',
          category: 'anniversary'
        }
      ],
      id: "",
      title: "",
      description: "",
      organizer: "",
      place: "",
      startDate: "",
      endDate: "",
      picture: "",
      category: ""
    }
  }

  remainingDays = () => {
    const events = this.state.events;
    let actualDate = new Date().valueOf();
    let startDate, remainingTime, remainingDays, remainingHours, remainingDate;
    for (let i = 0; i < events.length; i++) {
      startDate = new Date(events[i].startDate).valueOf();
      remainingTime = startDate - actualDate;
      remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      remainingHours = Math.floor(remainingTime / (1000 * 60 * 60)) % 24;
      remainingDate = `${remainingDays} days ${remainingHours} hours to start`;
      events[i]['remainingDate'] = remainingDate;
    }
    this.setState({
      events
    })
  }
  componentDidMount() {
    this.remainingDays();
    this.interval = setInterval(() => {
      this.remainingDays();
    }, 30000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  deleteEvent(id) {
    const newEvents = this.state.events.filter((element) => element.id !== id);
    this.setState({
      confirmDelete: false,
      events: newEvents
    })
  }
  noDeleteEvent() {
    this.setState({
      confirmDelete: false,
    })
  }
  prepareDeleteEvent(id) {
    const editEvent = this.state.events.filter((element) => element.id === id);
    this.setState({
      id: editEvent[0].id
    })
  }
  editEvent(id) {
    const editEvent = this.state.events.filter((element) => element.id === id);
    this.setState({
      id: editEvent[0].id,
      title: editEvent[0].title,
      description: editEvent[0].description,
      organizer: editEvent[0].organizer,
      place: editEvent[0].place,
      picture: editEvent[0].picture,
      startDate: editEvent[0].startDate,
      endDate: editEvent[0].endDate,
      category: editEvent[0].category,
      isActive: !this.state.isActive
    })
  }
  clearInputs() {
    this.setState({
      id: "",
      title: "",
      description: "",
      organizer: "",
      place: "",
      startDate: "",
      endDate: "",
      picture: "",
      category: ""
    })
  }
  editSubmit = (event) => {
    let position = this.state.events.map((e) => e.id).indexOf(this.state.id);
    let newId;
    position === -1 ? newId = this.state.events.length : newId = this.state.id;
    event.preventDefault();
    let defaultPicture;
    if (this.state.picture === "") {
      defaultPicture = "http://i39.tinypic.com/smx2co.jpg"
    } else {
      defaultPicture = this.state.picture;
    }
    let newEvent = {
      id: newId,
      title: this.state.title,
      description: this.state.description,
      organizer: this.state.organizer,
      place: this.state.place,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      picture: defaultPicture,
      category: this.state.category
    }
    let actualEvents = this.state.events;
    position === -1 ? actualEvents.push(newEvent) : actualEvents[position] = newEvent;
    this.setState({
      isActive: false,
      events: actualEvents,
      title: "",
      description: "",
      organizer: "",
      place: "",
      startDate: "",
      endDate: "",
      picture: "",
      category: ""
    }, this.remainingDays())
  }
  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  };
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  };
  handleOrganizerChange(event) {
    this.setState({ organizer: event.target.value });
  };
  handlePlaceChange(event) {
    this.setState({ place: event.target.value });
  };
  handleStartDateChange(event) {
    let dateValue = event.target.value;
    let dateView = dateValue;
    this.setState({ startDate: dateView })
  };
  handleEndDateChange(event) {
    let dateValue = event.target.value;
    let dateView = dateValue;
    this.setState({ endDate: dateView })
  };
  handlePictureChange(event) {
    this.setState({ picture: event.target.value });
  };
  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
  };
  componentWillMount() {
    Modal.setAppElement('body');
  }
  toggleModal() {
    this.setState({
      isActive: !this.state.isActive
    })
  }
  confirmDelete() {
    this.setState({
      confirmDelete: !this.state.confirmDelete
    })
  }
  filterTitle(e) {
    const text = e.currentTarget.value;
    if (e.currentTarget.value !== "") {
      document.getElementById("search-place").setAttribute("disabled", "disabled");
    } else {
      document.getElementById("search-place").removeAttribute("disabled");
    }
    const filteredEvents = this.getFilteredTitles(text);
    this.setState({
      filteredEvents,
      numbersOfLetters: e.currentTarget.value.length
    });
  }
  filterPlace(e) {
    const text = e.currentTarget.value;
    if (e.currentTarget.value !== "") {
      document.getElementById("search-title").setAttribute("disabled", "disabled");
    } else {
      document.getElementById("search-title").removeAttribute("disabled");
    }
    const filteredEvents = this.getFilteredPlaces(text);
    this.setState({
      filteredEvents,
      numbersOfLetters: e.currentTarget.value.length
    });
  }
  getFilteredTitles(text) {
    const state = this.state.events;
    const foundTitles = state.filter(e => e.title.toLowerCase().includes(text.toLowerCase()));
    return foundTitles;
  }
  getFilteredPlaces(text) {
    const state = this.state.events;
    const foundPlaces = state.filter(e => e.place.toLowerCase().includes(text.toLowerCase()));
    return foundPlaces;
  }
  searchCategoryChange = (e) => {
    this.setState({
      filtredCategory: e.currentTarget.value
    });
  }

  render() {
    return (
      <div className="container2">
        <Header
          filterTitle={(e) => this.filterTitle(e)}
          filterPlace={(e) => this.filterPlace(e)}
          searchCategoryChange={(e) => this.searchCategoryChange(e)}
          clearInputs={(e) => this.clearInputs(e)}
          toggleModal={(e) => this.toggleModal(e)}
          remainingTime={(e) => this.remainingTime(e)}
        />
        <section>
          <Events
            filteredEvents={this.state.filteredEvents}
            numbersOfLetters={this.state.numbersOfLetters}
            events={this.state.events}
            filtredCategory={this.state.filtredCategory}
            editEvent={(id) => this.editEvent(id)}
            prepareDeleteEvent={(id) => this.prepareDeleteEvent(id)}
            confirmDelete={() => this.confirmDelete()}
          />
        </section>
        <form className="add-event" id="add" onSubmit={this.handleSubmit}>
          <label>
            <p>title:</p>
            <input type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </label>
          <label>
            <p>description:</p>
            <input type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </label>
          <label>
            <p>organizer:</p>
            <input type="text"
              name="organizer"
              value={this.state.organizer}
              onChange={this.handleOrganizerChange}
            />
          </label>
          <label>
            <p>place:</p>
            <input type="text"
              name="place"
              value={this.state.place}
              onChange={this.handlePlaceChange}
            />
          </label>
          <label>
            <p>picture (link):</p>
            <input type="text"
              name="picture"
              value={this.state.picture}
              onChange={this.handlePictureChange}
            />
          </label>
          <label>
            <p>kategory:</p>
            <select value={this.state.kategory} onChange={this.handleCategoryChange}>
              {/* <option value="">select category</option> */}
              <option value="birthday">birthday</option>
              <option value="nameday">nameday</option>
              <option value="anniversary">anniversary</option>
              <option value="meet">meet</option>
              <option value="concert">concert</option>
            </select>
          </label>
          <input type="submit" value="Save" className="my-button" />
          <button
            className="hide-form my-button"
            onClick={() => this.hideForm()}>
            Hide
          </button>
        </form>
        <ModalEdit
          isActive={this.state.isActive}
          title={this.state.title}
          description={this.state.description}
          organizer={this.state.organizer}
          place={this.state.place}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          picture={this.state.picture}
          kategory={this.state.kategory}
          toggleModal={() => this.toggleModal()}
          editSubmit={this.editSubmit}
          handleTitleChange={(e) => this.handleTitleChange(e)}
          handleDescriptionChange={(e) => this.handleDescriptionChange(e)}
          handleOrganizerChange={(e) => this.handleOrganizerChange(e)}
          handlePlaceChange={(e) => this.handlePlaceChange(e)}
          handleStartDateChange={(e) => this.handleStartDateChange(e)}
          handleEndDateChange={(e) => this.handleEndDateChange(e)}
          handlePictureChange={(e) => this.handlePictureChange(e)}
          handleCategoryChange={(e) => this.handleCategoryChange(e)}
        />
        <ModalConfirmDelete
          isOpen={this.state.confirmDelete}
          confirmDelete={this.confirmDelete}
          id={this.state.id}
          deleteEvent={(e) => this.deleteEvent(e)}
          noDeleteEvent={() => this.noDeleteEvent()}
        />
      </div>
    );
  }
}

export default App;

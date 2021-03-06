import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import LandingNav from './landingnav/landingnav';
import LandingGreet from './landinggreet/landinggreet';
import LandingBody from './landingbody/landingbody';
import DashboardNav from './dashboardnav/dashboardnav';
import DashboardGreet from './dashboardgreet/dashboardgreet';
import DashboardBody from './dashboardbody/dashboardbody';
import AddEventGreet from './addeventgreet/addeventgreet';
import EditEventGreet from './addeventgreet/editeventgreet'
import AddMemberNav from './addmembernav/addmembernav';
import AddMemberGreet from './addmembergreet/addmembergreet';
import SignUpNav from "./signupnav/signupnav";
import SignUpGreet from "./signupgreet/signupgreet";
import LoginNav from "./loginnav/loginnav";
import LoginGreet from "./logingreet/logingreet";
import AccountGreet from "./accountgreet/accountgreet";
import AccountNav from "./accountnav/accountnav";
import AddCalendar from "./addcalendar/addcalendar";
import ChangePassword from "./changepassword/changepassword";
import Footer from "./footer/footer";
import ApiContext from './ApiContext';
import EventDetails from './eventdetails/eventdetails'
import cfg from './config.js'
import moment from 'moment';
import {fromApi} from './diplomat.js';
import TokenServices from './services/token-services';
import Store from './store.js'

class App extends Component {

  state = {
    members: Store.members,
    events: [],
    currentUser: Store.members[0],
    userCalendars: Store.Calendars,
    currentCalendar: Store.Calendars[0],
    currentEvent: null
    
};

// setCalendars = userCalendars => {
//   this.setState({
//     userCalendars
    
//   })
// }



handleChangeCalendar = (calendar) => {

  
  
  this.setState({currentCalendar: calendar})
  console.log(calendar.id)
  this.setEvents(calendar.id)
}
setEvents = (calendarId) => {
  const events = Store.events.filter(event => event.calendar_id == calendarId)
  console.log(events)
  if(events.length) {
    this.setState({events: events.map((event) => ({...event, start: moment(event.start), end: moment(event.end)}))})
  }
  if(!events.length) {
    this.setState({events: []})
  }
}


handleChangeEvent = (eventId) => {
  console.log(eventId)
  const currentEvent = this.state.events.find(event => event.id == eventId)
  
  this.setState({currentEvent: currentEvent})
}

isLoggedIn = () => !!this.state.currentUser;

handleChangeUser = (user) => {
  this.setState({currentUser: user })
  this.handleChangeCalendar(this.state.userCalendars[0].id)
}



handleDeleteEvent = (eventId) => {
  console.log(eventId, this.state.events)
  this.setState({
      events: this.state.events.filter(event => event.id != eventId),
      currentEvent: null
      
  });

};

handleAddEvent = (event) => {
  console.log(this.state.members)
  this.setState({events: [...this.state.events, event] })
  // console.log(this.state.members)
}

handleUpdateEvent = updatedEvent => {
  const newEvents = this.state.events.map(event =>
    (event.id === updatedEvent.id)
      ? updatedEvent
      : event
  )
  this.setState({
    events: newEvents
  })
};

handleAddMember = (member) => {
  this.setState({members: [...this.state.members, member]})
  this.handleChangeCalendar(this.state.currentCalendar.id)
}

handleAddCalendar = (calendar) => {
  this.setState({userCalendars: [...this.state.userCalendars, calendar] })
}




componentDidMount() {
 

  
}

  renderNavRoutes() {
    return(
      <>
      <Route exact path="/" component={LandingNav} />
      <Route path="/dashboard" component={DashboardNav} />
      <Route path="/signup" component={SignUpNav} />
      <Route path="/login" component={LoginNav} />
      <Route path="/addmember" component={AddMemberNav} />
      <Route path="/addevent" component={AddMemberNav} />
      <Route path="/events/:eventId" component={AddMemberNav} />
      <Route path="/editevent/:eventId" component={AddMemberNav} />
      <Route path="/account" component ={AccountNav} />
      <Route path="/changepassword" component={AddMemberNav} />
      <Route path="/addcalendar" component={AddMemberNav} />

      
      </>
    )
  }

  renderGreetingRoutes() {
    return(
      <>
      <Route exact path="/" component={LandingGreet} />
      <Route exact path="/dashboard" component={DashboardGreet} />
      <Route path="/addevent" component={AddEventGreet} />
      <Route path="/signup" component={SignUpGreet} />
      <Route path="/login" component={LoginGreet} />
      <Route path="/addmember" component={AddMemberGreet} />
      <Route path="/events/:eventId" component ={EventDetails} />
      <Route path="/editevent/:eventId" component ={EditEventGreet} />
      <Route path="/account" component ={AccountGreet} />
      <Route path="/changepassword" component ={ChangePassword} />
      <Route path="/addcalendar" component ={AddCalendar} />
      </>
    )
  }

  renderBodyRoutes() {
    return(
      <>
      <Route exact path="/" component={LandingBody} />
      <Route exact path="/dashboard" component={DashboardBody} />
      {/* <Route path="/signup" component={SignUpGreet} />
      <Route path="/login" component={LoginGreet} /> */}
      </>
    )
  }
  
  renderFooterRoutes() {
    return(
      <>
      <Route path="/" component={Footer} />
      {/* <Route path="/dashboard" component={DashboardGreet} />
      <Route path="/signup" component={SignUpGreet} />
      <Route path="/login" component={LoginGreet} /> */}
      </>
    )
  }


  
  render() {

    // console.log(Store.Calendars)
    const value = {
      members: this.state.members,
      events: this.state.events,
      userCalendars: this.state.userCalendars,
      currentCalendar: this.state.currentCalendar,
      currentUser: this.state.currentUser,
      currentEvent: this.state.currentEvent,
      deleteEvent: this.handleDeleteEvent,
      addEvent: this.handleAddEvent, 
      addMember: this.handleAddMember,
      changeUser: this.handleChangeUser,
      changeCalendar: this.handleChangeCalendar,
      isLoggedIn: this.isLoggedIn,
      addCalendar: this.handleAddCalendar,
      changeEvent: this.handleChangeEvent,
      updateEvent: this.handleUpdateEvent
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav>
            {this.renderNavRoutes()}
          </nav>
          <main className='App'>
            {this.renderGreetingRoutes()}
            {this.renderBodyRoutes()}
          </main>
          <footer>
            {this.renderFooterRoutes()}
          </footer>
        </div>
      </ApiContext.Provider>
      
      
    );
  }
  
}

export default App;
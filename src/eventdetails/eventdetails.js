import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './eventdetails.css'
import ApiContext from '../ApiContext.js'
// import { findEvent } from '../eventhelpers'
import cfg from '../config.js'
import moment from 'moment';
import TokenServices from '../services/token-services';

function findEvent(id) {
    
    return fetch(cfg.API_ENDPOINT + 'events/' + id, {
        method: 'GET', 
        
        headers: { 
            'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
            'Content-type': 'application/json' }
    })
    .then(r => r.json())
    .then(() => console.log('success!'))
    
}


function deleteEventFromApi(eventId) {
    
    return fetch(cfg.API_ENDPOINT + 'events/' + eventId, {
        method: 'DELETE', 
    
        headers: { 
            'Authentication' : `Bearer ${TokenServices.getAuthToken()}`,
            'Content-type': 'application/json' }
    })

    .catch((e) => {alert("Couldn't delete") 
    console.log(e)}
    )
}



export default class EventDetails extends React.Component {
    

    static contextType = ApiContext;
    
    deleteEvent(eventId) {
        // this.context.addEvent({...event})
        deleteEventFromApi(eventId)
        
        .then(event => {
            this.context.deleteEvent(eventId)
            this.props.history.push(`/dashboard`)
        })
        // .catch(() => alert("Couldn't delete, sorry"))
    }

    formSubmitted = e => { 
        e.preventDefault()
        
        const eventId = this.props.match.params.eventId
        
        this.deleteEvent(eventId)
      }

    render() {
        const eventId = this.props.match.params.eventId

        // findEvent(eventId)

        
        const event = this.context.currentEvent
        // console.log(event)
        
        if (!event) 
        return (
        <div><h1>Not Found</h1></div>
        )

        return(
            
            
            <div className='eventDetails, greetgroup'>
                
               <h1>{event.name}</h1> 
               <ul>
                   <li className='detailsLi'>Start Time: {event.startTime}</li>
                   <li className='detailsLi'>End Time: {event.endTime}</li>
                   <li className='detailsLi'>Scheduled By: {event.owner.name}</li>
                   <li className='detailsLi'>Participants: 
                       <ul>
                       {event.members.map(member =>
                                            <li className='detailsLi' key={member.id}>{member.name}</li>
                                        )}
                       </ul>
                       
                    </li>
                    <button className='detailsBtn'><Link to={`/editevent/${eventId}`} > Edit Event</Link></button>
                    <button className='detailsBtn' onClick={this.formSubmitted}>Delete Event</button>

                   
                </ul>
                 
                
                
                    
            </div>
        )
        
    }
}
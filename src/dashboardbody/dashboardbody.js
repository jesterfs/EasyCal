import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext.js'
import './dashboardbody.css'


export default class DashboardBody extends React.Component {

    static contextType = ApiContext;

    render() {

        const memberList = this.context.members
        const eventList = this.context.events
        console.log({memberList})

        return(
            <div className='dashboard'>
                <div className='memberList'>
                    <ul>
                        {memberList.map(member => 
                            <li key={member.id}>{member.name}</li>)}
                    </ul>
                </div>
                <div className='eventList'>
                    <ul>
                        {eventList.map(event => 
                            <li key={event.id}>{event.name} - {event.date} - {event.participants}</li>)}
                    </ul>
                </div>
                <div className='calendar'>
                    <div className='month-indicator'>
                        <h3>October</h3>
                    </div>
                    <div className='day-of-week'>
                        <h3 className='item-a'>Sun</h3>
                        <h3 className='item-b'>Mon</h3>
                        <h3 className='item-c'>Tues</h3>
                        <h3 className='item-d'>Wed</h3>
                        <h3 className='item-e'>Thurs</h3>
                        <h3 className='item-f'>Fri</h3>
                        <h3 className='item-g'>Sat</h3>
                    </div>
                    <div className='date-grid'>
                        <button><time dateTime="2020-10-01">1</time></button>
                        <button><time dateTime="2020-10-02">2</time></button>
                        <button><time dateTime="2020-10-03">3</time></button>
                        <button><time dateTime="2020-10-04">4</time></button>
                        <button><time dateTime="2020-10-05">5</time></button>
                        <button><time dateTime="2020-10-06">6</time></button>
                        <button><time dateTime="2020-10-07">7</time></button>
                        <button><time dateTime="2020-10-08">8</time></button>
                        <button><time dateTime="2020-10-09">9</time></button>
                        <button><time dateTime="2020-10-10">10</time></button>
                        <button><time dateTime="2020-10-11">11</time></button>
                        <button><time dateTime="2020-10-12">12</time></button>
                        <button><time dateTime="2020-10-13">13</time></button>
                        <button><time dateTime="2020-10-14">14</time></button>
                        <button><time dateTime="2020-10-15">15</time></button>
                        <button><time dateTime="2020-10-16">16</time></button>
                        <button><time dateTime="2020-10-17">17</time></button>
                        <button><time dateTime="2020-10-18">18</time></button>
                        <button><time dateTime="2020-10-19">19</time></button>
                        <button><time dateTime="2020-10-20">20</time></button>
                        <button><time dateTime="2020-10-21">21</time></button>
                        <button><time dateTime="2020-10-22">22</time></button>
                        <button><time dateTime="2020-10-23">23</time></button>
                        <button><time dateTime="2020-10-24">24</time></button>
                        <button><time dateTime="2020-10-25">25</time></button>
                        <button><time dateTime="2020-10-26">26</time></button>
                        <button><time dateTime="2020-10-27">27</time></button>
                        <button><time dateTime="2020-10-28">28</time></button>
                        <button><time dateTime="2020-10-29">29</time></button>
                        <button><time dateTime="2020-10-30">30</time></button>
                        <button><time dateTime="2020-10-31">30</time></button>
                    </div>
                    
                </div>
            </div>
                
        )
        
    }
}
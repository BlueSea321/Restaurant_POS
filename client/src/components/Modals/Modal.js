import React, { Component } from 'react';
import { Button, Modal, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import Hoc from '../Hoc/Hoc'
import Occupied from './Occupied/Occupied';
import NewSeating from './NewSeating/NewSeating'


class SeatModal extends Component {

    state = {
        chosenServer: "Select Server",
        guestNumber: "Select Number",
        occupiedRender: null
    }
    occupiedRenderHandler = (page) => {
        console.log("render handler", page)
        this.setState({occupiedRender: page}, function(){console.log(`state updated ${this.state.occupiedRender}`)})
    }
    handleServerSelection = (server) => {
        this.setState({chosenServer: server});  
        this.props.setServer(server);     
    }

    setGuests = (numOfGuests) => {
        this.setState({guestNumber: numOfGuests})
    }

    render() {
        let modal = this.props.tables[this.props.activeTableIndex]

        if (this.props.activeTable) {
            return (
                <Hoc>
                    {/* if the table is occupied, render the waitstaff functions, else render a new seating function */}
                    {modal.isOccupied ? (
                        <Occupied modal={modal} click={this.occupiedRenderHandler} order={this.props.order}receipt={this.props.receipt} checkout={this.props.checkout} close={this.props.close} render={this.state.occupiedRender}/>
                    )
                        : (
                        <NewSeating modal={modal} chosenServer={this.state.chosenServer} servers={this.props.servers} setGuests={this.setGuests} seatGuests={this.props.seatGuests} handleServerSelection={this.handleServerSelection} guestNumber={this.state.guestNumber} close={this.props.close}/>   
                        )
                    }
                </Hoc>
            )
        }
        else {
            this.props.close();
            return null;
        }
    }
}
export default SeatModal;
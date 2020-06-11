import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadContacts } from '../actions/ContactActions';

import ContactFilter from '../cmps/ContactFilter'
import ContactList from '../cmps/ContactList'

class ContactPage extends Component {
    state = {
        filterBy: { term: '', roomId: '' }
    }

    componentDidMount() {
        // this.loadContacts()
    }

    loadContacts = async () => {
        await this.props.loadContacts(this.state.filterBy);
    };

    onFilterHandler = (filterBy) => {
        this.setState((prevState) => {
            // debugger
            return {
                filterBy: {
                    ...prevState.filterBy,
                    ...filterBy,
                },
            };
        }, this.loadContacts);
    };

    handleKeyPress = () => {
        if (this.props.contacts.length === 1) {
            let id = this.props.contacts[0]._id
            this.props.history.push(`/board/${id}`);
        }
    }

    onMoveToRoom = (roomId) => {
        this.props.history.push(`/board/${roomId}`);
    }

    render() {
        const { contacts, user } = this.props
        return (
            <div>
                {user && <div>
                    <ContactFilter
                        filterBy={this.state.filterBy}
                        onFilter={this.onFilterHandler}
                        moveToContact={this.handleKeyPress}></ContactFilter>
                    {!!contacts && <ContactList loggedinUser={user} contacts={user.friends} onMoveToRoom={this.onMoveToRoom}></ContactList>}
                </div>
                }
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        contacts: state.contact.contacts,
        user: state.user.loggedinUser,
    };
};

const mapDispatchToProps = {
    loadContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
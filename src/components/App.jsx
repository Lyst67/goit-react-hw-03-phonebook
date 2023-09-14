import { Component } from "react"
import  Form  from "./Form/Form";
import { Contacts } from "./Contacts/Contacts";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid"
const LS_KEY = "contacts"

class App extends Component {
  state = {
    contacts: [
       {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
       {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
       {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
       {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }
 
  formSubmitHandler = data => {
    console.log(data.name)
    const newContacts = {id: nanoid(), ...data, }
    const existElem = this.state.contacts.find((elem) =>
      elem.name === newContacts.name)
    if (existElem) {
      alert(`${data.name} is already in contacts`)
      return
    }
     this.setState((prevState) => ({
       contacts: [newContacts, ...prevState.contacts], 
		})) 
  }

  componentDidMount() {
     const savedContacts = JSON.parse(localStorage.getItem(LS_KEY))
    if (savedContacts) {
      this.setState({ contacts: savedContacts })
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts))
    }
    
  }

  handleFilter = (event) => {
    this.setState(this.state)
    const value = event.target.value
    this.setState({filter: value})
  }

  filterContacts = () => {
    const { filter, contacts } = this.state
return contacts.filter((el) => el.name.toLowerCase().includes(filter.toLowerCase()))
  }
  
    deleteElement = ({target: {name}}) => {
      this.setState((prevState) => ({
        contacts: prevState.contacts.filter((contact) => contact.name !== name)
      }))

  }

  render() {
  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={this.formSubmitHandler}
           />
      <h2>Contacts</h2>
      <Filter value={this.state.filter}
         handleFilter={this.handleFilter}
       />
      <Contacts
        deleteElement={this.deleteElement}
        searching={this.filterContacts()}
      />
     
    </div>
  );
}
}

export default App

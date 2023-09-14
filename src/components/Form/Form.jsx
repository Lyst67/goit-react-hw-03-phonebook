import { Component } from "react"
import css from './Form.module.css'

class Form extends Component {
    state = {
      name: '',
      number: '',
    }

     handleContactChange = (event) => {
    const {name, value} = event.currentTarget
    this.setState({ [name]: value})
  }
  handleSubmit = (event) => {
    event.preventDefault()
      this.props.onSubmit(this.state)
      this.reset()
    }
    reset = () => {
        this.setState({
            name: '', number: '', 
        })
    }

    render() {
        return(
        <form className={css.form_thumb} onSubmit={this.handleSubmit}>
        <label htmlFor="" className={css.form_label}>Name
              <input className={css.form_input} type="text" name="name" value={this.state.name} onChange={this.handleContactChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name"
                required
              />
            </label>
            <label htmlFor="" className={css.form_label}>Number
              <input className={css.form_input} type="tel" name="number" value={this.state.number} onChange={this.handleContactChange}
                pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                title="Phone number"
                required
              />
            </label>
        <button type="submit" className={css.form_btn}>Add contact</button>
      </form> 
    ) 
    }
}

export default Form
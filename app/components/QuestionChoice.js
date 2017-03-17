import React from 'react';

export default class QuestionChoice extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { selectedOption: null };
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( e ) {
    // Radio buttons need to have selected option explicitly set to render visually
    this.setState( { selectedOption: e.target.value } );
    // Pass the event up to the Question > Survey
    this.props.onChange( e );
  };

  render() {
    const id = this.props.data.id;
    const choices = this.props.data.choices;
    const name = "radio_" + id;

    return(
      <div className="question-radio-container">
      { choices.map( (choice, index) =>
        <label key={name + "_" + index}>
          <input type="radio"
            id={id}
            name={name}
            value={choice}
            checked={this.state.selectedOption === choice}
            onChange={this.handleChange}
          />
          {choice}
        </label>
      ) }
      </div>
    );
  }

}

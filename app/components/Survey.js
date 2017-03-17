import React from 'react';
import Question from './Question';
import { getJSON } from './fetchHelper';

export default class Survey extends React.Component {

  constructor( props ) {
    super( props );
    this.questions = [ { id: -1, type: "null", text: "Loading..."  } ];
    this.handleInputChange = this.handleInputChange.bind( this );
  };

  handleInputChange( e ) {
    // The target of the change (an input in our Question)
    const target = e.target;

    //console.log( "Survey.handleInputChange: %s > %s", id, value );
    //console.log( "Survey.state.beforeSetState: %o", this.state );

    // Create our new state
    let state = this.state;
    state[ target.id ] = target.value;

    // Save the state
    this.setState( state, function() {
      // TODO: Do we need to take action here after state changes?
      //  console.log( "Survey.setState.callback: state[%s] = %s", id, this.state[ id ] );
    } );
  };

  componentDidMount() {
    // Build our callback function for the request
    var callback = function( json ) {
      //console.log( "json: %o", json );
      //console.log( "data: %o", json.data );
      // Extract the questions
      var questions = [];
      var state = {};
      json.data.map( d => {
        questions.push( d );
        state[ d.id ] = null;
      } );
      // Map the questions and new state to our component
      this.questions = questions;
      // Place the new state back into the component
      this.setState( state );
    };

    // Fire our request, binding "this" to our callback so we can reference our state
    getJSON( './questions', callback.bind( this ) );

  };

  render() {
    return (
      <div>
        {this.questions.map( (question) =>
          <Question
            key={"question_" + question.id}
            data={question}
            onChange={this.handleInputChange}
          />
        )}
      </div>
    );
  };
};

Survey.defaultProps = {  };

import React from 'react';
import QuestionChoice from './QuestionChoice';
import QuestionText from './QuestionText';

export default class Question extends React.Component {

  constructor( props ) {
    super( props );
  }

  render() {
    const type = this.props.data.type;
    const text = ( this.props.data.id + 1 ) + '. ' + this.props.data.text;
    let input = null;

    if( type == "text" ) {
      input = <QuestionText data={this.props.data} onChange={this.props.onChange} />
    }

    else if( type == "choice" ) {
      input = <QuestionChoice data={this.props.data} onChange={this.props.onChange} />
    }

    return (
      <div className="question-container">
        <span>{text}</span>
        <div className="question-input-container">{input}</div>
      </div>
    );
  }

}

Question.defaultProps = {
  value: "enter text."
};

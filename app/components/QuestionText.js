import React from 'react';

export default class QuestionText extends React.Component {

  constructor( props ) {
    super( props );
  }

  render() {
    const id = this.props.data.id;
    const name = "input_" + id;
    const value = this.props.data.value;

    return (
      <input id={id} name={name} defaultValue={value} onChange={this.props.onChange} />
    );
  }

}

import React from 'react';
import { connect } from 'react-redux';
import { endMove } from '../actions';
import { fieldsImages } from '../img/fieldsImages';
import { chipsImages } from '../img/chipsImages';

class Field extends React.Component {
 onFieldClick = fieldId => {
  this.props.endMove(fieldId);
 }
 
 renderField() {
  const color = this.props.field.fieldColor;
  const fieldId = this.props.field.fieldId;
  const chipId = this.props.field.chipId;

  if (chipId === null) {
   return <div>
    <img style={{ width: '25.5vmin', zIndex: '1', position: 'relative' }} src={fieldsImages[color]} alt={fieldId} onClick={() => this.onFieldClick(fieldId)} />
   </div>
  } else {
   return <div>
    <img style={{ width: '25.5vmin', zIndex: '1', position: 'absolute' }} src={fieldsImages[color]} alt={fieldId} />
    <img style={{ width: '25.5vmin', zIndex: '2', position: 'relative' }} src={chipsImages[chipId]} alt={chipId} />
   </div>
  }
 }
 
 render() {
  return <div>{this.renderField()}</div>
 }
}

const mapStateToProps = (state, ownProps) => {
 return {
  boardSize: state.game.boardSize,
  field: state.board.find(field => field.fieldId === ownProps.fieldId)
 };
};

export default connect(
mapStateToProps,
 { endMove }
)(Field);
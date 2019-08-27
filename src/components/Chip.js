import React from 'react';
import { connect } from 'react-redux';
import { startMove } from '../actions';
import { chipsImages } from '../img/chipsImages';

class Chip extends React.Component {
 onChipClick = chipId => {
  this.props.startMove(chipId);
 };
 
 renderChip() {
  const chipId = this.props.chip.chipId;

  if (this.props.chip.holdsChip === true) {
   return <div>
    <img style={{ width: '8vmin', height: '8vmin' }} src={chipsImages[chipId]} alt={chipId} onClick={() => this.onChipClick(chipId)} />
   </div>
  } else {
   return <div>
    <img style={{ width: '8vmin', height: '8vmin' }} src={chipsImages[100]} alt={chipId} />
   </div>
  }
 }
 
 render() {
  return <div>{this.renderChip()}</div>
 }
}

const mapStateToProps = (state, ownProps) => {
 return {
  chip: state.stack.find(chip => chip.chipId === ownProps.chipId)
 };
};

export default connect(
 mapStateToProps,
 { startMove }
)(Chip);
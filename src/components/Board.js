import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Field from './Field';

class Board extends React.Component {
 renderBoard() {
  return _.chunk(this.props.board, this.props.boardSize).map(line => {
   return <div key={line[0].fieldId} style={{ height: 600 / this.props.boardSize + 'px', display: 'flex', flexDirection: 'row' }}> {
    line.map(field => {
     return <div key={field.fieldId} >
      <Field fieldId={field.fieldId} />
     </div>;
    })
   }
   </div>;
  });
 }
 
 render() {
  return <div>{this.renderBoard()}</div>;
 }
}

const mapStateToProps = state => {
 //console.log(state);

 return {
  boardSize: state.game.boardSize,
  board: state.board
  };
}

export default connect(
 mapStateToProps
)(Board);
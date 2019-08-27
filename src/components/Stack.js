import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Chip from './Chip';

class Stack extends React.Component {
 renderStack() {
  return _.chunk(this.props.stack, 10).map(line => { 
   return <div key={line[0].chipId} style={{ height: '8vmin', display: 'flex', flexDirection: 'row' }}>
    {
     line.map(chip => {
      return <div key={chip.chipId}><Chip chipId={chip.chipId}/></div>;
     })
    }
   </div>;
  });
 }

 render() {
  return <div>{this.renderStack()}</div>;
 }
}

const mapStateToProps = state => {
 return {
  stack: state.stack
 };
}

export default connect(
 mapStateToProps
)(Stack);
import React, {Component} from 'react';
import RC2 from 'react-chartjs2';
import { Card, CardTitle } from 'material-ui/Card'

const data = {
  datasets: [{
    label: 'First Dataset',
    data: [
      {
        x: 20,
        y: 30,
        r: 5
      }, 
      {
        x: 32,
        y: 25,
        r: 5
      },
      {
        x: 34,
        y: 10,
        r: 5
      },
      {
        x: 25,
        y: 15,
        r: 5
      }
    ],
    backgroundColor: '#FF6384',
    hoverBackgroundColor: '#FF6384',
  }]
};

class Bubble extends Component {
  render() {
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title="Bubble Chart" />
        <RC2 data={data} type='bubble' />
      </Card>
    );
  }
}

export default Bubble;
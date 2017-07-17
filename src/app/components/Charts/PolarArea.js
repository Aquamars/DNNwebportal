import React, {Component} from 'react';
import RC2 from 'react-chartjs2';
import { Card, CardTitle} from 'material-ui/Card';

const data = {
  datasets: [{
    data: [
      11,
      16,
      7,
      3,
      14
    ],
    backgroundColor: [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#E7E9ED',
      '#36A2EB'
    ],
    label: 'My dataset' // for legend
  }],
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ]
};

class PolarArea extends Component {
  render() {
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title="PolarArea Chart" />
        <RC2 data={data} type='polarArea' />
      </Card>
    );
  }
}

export default PolarArea;
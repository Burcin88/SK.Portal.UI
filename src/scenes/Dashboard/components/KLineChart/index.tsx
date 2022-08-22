import './index.less';
import React, { PureComponent } from 'react';
import { L } from '../../../../lib/abpUtility';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface KLineChartProps {
  data: any[]
}

class KLineChart extends PureComponent<KLineChartProps> {

  render() {
    const { data } = this.props;
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer >
          <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }} >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={L('ChartRequest')} stroke="rgb(83, 29, 171)" strokeWidth={2} activeDot={{ r: 12 }} />
            <Line type="monotone" dataKey={L('ChartWaiting')} stroke="rgb(250, 173, 20)" strokeWidth={2} />
            <Line type="monotone" dataKey={L('ChartApproved')} stroke="rgb(29, 165, 122)" strokeWidth={2} />
            <Line type="monotone" dataKey={L('ChartCancel')} stroke="rgb(250, 84, 28)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div >
    );
  }
}

export default KLineChart;
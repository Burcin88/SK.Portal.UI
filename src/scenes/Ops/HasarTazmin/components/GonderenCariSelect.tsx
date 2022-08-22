import React from 'react';
import {   
    Form,
    Input,
  } from 'antd';
import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';
import rules from '../HasarTazmin.validation';

  export interface ICProps {
    kDamageCompensationStore: KDamageCompensationStore;
    gonderenCariCom:string;
    gonderenKoduCom:string;
  }

  
export interface IState {

  cariList: any;

}
 





class GonderenCariSelect extends React.Component<ICProps,IState>  {

     state={
      cariList:[],
  
     };

    render() {
   
    

 

      return (
        <>

                       <Form.Item
                        name='tazmin_Musteri_Kodu'
                        rules={rules.Tazmin_Musteri_Kodu}
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>Gönderici Kodu</label>
                          }
                        >
                          <Input
                          className="formInputT"
                          placeholder={this.props.gonderenKoduCom}
                        />

                          
                        </Form.Item>



                        <Form.Item
                        name='tazmin_Musteri_Unvan'
                        rules={rules.Tazmin_Musteri_Unvan}
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>Gönderici</label>
                          }
                        >
                           
                           
                           <Input
                          className="formInputT"
                          placeholder={this.props.gonderenCariCom}
                         
                         
                        />
                        </Form.Item>
  
                        
        </>);
    }
  }



  export default  GonderenCariSelect
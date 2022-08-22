

import React from 'react';
import 'antd/dist/antd.css';

import AppComponentBase from '../../../../components/AppComponentBase';
import { inject, observer } from 'mobx-react';
import Stores from '../../../../stores/storeIdentifier';
import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';
import {    Button, Card, Col, Divider, Form, Row, Select, Space, Table } from 'antd';
import { L } from '../../../../lib/abpUtility';


import './../index.less';
import 'moment/locale/tr';
import { SendOutlined } from '@ant-design/icons';



export interface IProps {
  kDamageCompensationStore: KDamageCompensationStore;
  listdata:[];
}

export interface IState {
  
}



@inject(Stores.KDamageCompensationStore)
@observer
class DamageCompensationList extends AppComponentBase<IProps, IState> {
  state = {
    
  };





  public render() {
 
    const { Option } = Select;
    const columns = [
      {
        title: 'İşlem',
        dataIndex: 'islem',
        key: 'islemNo',
      },

      {
        title: 'İşlemi Yapan Kullanıcı',
        dataIndex: 'islemYapanKullanici',
        key: 'islemYapanKullanici',
      },
      {
        title: 'İşlem Tarihi',
        dataIndex: 'creationTime',
        key: 'creationTime',
      
        
      },

      {
        title: 'Statü',
        dataIndex: 'tazminStatu',
        key: 'tazminStatu',
      },
      {
        title: 'Ödeme',
        dataIndex: 'odemeDurumu',
        key: 'odemeDurumu',
        
      },
      {
        title: 'Gm Açıklama',
        dataIndex: 'gmAciklama',
        key: 'gmAciklama',
        
      },

      {
        title: 'Bölge Açıklama',
        dataIndex: 'bolgeAciklama',
        key: 'bolgeAciklama',
        
      },
    ];


    return (
      <>
        <React.Fragment >
         
          <Card>
             <Divider orientation="left">Tarihçe</Divider>
            <Table 
            columns={columns} 
             dataSource={this.props.listdata}
            locale={{ emptyText: L('NoData')  , sortTitle :'test' }} 
             bordered
             />


            <Divider orientation="left">İhbarname</Divider>

            <Form 
             
               layout='horizontal'>
                    <Row>

                        <Col span={7}>
                            <Form.Item 
                            
                            name='evaTazmin_Tipi'  label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Tazmin Ödeme Durumu</label>
                        } >
                                   

                                <Select 
                                  className="formInput"
                                  placeholder="Seçiniz"
                                  allowClear                                  
                                  
                                >
                                      <Option value="1">Evet</Option>
                                      <Option value="2">Hayır</Option>

                                </Select>



                          </Form.Item>
                        </Col>
                        </Row>



                        <Row>

                              <Col span={7}>
                                  <Form.Item 
                                  
                                  name='evaTazmin_Tipi'  label={
                                <label style={{ maxWidth: 155, minWidth: 155 }}>İhbarname Durumu</label>
                              } >
                                        

                                      <Select 
                                        className="formInput"
                                        placeholder="Seçiniz"
                                        allowClear                                  
                                        
                                      >
                                            <Option value="1">İhbarname Basılabilir</Option>
                                            <Option value="2">İhbarname Basılamaz</Option>

                                      </Select>



                                </Form.Item>
                              </Col>
                        </Row>

                        <Row >
                            <Col span={7} offset={2}>
                              <Space style={{ width: '100%' }}>
                                <Button type="primary"  icon={<SendOutlined />}    htmlType="submit">
                                 İhbarname Bas
                                </Button>
                              </Space>
                            </Col>
                          </Row>



                        </Form>





          </Card>







              






        </React.Fragment>
      </>
    );
  }
}

export default DamageCompensationList;


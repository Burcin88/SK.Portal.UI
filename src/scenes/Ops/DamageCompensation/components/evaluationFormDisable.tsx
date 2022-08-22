import React  from 'react';

import {   
    Col,
    Divider,
    Form,
    FormInstance,
    Input,
    Row,
    Select,
    Spin, 
  } from 'antd';

  import '../index.less';
  import { L } from '../../../../lib/abpUtility';

import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';
import CargoLocations from  '../../../../services/kDamageCompensations/dto/cargoLocations';
import TextArea from 'antd/lib/input/TextArea';




  export interface ICProps {
    kDamageCompensationStore:KDamageCompensationStore,
  }

  
export interface IState {
}
 



class EvalutionForm extends React.Component<ICProps,IState>  {  
    formRefEvalution = React.createRef<FormInstance>();
   
    state={
        pageLoding:false,
        odenecekTutar:true
   };



    render() {
      const { Option } = Select;
        
       


 //#region  TAZMIN TIPI SECME 
  const OnChangeGetTazminTipi=(values)=>{
    getEnumCompensationWhy(values)  
  }
 //#endregion


//#region TAZMIN NEDENI CAGIRMA 
const getEnumCompensationWhy = async (id: string) => {
  try {
       await this.props.kDamageCompensationStore.StoregetCompansationWhy(id);     
  } catch (e) {
    console.log(e);
  }
};
//#endregion



//#region  ODEME DURUMU
const OnchangeOdemeDurumu=(values)=>{
  if(values ==="3")
     this.setState({odenecekTutar:false})
} 
//#endregion



      return (
        <>
                      
                    <Spin spinning={this.state.pageLoding}
                     tip='Isleminiz Tamamlaniyor.Listeleme Sayfasina Yonlendiriliyorsunuz.'
                     size='large'>

                    <Divider orientation="left">{L('Degerlendirme Bilgileri')}</  Divider>

                            <Form ref={this.formRefEvalution}  labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 5 }} colon={false}>
                       
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Tazmin Tipi')}   name="evaTazmin_Tipi" rules={[{ required: true ,message:L('MissingInputEmpty') }]}>
                                            <Select disabled                                          
                                            placeholder={L('Lutfen Seciniz')}
                                            allowClear 
                                            onChange={OnChangeGetTazminTipi}                                          
                                          >
                                            <Option value="1">{L('Hasar')}</Option>
                                            <Option value="2">{L('Kayip')}</Option>
                                            <Option value="3">{L('Gec Teslimat')}</Option>
                                            <Option value="4">{L('Musteri Memnuniyeti')}</Option>
                                          </Select>
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item name='evaTazmin_Nedeni' label={L('Tazmin Nedeni')}   rules={[{ required: true ,message:L('MissingInputEmpty')}]}>
                                        <Select  disabled                                 
                                            placeholder={L('Lutfen Seciniz')}
                                            allowClear                                         
                                          >
                                           {this.props.kDamageCompensationStore.getEnumCompensationWhy !== undefined &&
                                      this.props.kDamageCompensationStore.getEnumCompensationWhy.map((item) => (
                                        <Option key={`position_${item.id}`} value={item.name}>
                                          {item.name}
                                        </Option>
                                      ))}
                                          </Select>
                                            </Form.Item>
                                        </Col>                                
                                </Row>



                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Kargonun Bulungu Yer')}   name="evaKargo_Bulundugu_Yer" rules={[{ required: true ,message:L('MissingInputEmpty') }]}>
                                            <Select disabled                                       
                                            placeholder={L('Lutfen Seciniz')}
                                            allowClear                                                   
                                          >                                   
                                        {Object.keys(CargoLocations).map(key => (
                                                  <option key={key} value={CargoLocations[key].id}>
                                                    {CargoLocations[key].name}                                                 
                                                  </option>
                                                ))}
                                          </Select>
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item name='evaKusurlu_Birim' label={L('Kusurlu Birim Var Mi')}   rules={[{ required: true ,message:L('MissingInputEmpty')}]}>
                                        <Select disabled                                      
                                            placeholder={L('Lutfen Seciniz')}
                                            allowClear                                                                                             
                                          >
                                          <Option value="1">{L('Evet')}</Option>
                                           <Option value="2">{L('Hayir')}</Option>
                                          </Select>
                                            </Form.Item>
                                        </Col>                                
                                </Row>

                                
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Icerik Grubu')}   name="evaIcerik_Grubu" rules={[{ required: true ,message:L('MissingInputEmpty') }]}>
                                            <Select disabled                                         
                                            placeholder={L('Lutfen Seciniz')}
                                            allowClear                                                   
                                          >                                   
                                       <Option value="E-Ticaret">E-Ticaret</Option>
                                        <Option value="Teknoloji">Teknoloji</Option>
                                        <Option value="Basin">Basin</Option>
                                        <Option value="Diger">Diger</Option>
                                          </Select>
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item name='evaIcerik' label={L('Icerik')}   rules={[{ required: true ,message:L('MissingInputEmpty')}]}>
                                        <Input  disabled/>
                                            </Form.Item>
                                        </Col>                                
                                </Row>


                                    
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Urun Aciklama')}   name="evaUrun_Aciklama" rules={[{ required: true ,message:L('MissingInputEmpty') }]}>
                                            <Input disabled />
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item name='evaEkleyen_Kullanici' label={L('Eklenyen Kullanici')}   rules={[{ required: true ,message:L('MissingInputEmpty')}]}>
                                        <Input disabled  defaultValue={'Admin'} />
                                            </Form.Item>
                                        </Col>                                
                                </Row> 


                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Bolge Aciklama')}   name="evaBolge_Aciklama" rules={[{ required: false ,message:L('MissingInputEmpty') }]}>
                                            <TextArea disabled rows={4} style={{ width: '100%' }}></TextArea>
                                            </Form.Item>
                                        </Col>

                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item name='evaGm_Aciklama' label={L('GM Aciklama')}   rules={[{ required: false ,message:L('MissingInputEmpty')}]}>
                                        <TextArea  disabled rows={4} style={{ width: '100%' }}></TextArea>
                                            </Form.Item>
                                        </Col>       
                                                                                                
                                </Row> 


                                
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Talep Edilen Tutar')}   name="evaTalep_Edilen_Tutar" rules={[{ required: false ,message:L('MissingInputEmpty') }]}>
                                            <Input  disabled/>                                      
                                               </Form.Item>
                                        </Col>
                                                                                                
                                </Row> 

                                  
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item  label={L('Odeme Durumu')}   name="evaTazmin_Odeme_Durumu" rules={[{ required: true ,message:L('MissingInputEmpty') }]}>
                                            <Select disabled
                                            className="formInput"
                                            placeholder={L('PleaseSelect')}
                                            allowClear
                                            
                                            onChange={OnchangeOdemeDurumu}
                                          >
                                            <Option value="1">{L('Odenecek')}</Option>
                                            <Option value="2">{L('Odenmicek')}</Option>
                                            <Option value="3">
                                            {L('Farkli Bir Tutar Odenecek')}
                                            </Option>
                                          </Select>                                  
                                               </Form.Item>
                                        </Col>
                                                                                                
                                </Row> 

                                {
                                  this.state.odenecekTutar ?(''):
                                  (
                                    <Row> 
                                    <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                        <Form.Item label={L('Odenecek Tutar')}   name="evaOdenecek_Tutar" rules={[{ required: true ,message:L('MissingInputEmpty') }
                                         ,{
                                          pattern: /^\$?([0-9]{1,1},([0-9]{1,1},)*[0-9]{1,1}|[0-9]+)(.[0-9][0-9])?$/,
                                          message:L('MissingNumber'),
                                        }]}>
                                          <Input disabled  />                      
                                           </Form.Item>
                                    </Col>
                                                                                            
                            </Row> 
                                  )
                                }



                   

                            </Form> 


                        </Spin>
        </>);
    }
  }



  export default  EvalutionForm
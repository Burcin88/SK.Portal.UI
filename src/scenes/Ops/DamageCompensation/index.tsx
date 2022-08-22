/* eslint-disable */
import './index.less';
import { AlertOutlined, CheckCircleTwoTone, SwitcherOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Divider, PageHeader, Tabs, Select, notification } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import AppComponentBase from '../../../components/AppComponentBase';
import { isGranted, L } from '../../../lib/abpUtility';
import CompensationForm from './components/compensationForm';
import CompensationFormDisable from './components/compensationFormDisable';

import CompensationFormUpdate from './components/compensationFormUpdate';
import EvaluationForm from './components/evaluationForm';
import InterruptionForm from './components/interruptionForm';
import EvaluationFormDisable from './components/evaluationFormDisable';
import KDamageCompensationStore from '../../../stores/kDamageCompensationStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import SessionStore from '../../../stores/sessionStore';



const { TabPane } = Tabs;
export interface IProps {
  kDamageCompensationStore: KDamageCompensationStore;
  sessionStore: SessionStore;
}

export interface IState {
  OdemeBirimiBolgeListe: any;
  SurecSahibiBolgeListe: any;
  LastIdDamageCompensation: number;
  urlStatusPage: string;
  urlId: number;
  tabbane: boolean;
  defaulttab: string;
  processOwnerRegion: string;
  filesMultitable:any;
}


@inject(Stores.KDamageCompensationStore)
@inject(Stores.SessionStore)

@observer
class DamageCompensationNew extends AppComponentBase<IProps, IState> {

  state = {
    OdemeBirimiBolgeListe: [],
    SurecSahibiBolgeListe: [],
    LastIdDamageCompensation: 0,
    urlStatusPage: '',
    urlId: 0,
    globalDisable: false,
    tabbane: true,
    defaulttab: '1',
    processOwnerRegion: '',
    filesMultitable:[]
  };






  
  //#region update evalatuion surec sahibi bolge
  processOwnerRegionFunc = (string) => {
    this.setState({ processOwnerRegion: string })
  }
  //#endregion

  //#region update evalatuion dosya yukleme
  filesMultitableFunc=(files)=>{
      var control=false
      for (let index = 0; index < files.length; index++) {
           if (
           files[index].type === '' ||
           files[index].type === undefined ||
           files[index].type === 'application/x-msdownload'
         ) {
            control=true
         }    
      }

      if(control===true){
       this.ValidateMessage(true,'Dosya Hatasi','Lutfen Dosya Uzantisini Kontrol Ediniz Ve Yeniden Yukleyiniz.')      
      }else  {      
      this.setState({filesMultitable:files});
      }




  }
  //#endregion


     //#region BILGILENDIRME MESAJI METOT
      ValidateMessage=async(typ:boolean ,headerMsg:string,msg:string)=>{

      if(typ ===true){
          notification.open({
              icon: <AlertOutlined style={{ color: 'red' }} />,
              message: L(headerMsg),      
              description:L(msg),
            })
      }else
      {
          notification.open({
              icon: <CheckCircleTwoTone  style={{ color: 'green' }} />,
              message: L(headerMsg),      
              description:L(msg),       
            })
      }       
  }

  //#endregion




  async componentDidMount() {

    await this.props.sessionStore.getCurrentLoginInformations();
    await this.pageStart();
    if (this.state.urlStatusPage === "deg") {
      this.setState({ tabbane: false })
      this.setState({ defaulttab: '2' })
      await this.getSurecSahibiBolgeListesi();
    }
    else if (this.state.urlStatusPage === "view") {
      this.setState({ defaulttab: '1' })
      this.setState({ tabbane: false })
    }
    else {
      this.setState({ defaulttab: '1' })
      this.setState({ tabbane: true })
      await this.getOdemeBirimiBolgeListesi();
      await this.getSurecSahibiBolgeListesi();
      this.GetDamageCompensationIDReolad();
    }
  }



  //#region AKTIF TABI SECME 
  OnchabgeTabAtive = (key) => {
    this.setState({ defaulttab: key });
  };

  //#endregion




  //ODEMEBIRIMI BOLGE LISTESI
  getOdemeBirimiBolgeListesi = async () => {
    await this.props.kDamageCompensationStore.getBolgeListDamageComppensation();
    this.setState({
      OdemeBirimiBolgeListe:
        this.props.kDamageCompensationStore.getBolgeListDamage !== undefined &&
        this.props.kDamageCompensationStore.getBolgeListDamage.map((value, index) => (
          <Select.Option key={value.objId + '-' + index} value={value.objId + '-' + index}>
            {value.adi}
          </Select.Option>
        )),
    });


  };

  //SUREC SAHIBI BOLGE LISTE
  getSurecSahibiBolgeListesi = async () => {
    await this.props.kDamageCompensationStore.getBolgeListDamageComppensation();
    this.setState({
      SurecSahibiBolgeListe:
        this.props.kDamageCompensationStore.getBolgeListDamage !== undefined &&
        this.props.kDamageCompensationStore.getBolgeListDamage.map((value, index) => (
          <Select.Option key={value.objId + '-' + index} value={value.objId + '-' + index}>
            {value.adi}
          </Select.Option>
        )),
    });


  };



  //#region  SON TAZMIN ID 
  GetDamageCompensationID = () => {
    this.props.kDamageCompensationStore.GetDamageComppensationLastId();
    this.setState({ LastIdDamageCompensation: this.props.kDamageCompensationStore.lastIdDamage });
  }

  GetDamageCompensationIDReolad = () => {
    setInterval(this.GetDamageCompensationID, 5000);
  }

  //#endregion


  //#region SAYFA BASLANGICI
  pageStart = () => {
    var id = this.props['match'].params['id']
    var stt = this.props['match'].params['stt']
    this.setState({ urlId: id })
    this.setState({ urlStatusPage: stt })
  }
  //#endregion

  public render() {
    return (
      <React.Fragment>
        <Card >
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={
              <Breadcrumb>
                <Breadcrumb.Item>
                  {isGranted('items.dashboard.view') ? (
                    <Link to="/dashboard">{L('Dashboard')}</Link>
                  ) : (
                    <Link to="/home">{L('Dashboard')}</Link>
                  )}
                </Breadcrumb.Item>
                <Breadcrumb.Item> {L('DamageCompensation')} </Breadcrumb.Item>
                <Breadcrumb.Item>{L('DamageCompensationForm')} </Breadcrumb.Item>
              </Breadcrumb>
            }
          ></PageHeader>
        </Card>

        <Divider></Divider>

        <Card bordered={true}>

          <Tabs activeKey={this.state.defaulttab}
            //defaultActiveKey={this.state.defaulttab}  
            onChange={this.OnchabgeTabAtive}
            tabPosition='top'
            tabBarGutter={50}
            size='large'  >

            <TabPane tab={<span><SwitcherOutlined /> {L('Tazmin Formu')} </span>} key={1} disabled={this.state.tabbane}  >

              {
                this.state.urlStatusPage === 'deg' || this.state.urlStatusPage === 'view' ?

                  <CompensationFormDisable
                    kDamageCompensationStore={this.props.kDamageCompensationStore}
                    OdemeBirimiBolgeListe={this.state.OdemeBirimiBolgeListe}
                    SurecSahiniBolgeListe={this.state.SurecSahibiBolgeListe}
                    LastIdDamageCompensation={this.state.LastIdDamageCompensation}
                    urlId={this.state.urlId}
                    processOwnerRegionFunc={this.processOwnerRegionFunc}
                    filesMultitableFunc={this.filesMultitableFunc}
                    SurecSahiniBolgeVisable={true}
                  />
                  :
                     this.state.urlStatusPage ==='up' ?
                     <CompensationFormUpdate
                     kDamageCompensationStore={this.props.kDamageCompensationStore}
                     OdemeBirimiBolgeListe={this.state.OdemeBirimiBolgeListe}
                     SurecSahiniBolgeListe={this.state.SurecSahibiBolgeListe}
                     LastIdDamageCompensation={this.state.LastIdDamageCompensation}
                     urlId={this.state.urlId}
                     processOwnerRegionFunc={this.processOwnerRegionFunc}
                     filesMultitableFunc={this.filesMultitableFunc}
                   />
                     
                     :  
                     <CompensationForm
                     kDamageCompensationStore={this.props.kDamageCompensationStore}
                     OdemeBirimiBolgeListe={this.state.OdemeBirimiBolgeListe}
                     SurecSahiniBolgeListe={this.state.SurecSahibiBolgeListe}
                     LastIdDamageCompensation={this.state.LastIdDamageCompensation}
                   />
              }

             


           

            </TabPane>
            <TabPane tab={<span><SwitcherOutlined /> {L('Degerlendirme')} </span>} key={2} disabled={this.state.tabbane} >

              {
                this.state.urlStatusPage === 'deg' ?
                  <EvaluationForm                   
                    kDamageCompensationStore={this.props.kDamageCompensationStore}
                    urlId={this.state.urlId}
                    UserNameSurname={this.props.sessionStore.currentLogin.user.userName}
                    title={this.props.sessionStore.currentLogin.user.title}
                    processOwnerRegion={this.state.processOwnerRegion}
                    filesMultitable={this.state.filesMultitable} />
                  :
                  <EvaluationFormDisable
                    kDamageCompensationStore={this.props.kDamageCompensationStore} />

              }

            </TabPane>

            <TabPane tab={<span><SwitcherOutlined /> {L('Tarihce')} </span>} key={3} disabled={this.state.tabbane}>
            </TabPane>

            {
               
                this.props.sessionStore.currentLogin.user.companyRelationObjId ==='3120000100000000001'  && this.state.urlId !==undefined
                  ?                       
                  <TabPane tab={<span><SwitcherOutlined /> {L('Kesinti')} </span>} key={4}   >
                  <InterruptionForm                   
                      kDamageCompensationStore={this.props.kDamageCompensationStore}
                      urlId={this.state.urlId}
                      title={this.props.sessionStore.currentLogin.user.title}
                      urlStatusPage={this.state.urlStatusPage}
                      ></InterruptionForm>

                  </TabPane>
                :                
                null}


          </Tabs>
        </Card>
      </React.Fragment>
    );
  }
}

export default DamageCompensationNew;

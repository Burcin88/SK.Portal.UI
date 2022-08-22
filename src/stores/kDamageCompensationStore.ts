/* eslint-disable */
import { action, observable } from 'mobx';
import { EntityDto } from '../services/dto/entityDto';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { FileDamage } from '../services/kDamageCompensations/dto/fileDamage';
import { GetSubeList } from '../services/kDamageCompensations/dto/getSubeList';
import { GetBirimList } from '../services/kDamageCompensations/dto/getBirimList';
import { GetBolgeList } from '../services/kDamageCompensations/dto/getBolgeList';
import { GetCariListDamage } from '../services/kDamageCompensations/dto/getCariListDamage';
import { CreateDamageInput } from '../services/kDamageCompensations/dto/createDamageInput';
import { ViewClass } from '../services/kDamageCompensations/dto/viewClass';
import { GetCreateDamageInput } from '../services/kDamageCompensations/dto/GetCreateDamageInput';
import KDamageCompensationService from '../services/kDamageCompensations/damageCompensationsService';
import { GetAllDamageCompensation } from '../services/kDamageCompensations/dto/GetAllDamageCompensation';
import { UpdateDamageCompensationClass } from '../services/kDamageCompensations/dto/updateDamageCompensation';
import { DamageCompensationEvalutainon } from '../services/kDamageCompensations/dto/damageCompensationEvalutaion';
import { FilterDamageCompensationDto } from '../services/kDamageCompensations/dto/filterDamageCompensationDto';
import { GetEnumCompensationWhy } from '../services/kDamageCompensations/dto/getEnumCompensationWyh';
import { UpdateNextStatu } from '../services/kDamageCompensations/dto/updateNextStatu';
import { Gethistroy } from '../services/kDamageCompensations/dto/gethistroy';
import { GetCurrent } from '../services/kDamageCompensations/dto/getCurrent';
import { GetCity } from '../services/kDamageCompensations/dto/getCity';
import { GetDistrict } from '../services/kDamageCompensations/dto/getDistrict';
import { GetCountry } from '../services/kDamageCompensations/dto/getCountry';
import { GetStreet } from '../services/kDamageCompensations/dto/getStreet';
import { KcariFind } from '../services/kDamageCompensations/dto/kcariFind';
import { GetWebSiparisKodu } from '../services/kDamageCompensations/dto/getWebSiparis';
import { InterruptionModalCreate } from '../services/kDamageCompensations/dto/interruptionModalCreate';
import { GetEvaBy } from '../services/kDamageCompensations/dto/getEvaBy';

class KDamageCompensationStore {
  @observable kdamage!: PagedResultDto<CreateDamageInput>;
  @observable getCreateDamageInput!: GetCreateDamageInput;
  @observable getCariListDamage!: GetCariListDamage[];
  @observable getSubeListDamage!: GetSubeList[];
  @observable getBolgeListDamage!: GetBolgeList[];
  @observable getBirimListDamage!: GetBirimList[];
  @observable lastIdDamage!: number;
  @observable getAllDamageCompensationStoreClass!: GetAllDamageCompensation[];
  @observable updateDamageCompensationClass!: UpdateDamageCompensationClass;
  @observable damageCompensationEvalutaion!: DamageCompensationEvalutainon;
  @observable damageCompensationViewClass!: ViewClass;
  @observable createNev!: string;
  @observable updateFile!: string;
  @observable fileDamage!: FileDamage;
  @observable getEnumCompensationWhy!: GetEnumCompensationWhy[];
  @observable gethistroy!: Gethistroy[];
  @observable getcurrent!: GetCurrent;
  @observable getAllCity!: GetCity[];
  @observable getDistrictByIdList!: GetDistrict[];
  @observable getCountry!: GetCountry[];
  @observable getStreet!: GetStreet[];
  @observable resultUpdateNextStatu!: string;
  @observable getKcariFind!: KcariFind[];
  @observable getWebSiparisKod!: GetWebSiparisKodu;
  @observable interruptionList!: PagedResultDto<InterruptionModalCreate>;
  @observable websipariskontrol!: string;
  @observable eva!: GetEvaBy;

  @action
  async create(createDamage: CreateDamageInput) {
    await KDamageCompensationService.create(createDamage);
    //this.createNev=result
  }

  @action
  async getDamageComppensation(entityDto: EntityDto) {
    let result = await KDamageCompensationService.getDamageComppensation(entityDto);
    this.getCreateDamageInput = result;
  }

  @action
  async getCariListDamageComppensation(entityDto: EntityDto) {
    let result = await KDamageCompensationService.getCariListDamageCompensation(entityDto);
    this.getCariListDamage = result;
  }

  //sube listesi
  @action
  async getSubeListDamageComppensation() {
    let result = await KDamageCompensationService.getSubeListDamageComppensation();
    this.getSubeListDamage = result;
  }

  //sube VE aktarma  listesi
  @action
  async getSubeAktarmaListDamageComppensation() {
    let result = await KDamageCompensationService.getSubeAktarmaListDamageComppensation();
    this.getSubeListDamage = result;
  }

  //bolge listesi
  @action
  async getBolgeListDamageComppensation() {
    let result = await KDamageCompensationService.getBolgeListDamageComppensation();
    this.getBolgeListDamage = result;
  }

  //birim listesi
  @action
  async getBirimListDamageComppensation() {
    let result = await KDamageCompensationService.getBirimListDamageComppensation();
    this.getBirimListDamage = result;
  }

  //son id cekme
  @action
  async GetDamageComppensationLastId() {
    let result = await KDamageCompensationService.getDamageComppensationLastId();
    this.lastIdDamage = result.data.result;

    return result.data;
  }

 //hasar tazmin listesi kullanıcıya gore
  @action
  async StoregetAllDamageCompansation(id: number) {
    let result = await KDamageCompensationService.getAllDamageCompensationService(id);
    this.getAllDamageCompensationStoreClass = result;
    return result;
  }

  //get compensation ById
  @action
  async StoregetDamageComppensationById(entityDto: EntityDto) {
    let result = await KDamageCompensationService.getDamageComppensationByIdService(entityDto);
    this.updateDamageCompensationClass = result;
  }

  /// damage compensaiton update
  async StoreDamageCompensationUpdate(updateDamage: UpdateDamageCompensationClass) {
    await KDamageCompensationService.updateDamage(updateDamage);
  }

  //tazmin listesi cekme  Filtreleme
  @action
  async StoregetFilterDamageCompansation(filterDamageCompensationDto: FilterDamageCompensationDto) {
    let result = await KDamageCompensationService.getFilterDamageCompensationService(
      filterDamageCompensationDto
    );
    this.getAllDamageCompensationStoreClass = result;
    return result;
  }

  /// DEĞERLENDİRME CREATE
  @action
  async createDamageCompensationEvalutaion(
    damageCompensationEvalutaion: DamageCompensationEvalutainon
  ) {
    await KDamageCompensationService.createDamageCompensationEvalutaion(
      damageCompensationEvalutaion
    );
    // this.kdamage.items.push(result);
  }

  //get compensation View ById
  @action
  async StoregetDamageComppensationViewById(entityDto: EntityDto) {
    let result = await KDamageCompensationService.getDamageComppensationViewByIdService(entityDto);
    this.damageCompensationViewClass = result;
  }

  //get compensationEva View ById
  @action
  async StoregetDamageComppensationEvaViewById(entityDto: EntityDto) {
    let result = await KDamageCompensationService.getDamageComppensationEvaViewByIdService(
      entityDto
    );
    this.damageCompensationViewClass = result;
  }

  //file update
  @action
  async StoregetFileUpdateDamageCompansation(entityDto: FileDamage) {
    let result = await KDamageCompensationService.postFileUpdateDamageCompensationService(
      entityDto
    );
    this.updateFile = result.data.result;
    return result.data.result;
  }

  //tazmin nedeni enum cekme
  @action
  async StoregetCompansationWhy(id: string) {
    let result = await KDamageCompensationService.getEnumCompensationWhyService(id);
    this.getEnumCompensationWhy = result;
    return result;
  }

  //tazmin formu onyalandı kapatıldı
  @action
  async StoregetpostCompensationApproval(id: number) {
    let result = await KDamageCompensationService.postCompensationApproval(id);
    return result;
  }

  //tazmin tarhice
  @action
  async StoregetCompansationHistroy(id: number) {
    let result = await KDamageCompensationService.getDamageHistroy(id);
    this.gethistroy = result;
    return result;
  }

  // doya güncelleme sonrası servis
  @action
  async StorePostUpdateFileAfter(id: number) {
    await KDamageCompensationService.postDamageUpdateFileAfter(id);
  }

  //Cari Kaydetme
  @action
  async StoreOpsCurrent(entityDto: GetCurrent) {
    await KDamageCompensationService.postCurrentCreate(entityDto);
  }

  // city listeisi
  @action
  async StoreGetCityAll() {
    let result = await KDamageCompensationService.getAllCity();
    this.getAllCity = result;
    return result;
  }

  // ilce ile göre listeisi
  @action
  async StoreGetDistrictById(id: number) {
    let result = await KDamageCompensationService.GetByIdDistrict(id);
    this.getDistrictByIdList = result;
    return result;
  }

  // ülke listesi
  @action
  async StoreGetCountryAll() {
    let result = await KDamageCompensationService.GetCountry();
    this.getCountry = result;
    return result;
  }

  // adres bulma
  @action
  async StoreGetByFindAddress(districtId: number, districtName: string, myp_adi: string) {
    let result = await KDamageCompensationService.GetByFindAddress(
      districtId,
      districtName,
      myp_adi
    );
    this.getStreet = result;
    return result;
  }

  ///UPDATE NEXT STATU
  @action
  async StoreUpdateDamageStatus(updateNextStatu: UpdateNextStatu) {
    let result = await KDamageCompensationService.PostUpdateDamageStatus(updateNextStatu);
    this.resultUpdateNextStatu = result;
    return result;
  }

  // CARI LISTESI ARAMA SERVISI
  @action
  async StoreGetKcariFind(kcarifind: string, tip: number) {
    let result = await KDamageCompensationService.ServiceGetKcariFind(kcarifind, tip);
    this.getKcariFind = result;
    return result;
  }

  // WEB siparis getir
  @action
  async StoreGetWebSiparis(sipariskodu: string) {
    let result = await KDamageCompensationService.ServiceGetWebSiparisKodu(sipariskodu);
    this.getWebSiparisKod = result;
    return result;
  }

  /// REVIZE
  @action
  async StorePostRevize(tazminid: string) {
    await KDamageCompensationService.ServicePostRevize(tazminid);
  }

  /// web siparis kontrol
  @action
  async StoreGetWebSiparisKontrol(websipariskodu: string) {
    let result = await KDamageCompensationService.ServiceGetWebSiparisKontrol(websipariskodu);
    this.websipariskontrol = result;
    return result;
  }

  // kesinti modal kaydet
  @action
  async StorePostKesintiModalCreate(iterruptionModalCreate: InterruptionModalCreate) {
    await KDamageCompensationService.ServicePostKesintiModalCreate(iterruptionModalCreate);
  }

  //kesinti listesi
  @action
  async StoreGetKesintiListesi(tazminId: number) {
    let result = await KDamageCompensationService.ServicePostKesintiList(tazminId);
    this.interruptionList = result;

    return result;
  }

  //kesinti silme ServiceKesintiDelete

  @action
  async delete(entityDto: EntityDto) {
    await KDamageCompensationService.delete(entityDto);

    this.interruptionList.items = this.interruptionList.items.filter(
      (x: InterruptionModalCreate) => x.id !== entityDto.id
    );
  }


 //get compensationEva View ById
 @action
 async StoreGetEvaById(entityDto: EntityDto) {
   let result = await KDamageCompensationService.getEvaViewByIdService(
     entityDto
   );
   this.eva = result;
 
 }
  


}

export default KDamageCompensationStore;

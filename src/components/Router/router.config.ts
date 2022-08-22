/* eslint-disable */
import LoadableComponent from './../Loadable/index';
// FileDoneOutlined, BarChartOutlined 
import { HomeOutlined, UserOutlined, TagsOutlined,  PartitionOutlined, TableOutlined, UsergroupAddOutlined,AimOutlined, UnorderedListOutlined, FileDoneOutlined, BarChartOutlined,} from '@ant-design/icons';

export const userRouter: any = [
  { path: '/user', name: 'User', title: 'User', component: LoadableComponent(() => import('../../components/Layout/UserLayout')), isLayout: true, showInMenu: false, },
  { path: '/user/login', name: 'LogIn', title: 'LogIn', component: LoadableComponent(() => import('../../scenes/Login')), showInMenu: false, },
];

export const appRouters: any = [
  { path: '/', exact: true,                key:'menu-item-1',  permission: '',                                  title: 'Home',                         type:'',         name: 'Home',                                                           showInMenu: false, component: LoadableComponent(() => import('../../components/Layout/AppLayout')), isLayout: true,  },

  { path: '/home',   key:'menu-item-2',  permission: '',    title: 'Home',   type:'',   name: 'Home',   icon: UserOutlined , showInMenu: true,  component: LoadableComponent(() => import('../../scenes/Home')), },
  { path: '/dashboard',  key:'menu-item-3',  permission: 'items.dashboard.menu.view',         title: 'Dashboard',                    type:'',         name: 'Dashboard',                    icon: HomeOutlined,               showInMenu: true,  component: LoadableComponent(() => import('../../scenes/Dashboard')), },
  { path: '/khierarchy',                   key:'menu-item-4',  permission: 'items.hierarchy.menu.view',         title: 'Hierarchy',                    type:'hr',       name: 'Hierarchy',                    icon: PartitionOutlined,          showInMenu: false, component: LoadableComponent(() => import('../../scenes/Hierarchy')), },
  

  { path: '/hierarchytransfer',            key:'menu-item-5',  permission: 'items.hierarchy.menu.view',         title: 'HierarchyTransfer',            type:'hr',       name: 'HierarchyTransfer',            icon: PartitionOutlined,          showInMenu: true,  component: LoadableComponent(() => import('../../scenes/HierarchyTransfer')), },


  { path: '/ksube/:id',                    key:'menu-item-6',  permission: 'subitems.kareas.table.areas.btn',   title: 'KSube',                        type:'hr',       name: 'KSube',                        icon: TableOutlined,              showInMenu: false, component: LoadableComponent(() => import('../../scenes/KSube')), },
  { path: '/ksube/:id',                    key:'menu-item-7',  permission: 'kbolge.branches',                   title: 'KSube',                        type:'hr',       name: 'KSube',                        icon: TableOutlined,              showInMenu: false, component: LoadableComponent(() => import('../../scenes/KSube')), },
  { path: '/ksubedetay',                   key:'menu-item-8',  permission: 'items.branch.menu.view',            title: 'KSube',                        type:'hr',       name: 'KSube',                        icon: TableOutlined,              showInMenu: true,  component: LoadableComponent(() => import('../../scenes/KSubeDetay')), },
  { path: '/ksubedetay/:id',               key:'menu-item-9',  permission: 'items.branch.menu.view',            title: 'KSubeDetay',                   type:'hr',       name: 'KSubeDetay',                   icon: TableOutlined,              showInMenu: false, component: LoadableComponent(() => import('../../scenes/KSubeDetay')), },
  { path: '/ksubedetay/:id',               key:'menu-item-10', permission: 'items.branch.menu.view',            title: 'KSube',                        type:'hr',       name: 'KSube',                        icon: TableOutlined,              showInMenu: false, component: LoadableComponent(() => import('../../scenes/KSubeDetay')), },
  { path: '/bolgemudurluk',                key:'menu-item-11', permission: 'items.kareas.menu.view',            title: 'KBolge',                       type:'hr',       name: 'KBolge',                       icon: TableOutlined,              showInMenu: true,  component: LoadableComponent(() => import('../../scenes/KBolge')), },
  
  { path: '/probationperiod',              key:'menu-item-12', permission: '',                                  title: 'ProbationPeriod',              type:'hr',       name: 'ProbationPeriod',              icon: UsergroupAddOutlined,       showInMenu: false,  component: LoadableComponent(() => import('../../scenes/ProbationPeriod')), },
  { path: '/requestforpromotion',          key:'menu-item-13', permission: 'items.requestforpromotion.create.menu.view',                                  title: 'RequestForPromotion',          type:'hr',       name: 'RequestForPromotion',          icon: UsergroupAddOutlined,       showInMenu: true,  component: LoadableComponent(() => import('../../scenes/RequestForPromotion')), },
  { path: '/promotionconfirmotion/:id',      key:'menu-item-14', permission: 'items.requestforpromotion.create.menu.view',                                  title: 'RequestForPromotion',          type:'hr',       name: 'PromotionConfirmotion',          icon: UsergroupAddOutlined,       showInMenu: false, component: LoadableComponent(() => import('../../scenes/PromotionConfirmation')), },
  { path: '/requestforpromotionfilter',    key:'menu-item-15', permission: 'items.requestforpromotion.search.menu.view',                                  title: 'FilterForPromotion',           type:'hr',       name: 'FilterForPromotion',           icon: FileDoneOutlined,           showInMenu: true,  component: LoadableComponent(() => import('../../scenes/RequestForPromotionFilter')), },
  { path: '/requestforpromotionreport',    key:'menu-item-16', permission: 'items.requestforpromotion.report.menu.view',                                  title: 'ReportForPromotion',           type:'hr',       name: 'ReportForPromotion',           icon: BarChartOutlined ,          showInMenu: true,  component: LoadableComponent(() => import('../../scenes/RequestForPromotionReport')), },


  { path: '/users',                        key:'menu-item-13', permission: 'items.user.menu.view',              title: 'Users',                        type:'settings', name: 'Users',                        icon: UsergroupAddOutlined,       showInMenu: true,  component: LoadableComponent(() => import('../../scenes/Users')), },
  { path: '/roles',                        key:'menu-item-14', permission: 'items.role.menu.view',              title: 'Roles',                        type:'settings', name: 'Roles',                        icon: TagsOutlined,               showInMenu: true,  component: LoadableComponent(() => import('../../scenes/Roles')), }, 
  { path: '/logout',                       key:'menu-item-15', permission: '',                                  title: 'Logout',                       type:'',         name: 'Logout',                                                         showInMenu: false, component: LoadableComponent(() => import('../../components/Logout')), },
  { path: '/exception?:type',              key:'menu-item-16', permission: '',                                  title: 'Exception',                    type:'',         name: 'Exception',                                                      showInMenu: false, component: LoadableComponent(() => import('../../scenes/Exception')), },
  { path: '/knormrequestdetail/:id',       key:'menu-item-17', permission: 'kNormRequestDetail',                title: 'KNormRequestDetail',           type:'hr',       name: 'KNormRequestDetail',           icon: UserOutlined,               showInMenu: false, component: LoadableComponent(() => import('../../scenes/KNormRequestDetail')), },

  { path: '/hasartazmin',                  key:'menu-item-18', permission: '',                                  title: 'DamageCompensationForm',       type:'op',       name: 'HasarTazmin',                  icon: AimOutlined,                showInMenu: false,  component: LoadableComponent(() => import('../../scenes/Ops/HasarTazmin')), }, 

  { path: '/hasartazminsorgulama',         key:'menu-item-23', permission: '',                                  title: 'DamageCompensationList',       type:'op',       name: 'HasarTazmin Listesi',          icon: UnorderedListOutlined ,     showInMenu: true,  component: LoadableComponent(() => import('../../scenes/Ops/HasarTazminList')), }, 

  { path: '/damageconmpensationview/:id',  key:'menu-item-20', permission: '',                                  title: 'DamageCompensationView',       type:'op',       name: 'DamageCompensationView',       icon: AimOutlined,                showInMenu: false, component: LoadableComponent(() => import('../../scenes/Ops/HasarTazmin/view')), }, 

  { path: '/damageevalutaion/:id',         key:'menu-item-20', permission: '',                                  title: 'DamageCompensationEvaluation', type:'op',       name: 'DamageCompensationEvaUpdate',  icon: AimOutlined,                showInMenu: false, component: LoadableComponent(() => import('../../scenes/Ops/HasarTazmin/updateEva')), },


  { path: '/damageupdate/:id',         key:'menu-item-21', permission: '',                                  title: 'DamageCompensationUpdate', type:'op',       name: 'DamageCompensationEvaUpdate',  icon: AimOutlined,                showInMenu: false, component: LoadableComponent(() => import('../../scenes/Ops/HasarTazmin/update')), },


  { path: '/opshierarchytransfer',         key:'menu-item-22',   permission: '',        title: 'Operasyon Hiyearsi', type:'op',       name: 'OperasyonHiyearsi',  icon: PartitionOutlined,                showInMenu: false, component: LoadableComponent(() => import('../../scenes/Ops/OpsHierarchyTransfer/index')), },




  { path: '/newindex',                  key:'menu-item-19', permission: '',                                  title: 'DamageCompensationForm',       type:'op',       name: 'HasarTazmin',                  icon: AimOutlined,                showInMenu: true,   component: LoadableComponent(() => import('../../scenes/Ops/DamageCompensation')), }, 



  { path: '/newindex/:stt/:id',                  key:'menu-item-23', permission: '',                                  title: 'DamageCompensationForm',       type:'op',       name: 'HasarTazmin',                  icon: AimOutlined,                showInMenu: false,   component: LoadableComponent(() => import('../../scenes/Ops/DamageCompensation')), }, 

];

export const routers = [...userRouter, ...appRouters];

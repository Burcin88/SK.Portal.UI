import React from 'react';
import { Button } from 'antd';
import { Table, Tooltip } from 'antd';
import { isGranted, L } from '../../../lib/abpUtility';
import { EntityDto } from '../../../services/dto/entityDto';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


export interface Props {
    kSubeNormEdit: (input: EntityDto<string>) => void;
    kSubeNormDelete: (input: EntityDto<string>) => void;
    normList: []
}
export interface State {
    totalSizeTable: number,
    filterTable: { offset: number, limit: number, current: number }
  }

class KBolgeNormTable extends React.Component<Props> {
    state = {totalSizeTable: 0, filterTable: { offset: 0, limit: 5, current: 0, }};

    handlePaginationTable = pagination => {
   
        const { filterTable } = this.state;
        const { pageSize, current } = pagination;
        this.setState({
          filterTable: { ...filterTable, current, limit: pageSize }
        });
      };
    

    render() {
        const { kSubeNormDelete, kSubeNormEdit } = this.props;
        const {filterTable, totalSizeTable} = this.state;
        const tablePaginationTable = {
            pageSize: filterTable.limit,
            current: filterTable.current || 1,
            total: totalSizeTable,
            locale: { items_per_page: L('page') },
            pageSizeOptions: ["5", "10", "20", "30", "50", "100"],
            showSizeChanger: true,
        };

        const columns = [
            { title: L('Position'), dataIndex: 'position', key: 'position', width: 150, render: (text: string) => <div>{text}</div> },
            { title: L('NormCount'), dataIndex: 'normCount', key: 'normCount', width: 50, render: (text: string) => <div>{text}</div> },
            { title: L('EmployeeCount'), dataIndex: 'employeeCount', key: 'employeeCount', width: 50, render: (text: string) => <div>{text}</div> },
            {
                title: L('CreationTime'), dataIndex: 'creationTime', key: 'creationTime', width: 100, render: (text: Date) => <div>{
                    <div>{
                        new Date(text).toLocaleDateString("tr-TR", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }
                    </div>
                }</div>
            },
            // {
            //     title: L('ModifiedTime'), dataIndex: 'lastModificationTime', key: 'lastModificationTime', width: 100, render: (text: Date) => <div>  {
            //         <div>
            //             {
            //                 text !== undefined && new Date(text).toLocaleDateString("tr-TR", {
            //                     year: "numeric",
            //                     month: "long",
            //                     day: "2-digit",
            //                     hour: "2-digit",
            //                     minute: "2-digit"
            //                 })
            //             }
            //         </div>
            //     }</div>
            // },
            {
                title: L('Actions'),
                width: 30,
                render: (text: string, item: any) => (
                    <div>
                        {isGranted('items.knorm.kbolgenorm.edit') && <>   <Tooltip placement="topRight" title={L('Edit')}>
                            <Button
                                style={{
                                    backgroundColor: '#faad14',
                                    borderColor: '#faad14', color: 'white'
                                }}
                                onClick={() => kSubeNormEdit({ id: item.id })}
                                icon={<EditOutlined />} >
                            </Button>
                        </Tooltip></>}
                        {isGranted('items.knorm.kbolgenorm.delete') && <><Tooltip placement="topLeft" title={L('Delete')}>
                            <Button style={{ marginLeft: 3 }} type="primary" onClick={() => kSubeNormDelete({ id: item.id })} danger icon={<DeleteOutlined />} ></Button>
                        </Tooltip> </>}
                    </div>
                ),
            },
        ];

        return (
            <>
                {
                   
                    <Table
                        locale={{ emptyText: L('NoData') }}
                        rowKey={(record) => record.id.toString()}
                        bordered={false}
                        columns={columns}
                        loading={this.props.normList === undefined ? true : false}
                        dataSource={this.props.normList === undefined ? [] : this.props.normList}
                        onChange={this.handlePaginationTable}
                        pagination={tablePaginationTable}
                    />
                } 
            </>
        )
    }
}


export default KBolgeNormTable;
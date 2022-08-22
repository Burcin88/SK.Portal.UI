
/* eslint-disable @typescript-eslint/no-unused-expressions*/
import React, { useState } from 'react';
import { L } from '../../lib/abpUtility';
import { DataNode } from 'antd/lib/tree';
import { Drawer, Button, Col, Row, Tree } from 'antd';
import { GetAllPermissionsOutput } from '../../services/role/dto/getAllPermissionsOutput';

const RoleDetailDrawer = ({ visible, showOrHideDrawer, permissions, roleStore }) => {
    const getChildItems = (prefix: string, suffix: string, key: string) => {
        let children = permissions.filter(y => y.name
            .startsWith(prefix + '.' + suffix))
            .map((c: GetAllPermissionsOutput, i: number) => {
                let names = c.name.split('.');
                let name = names[names.length - 1];
                let _key = `${key}-${i}`;
                return {
                    title: L(c.displayName.replace('[', '').replace(']', '')),
                    key: _key,
                    value: c.name,
                    children: getChildItems('subitems' + '.' + suffix, name, _key)
                }
            });
        return children;
    }

    const [grantedPermissions, setGrantedPermissions] = useState([''])

    const options = [...new Set(permissions.filter(x => x.name.startsWith('pages')).map((x: GetAllPermissionsOutput, y: number) => {
        let name = x.name.split('.')[1];
        let key = `0-${y}`;
        return {
            title: L(x.displayName),
            key: key,
            value: x.displayName,
            children: getChildItems('items', name, key)
        };
    }))] as DataNode[];



    const getSelectedItems = () => {
        let permissions = [] as DataNode[];
        let childItems = options.map(x => x.children);

        if (childItems.length > 0) {

            let selectedChildItems = childItems.map((x: any) => x.map(f => ({
                key: f.key,
                title: f.title,
                value: f.value,
                children: f.children
            })))

            let permission = roleStore.roleEdit.grantedPermissionNames;

            for (let item of selectedChildItems) {
                for (let property of item) {

                    if (permission.includes(property.value)) {
                        permissions.push(property)
                    }

                    for (let subProperty of property.children) {
                        if (permission.includes(subProperty.value)) {
                            permissions.push(subProperty)
                        }
                    }
                }
            }
        }
        return permissions;
    }


    const getItems = () => {
        let permissions = [] as DataNode[];

        let childItems = options.map(x => x.children);
        if (childItems.length > 0) {
            let selectedChildItems = childItems.map((x: any) => x.map(f => ({ key: f.key, title: f.title, value: f.value, children: f.children })))
            let currentItems = selectedChildItems.filter(x => x.length > 0).map(x => x)
            for (let item of currentItems) {
                for (let property of item) {
                    for (let subItem of property.children) {
                        permissions.push(subItem)
                    }
                    permissions.push(property)
                }
            }
        }
        return permissions;
    }

    const onCheck = (selected) => {
        let permissions = [] as string[];
        permissions = getItems().filter(x => selected.includes(x.key)).map((x: any) => x.value);
        setGrantedPermissions(permissions)
    }

    const handleSubmit = () => {
        let role = roleStore.roleEdit.role
        role.grantedPermissions = grantedPermissions;
        roleStore.update(role)
        setTimeout(() => { showOrHideDrawer() }, 500)
    }

    const onSelect = (x) => { }

    const content = () => {
        return <Tree
            checkable
            defaultExpandedKeys={getSelectedItems().map(x => x.key)}
            defaultSelectedKeys={getSelectedItems().map(x => x.key)}



            defaultCheckedKeys={getSelectedItems().map(x => x.key)}
            onCheck={(x) => onCheck(x)}
            onSelect={onSelect}
            treeData={options} />
    }

    return (<>
        <Drawer width={1000}
            footer={
                <Row align="middle">
                    <Col span={4}>
                        <Button form='roleForm' key="submit" htmlType="submit" type="primary" onClick={handleSubmit}> {L('Save')} </Button>
                    </Col>
                </Row>
            }
            title={L('UserRoleDetail')}
            visible={visible}
            onClose={showOrHideDrawer}
            destroyOnClose={true}>
            {content()}
        </Drawer>

    </>);
}

export default RoleDetailDrawer;

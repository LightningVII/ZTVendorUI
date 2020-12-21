import { DownloadOutlined } from '@ant-design/icons';
// import { Button, Divider, message, Input, Drawer } from 'antd';
import { List, Drawer } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
// import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
// import CreateForm from './components/CreateForm';
// import UpdateForm, { FormValueType } from './components/UpdateForm';
import { FormInstance } from 'antd/lib/form';
import { TableListItem, Abc, AbcEnumObj } from './data.d';
import { getVendorCategories, getCompanies } from './service';
// , updateRule, addRule, removeRule

let vendorCategories: Abc[];
const types: AbcEnumObj = {};
/**
 * 添加节点
 * @param fields
 */
/* const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
}; */

/**
 * 更新节点
 * @param fields
 */
/* const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
}; */

/**
 *  删除节点
 * @param selectedRows
 */
/* const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
}; */

const TableList: React.FC<{}> = () => {
  // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [row, setRow] = useState<TableListItem>();
  // const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [categoriesEnum, setCategoriesEnum] = useState<AbcEnumObj>({
    all: { text: '全部', status: 'all' },
  });
  const [typesEnum, setTypesEnum] = useState<AbcEnumObj>();

  /* '供应商大类', // vendor_categories
  '产品类别', // vendor_types
  '经营主要产品', // main_products
  '单位名称', // name
  '企业性质', // nature
  '品牌', // brand
  '联系人', // contact
  '电话', // phone
  '固话', // telephone
  '邮箱', // mailbox
  '注册资金', // capital
  '企业生产地及规模', // address
  '是否考察', // is_inspected
  '合作模式', // cooperation_model
  '付款方式', // payment
  '生产或供货能力', // productivity
  '可否入公司库', // can_in_storage
  '企业主要特点', // features
  '评定级别ABC', // level
  '备注', // remarks */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '单位名称',
      dataIndex: 'name',
      search: false,
      fixed: 'left',
      render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
    },
    {
      title: '经营主要产品',
      dataIndex: 'main_products',
      search: false,
      width: 220,
    },
    {
      title: '企业性质',
      dataIndex: 'nature',
      search: false,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      search: false,
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      search: false,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      search: false,
    },
    {
      title: '固话',
      dataIndex: 'telephone',
      search: false,
    },
    {
      title: '邮箱',
      dataIndex: 'mailbox',
      search: false,
    },
    {
      title: '注册资金',
      dataIndex: 'capital',
      search: false,
    },
    {
      title: '企业生产地及规模',
      dataIndex: 'address',
      search: false,
    },
    {
      title: '是否考察',
      dataIndex: 'is_inspected',
      renderText: (item) => (item ? '是' : '否'),
      search: false,
    },
    {
      title: '付款方式',
      dataIndex: 'payment',
      search: false,
    },
    {
      title: '生产或供货能力',
      dataIndex: 'productivity',
      search: false,
    },
    {
      title: '可否入公司库',
      dataIndex: 'can_in_storage',
      renderText: (item) => (item ? '是' : '否'),
      search: false,
    },
    {
      title: '企业主要特点',
      dataIndex: 'features',
      search: false,
    },
    {
      title: '合作模式',
      dataIndex: 'cooperation_model',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '评定级别ABC',
      dataIndex: 'level',
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      search: false,
    },
    {
      title: '供应类别',
      dataIndex: 'vendor_categories.value',
      initialValue: 'all',
      hideInTable: true,
      valueEnum: categoriesEnum,
    },
    {
      title: '细分类型',
      dataIndex: 'vendor_types.value',
      hideInTable: true,
      fieldProps: () => ({
        mode: 'multiple',
        showArrow: true,
        maxTagCount: 2,
        filterOption: (inputValue: string, option: { label: string }) =>
          option.label.includes(inputValue),
      }),
      valueEnum: typesEnum,
    },
    /* {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <>
          <HeartOutlined
            onClick={() => {
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
              console.log('record :>> ', record);
            }}
          />
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    }, */
  ];

  useEffect(() => {
    getVendorCategories().then((data) => {
      vendorCategories = data;
      const categories = JSON.parse(JSON.stringify(categoriesEnum));

      data.forEach(({ value, name, vendor_types }: Abc) => {
        categories[value] = { text: name, status: value };
        vendor_types?.forEach(({ value: v, name: n }: Abc) => {
          types[v] = { text: n, status: v };
        });
      });

      categories.other = { text: '其他', status: 'other' };
      types.other = { text: '其他', status: 'other' };

      setTimeout(() => {
        setCategoriesEnum(categories);
        setTypesEnum(types);
      }, 1000);
    });
  }, []);

  return (
    <PageContainer pageHeaderRender={() => null}>
      <ProTable<TableListItem>
        headerTitle="供应商库"
        actionRef={actionRef}
        formRef={formRef}
        scroll={{ x: '200vw' }}
        expandable={{
          rowExpandable: (data: any) =>
            data?.basicInformationFile?.length + data?.evaluationInformationFile.length,
          expandedRowRender: (data: any) => (
            <>
              <List
                size="small"
                header={<div>基础信息附件</div>}
                dataSource={data?.basicInformationFile}
                renderItem={(item: any) => (
                  <List.Item>
                    <a href={`http://localhost:1337${item.url}`} rel="noreferrer" target="_blank">
                      {item.name}
                      <DownloadOutlined />
                    </a>
                  </List.Item>
                )}
              />
              <List
                size="small"
                header={<div>评价信息附件</div>}
                dataSource={data?.evaluationInformationFile}
                renderItem={(item: any) => (
                  <List.Item>
                    <a href={`http://localhost:1337${item.url}`} rel="noreferrer" target="_blank">
                      {item.name}
                      <DownloadOutlined />
                    </a>
                  </List.Item>
                )}
              />
            </>
          ),
        }}
        rowKey="id"
        search={{ labelWidth: 80, span: 8 }}
        // params={{ categoriesEnum }}
        // pagination={{ defaultPageSize: 2 }}
        /* toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]} */
        options={false}
        form={{
          onValuesChange: (values) => {
            // setTypesEnum({ other: { text: '其他', status: 'other' } });
            console.log('onValuesChange :>> ', values);

            if (values?.['vendor_categories.value'] === 'all') {
              setTypesEnum(types);
            }

            if (values?.['vendor_categories.value'] === 'other') {
              setTypesEnum({});
            }

            const subType = vendorCategories?.find(
              ({ value }: Abc) => value === values?.['vendor_categories.value'],
            );
            if (subType) {
              setTypesEnum(
                subType.vendor_types?.reduce((res: AbcEnumObj, { name, value }: Abc) => {
                  res[value] = { text: name, status: value };
                  return res;
                }, {}),
              );
            }

            if (values?.['vendor_categories.value'])
              console.log(
                'formRef.current :>> ',
                formRef?.current?.resetFields(['vendor_types.value']),
              );
          },
          onFieldsChange: (e) => {
            console.log('onFieldsChange :>> ', e);
          },
          /* onFinish: () => {
            console.log('onFieldsChange :>> ', 1);
          }, */
        }}
        request={(params) => getCompanies(params)}
        columns={columns}
        rowSelection={
          {
            // onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          }
        }
      />
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )} */}
      {/* <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null} */}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;

import React, { useState } from 'react';
import {
    Form,
    Input,
    Cascader,
    Select,
    Button,
    AutoComplete,
    Card,
    notification,
} from 'antd';
import createRegister from '../../api/createRegister';

const { Option } = Select;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export const NewRegister = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        setLoading(true)
        createRegister(values).then((res) => {
            notification.success({
                message: 'Registro Creado'
            })
        }).catch(() => {
            setLoading(false)
            notification.error({
                message: 'Error'
            })
        }).finally(() => setLoading(false))
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );


    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }));

    return (
        <Card>
            <Form
                layout='vertical'
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Nickname"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Apellido"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                {/* <Form.Item
                    name="residence"
                    label="Habitual Residence"
                    rules={[
                        { type: 'array', required: true, message: 'Please select your habitual residence!' },
                    ]}
                >
                    <Cascader options={residences} />
                </Form.Item> */}

                {/* <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item> */}

                {/* <Form.Item
                    name="website"
                    label="Website"
                    rules={[{ required: true, message: 'Please input website!' }]}
                >
                    <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                        <Input />
                    </AutoComplete>
                </Form.Item> */}

                <Form.Item
                    name="description"
                    label="Descripcion"
                    rules={[{ required: true, message: 'Please input Intro' }]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>

                {/* <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item> */}

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
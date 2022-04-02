import React, { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { updateRegister } from '../../api/updateRegister';
import { getRegisterById } from '../../api/getRegisterById';

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

export const UpdateRegisterForm = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getRegisterById(params.id)
            .then(({ data }) => form.setFieldsValue(data))
            .catch(console.log)
            .finally()
    }, [params.id])


    const onFinish = (values: any) => {
        setLoading(true)
        updateRegister(params.id, values).then((res) => {
            notification.success({
                message: 'Registro Actualizado'
            })
            navigate('/')
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
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
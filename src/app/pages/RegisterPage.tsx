import useTitle from '@shared/hooks/use-title.ts';
import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  Notification,
} from '@arco-design/web-react';
import { useLoginService } from '@shared/services/use-login.service.ts';
import { UserRegisterRequestDto } from '@core/models/User.ts';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
  useTitle('Register');
  const [form] = Form.useForm();
  const FormItem = Form.Item;
  const { mutate, error, isError } = useLoginService();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  function saveForm() {
    mutate(form.getFieldsValue() as UserRegisterRequestDto);
  }

  function onOk() {
    form.validate().then(() => {
      setConfirmLoading(true);
      setTimeout(() => {
        Message.success('Success !');
        setVisible(false);
        setConfirmLoading(false);
      }, 1500);
    });
  }

  useEffect(() => {
    if (isError) {
      Notification.error({
        title: 'La cuenta ya existe!',
        content:
          'Por favor, verifique sus credenciales e intente de nuevo.' +
          error.message,
      });
    }
  }, [isError, error]);

  return (
    <Modal
      title="Add User"
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}>
      <Form
        form={form}
        style={{ width: 600 }}
        autoComplete="on"
        onSubmit={() => saveForm()}>
        <FormItem
          label="Nombres"
          field="names"
          rules={[
            { required: true, type: 'text', message: 'Names is required' },
          ]}>
          <Input placeholder="please enter your names" />
        </FormItem>
        <FormItem
          label="Username"
          field="username"
          rules={[{ required: true, message: 'Username is required' }]}>
          <Input placeholder="please enter your username" />
        </FormItem>
        <FormItem
          label="Password"
          field="password"
          rules={[
            {
              required: true,
              maxLength: 32,
              minLength: 6,
              message: 'This password value between 6 and 32 characters',
            },
          ]}>
          <Input type={'password'} placeholder="please enter your password" />
        </FormItem>
        <Button type="secondary">Register</Button>
      </Form>
    </Modal>
  );
}

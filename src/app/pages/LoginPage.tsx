import { useAuthStore } from '@shared/stores/auth-store.ts';
import {
  Button,
  Form,
  Input,
  Notification,
  Space,
} from '@arco-design/web-react';
import { useLoginService } from '@shared/services/use-login.service.ts';
import { UserLoginRequestDto } from '@core/models/user.ts';
import { useEffect } from 'react';
import useTitle from '@shared/hooks/use-title.ts';

export default function LoginPage() {
  useTitle('Login');
  const isLoggedIn = useAuthStore(({ isLoggedIn }) => isLoggedIn);
  const [form] = Form.useForm();
  const FormItem = Form.Item;
  const { mutate, error, isError } = useLoginService();

  if (isLoggedIn) {
    console.log('User is already logged in');
  }

  function saveForm() {
    mutate(form.getFieldsValue() as UserLoginRequestDto);
  }

  useEffect(() => {
    if (isError) {
      console.log('Error:', error);
      Notification.error({
        title: 'La cuenta no existe!',
        content:
          'Por favor, verifique sus credenciales e intente de nuevo.' +
          error.message,
      });
    }
  }, [isError, error]);

  return (
    <Form
      form={form}
      style={{ width: 600 }}
      autoComplete="on"
      onSubmit={() => saveForm()}>
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

      <Space size="small">
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Button type="secondary" href={'/register'} target={'_parent'}> Register </Button>
      </Space>
    </Form>
  );
}

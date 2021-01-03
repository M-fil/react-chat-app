import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { loginThunk, registerThunk } from '../../../../core/thunks/auth';
import AuthFormContainer from './styled';

interface FormValues {
  email: string,
  password: string,
}

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isRegistrationForm, setIsRegistrationForm] = useState<boolean>(true);

  const onSubmitForm = useCallback((values: FormValues) => {
    const { email, password } = values;

    if (isRegistrationForm) {
      dispatch(registerThunk(email, password));
    } else {
      dispatch(loginThunk(email, password));
    }
  }, [isRegistrationForm, dispatch]);

  const onFormTypeChange = useCallback(() => {
    setIsRegistrationForm((prevIsRegistrationForm) => !prevIsRegistrationForm);
  }, []);

  return (
    <AuthFormContainer>
      <h2>
        {isRegistrationForm ? 'Register' : 'Login'}
      </h2>
      <Form onFinish={onSubmitForm}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isRegistrationForm ? 'Register' : 'Login'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="link"
            htmlType="button"
            onClick={onFormTypeChange}
          >
            {isRegistrationForm
              ? 'Login if you have already created an account'
              : 'Register if you have no account yet.'}
          </Button>
        </Form.Item>
      </Form>
    </AuthFormContainer>
  )
};

export default AuthForm;

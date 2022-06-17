import React from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import ActionText from 'components/ActionText';
import Button from 'components/Button';
import Input from 'components/Input';
import getValidation from './validation';

const LoginView = ({ onGoToSignup, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ email: '', password: '' }}
      validationSchema={getValidation(t)}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Box
        component={Form}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 10,
        }}
      >
        <Typography variant="h1">{t('login')}</Typography>
        <Input name="email" label={t('email')} />
        <Input name="password" type="password" label={t('password')} />
        <Button type="submit">{t('login')}</Button>
        <ActionText
          onClick={onGoToSignup}
          sx={{ marginBottom: -20, alignSelf: 'flex-end' }}
        >
          {t('dontHaveAccount')}
        </ActionText>
      </Box>
    </Formik>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onGoToSignup: PropTypes.func.isRequired,
};

export default LoginView;

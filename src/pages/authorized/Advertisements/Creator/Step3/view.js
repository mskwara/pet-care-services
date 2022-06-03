import React from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/Button';
import Icon from 'components/Icon';
import IconCheck from 'components/IconCheck';
import Input from 'components/Input';
import Select from 'components/Select';
import { optionsShape } from 'components/Select/shapes';
import { initialAvailabilityData } from './consts';
import styles from './styles';
import getValidation from './validation';

const Step3 = ({
  onSubmit,
  activitiesOptions,
  priceTypeOptions,
  periodOptions,
  initialValues,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={styles.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={getValidation(t)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Box component={Form} sx={styles.form}>
            <Typography variant="h2">{t('information')}</Typography>
            <Select
              label={t('activity')}
              name="activity"
              options={activitiesOptions}
              sx={styles.field}
            />
            {/* TODO activity tags as list */}
            <Box sx={styles.multiFieldLine}>
              <Input
                label={t('price')}
                name="price.amount"
                endAdornment={
                  <Typography variant="h3" sx={styles.inputAdornment}>
                    {t('currency.pln')}
                  </Typography>
                }
                sx={styles.field}
                onlyNumbers
              />
              <Select
                label={t('type')}
                name="price.type"
                options={priceTypeOptions}
                sx={styles.narrowField}
              />
            </Box>
            <Input label={t('location')} name="location" sx={styles.field} />

            <Typography variant="h2">{t('availability')}</Typography>
            <FieldArray
              name="availabilities"
              render={(arrayHelpers) => (
                <>
                  {map(values.availabilities, (_, index) => (
                    <Box sx={styles.multiFieldLine} key={index}>
                      <Input
                        label={t('date')}
                        name={`availabilities.${index}.date`}
                        sx={styles.field}
                      />
                      <IconCheck
                        name={`availabilities.${index}.cyclic`}
                        Component={RepeatIcon}
                        sx={styles.selfCentered}
                      />
                      <Select
                        label={t('repeat')}
                        name={`availabilities.${index}.period`}
                        options={periodOptions}
                        sx={styles.narrowField}
                      />
                      <Icon
                        onClick={() => arrayHelpers.remove(index)}
                        Component={DeleteIcon}
                        sx={{ ...styles.deleteIcon, ...styles.selfCentered }}
                      />
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      arrayHelpers.insert(
                        values.availabilities.length,
                        initialAvailabilityData
                      )
                    }
                    small
                  >
                    {t('add')}
                  </Button>
                </>
              )}
            />

            <Button type="submit" sx={styles.submitButton}>
              {t('publish')}
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

Step3.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  activitiesOptions: optionsShape,
  priceTypeOptions: optionsShape,
  periodOptions: optionsShape,
  initialValues: PropTypes.exact({
    activity: PropTypes.string,
    price: PropTypes.exact({
      amount: PropTypes.string,
      type: PropTypes.string,
    }),
    location: PropTypes.string,
    availabilities: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
        cyclic: PropTypes.bool,
        period: PropTypes.string,
      })
    ),
  }),
};

export default Step3;

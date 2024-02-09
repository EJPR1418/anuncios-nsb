import * as yup from 'yup';

const EventsSchema = () => {
  return yup.object().shape({
    title: yup
      .string()
      .min(2, 'Muy Corto!')
      .max(30, 'Muy Largo!')
      .required('Requerido'),
    description: yup
      .string()
      .min(5, 'Muy Corto!')
      .max(250, 'Muy Largo!')
      .required('Requerido'),
    type: yup.string().required('Requerido'),
    clothing: yup.string().required('Requerido'),
    organizers: yup
      .array()
      .min(1, 'Seleccione al menos un organizador')
      .required('Requerido'),
    cost: yup
      .number()
      .required('Requerido')
      .positive('No numeros negativos')
      .min(0.0),
    startDate: yup.string().required('Requerido'),
    startTime: yup.string().required('Requerido'),
    endDate: yup.string().required('Requerido'),
    endTime: yup.string().required('Requerido'),
    locationAddress: yup.string().required('Requerido'),
    selectedLoaction: yup.object(),
    fileName: yup.string(),
    createdBy: yup.string(),
    createdDate: yup.string(),
    editedBy: yup.string(),
    editedDate: yup.string(),
  });
};

export default EventsSchema;

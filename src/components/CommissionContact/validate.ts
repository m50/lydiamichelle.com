import * as yup from 'yup';

const schema = yup.object().shape({
  workSize: yup.string().required(),
  name: yup.string()
    .min(1, 'Your name is required!')
    .required('Your name is required!'),
  email: yup.string()
    .email('A valid email is required.')
    .required('A valid email is required.'),
  valueOptions: yup.array()
    .min(0, 'At least one option must be picked')
    .of(yup.string())
    .required('At least one option must be picked'),
  extraInfo: yup.string(),
  totalPrice: yup.number().min(1, 'At least one option must be picked'),
});

interface Shape {
  workSize: string | undefined;
  email: string;
  name: string;
  valueOptions: string[];
  extraInfo: string;
  totalPrice: number
}

type SetIsError = (v: boolean) => void;
type SetMessage = (v: string[]) => void;

type Validate = (values: Shape, setIsError: SetIsError, setMessage: SetMessage) => Promise<boolean>;

const validate: Validate = async (values, setIsError, setMessage) => {
  try {
    await schema.validate(values, { abortEarly: false });

    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      setIsError(true);
      setMessage(err.errors);
    }

    return false;
  }
};

export default validate;

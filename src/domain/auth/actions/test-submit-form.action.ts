type ActionState =
  | {
      code: 'SUCCESS';
      message: string;
    }
  | {
      code: 'EXISTS_ERROR';
      key: string;
      message: string;
    }
  | {
      code: 'INTERNAL_ERROR';
      err: any;
    }
  | {
      code: 'VALIDATION_ERROR';
      fieldErrors: {
        [field: string]: string[];
      };
    };

export async function submitForm(
  _prevState: any,
  formData: FormData
): Promise<ActionState | void> {
  console.log('server action!!');

  // Delay for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const input = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    return {
      code: 'SUCCESS',
      message: 'Form submitted successfully!',
    };
  } catch (error) {
    return {
      code: 'INTERNAL_ERROR',
      err: error,
    };
  }
}

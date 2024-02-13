interface FormValues {
  [key: string]: {
    inputValue: never;
    select: never;
  };
}

export function toDto<T>(formValues: FormValues): T {
  const dto: Partial<T> = {};

  for (const key in formValues) {
    let value = formValues[key].inputValue;
    if (value === undefined) {
      value = formValues[key].select;
    }
    dto[key as keyof T] = value;
  }

  return dto as T;
}

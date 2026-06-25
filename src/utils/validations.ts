export function validateEmail(
  email: string
): boolean {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email.trim());
}

export function validateCPF(
  cpf: string
): boolean {

  const cleanCpf =
    cpf.replace(/\D/g, '');

  if (
    cleanCpf.length !== 11
  ) {
    return false;
  }

  if (
    /^(\d)\1+$/.test(
      cleanCpf
    )
  ) {
    return false;
  }

  let soma = 0;

  for (
    let i = 0;
    i < 9;
    i++
  ) {
    soma +=
      Number(cleanCpf[i]) *
      (10 - i);
  }

  let resto =
    (soma * 10) % 11;

  if (resto === 10) {
    resto = 0;
  }

  if (
    resto !==
    Number(cleanCpf[9])
  ) {
    return false;
  }

  soma = 0;

  for (
    let i = 0;
    i < 10;
    i++
  ) {
    soma +=
      Number(cleanCpf[i]) *
      (11 - i);
  }

  resto =
    (soma * 10) % 11;

  if (resto === 10) {
    resto = 0;
  }

  return (
    resto ===
    Number(cleanCpf[10])
  );
}

export function validatePhone(
  telefone: string
): boolean {

  const cleanPhone =
    telefone.replace(
      /\D/g,
      ''
    );

  return (
    cleanPhone.length >=
      10 &&
    cleanPhone.length <=
      11
  );
}

export function validateBirthDate(
  data: string
): boolean {

  const regex =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (
    !regex.test(data)
  ) {
    return false;
  }

  const [
    dia,
    mes,
    ano,
  ] = data
    .split('/')
    .map(Number);

  const dataNascimento =
    new Date(
      ano,
      mes - 1,
      dia
    );

  if (
    dataNascimento.getDate() !== dia ||
    dataNascimento.getMonth() !== mes - 1 ||
    dataNascimento.getFullYear() !== ano
  ) {
    return false;
  }

  const hoje =
    new Date();

  hoje.setHours(
    0,
    0,
    0,
    0
  );

  return (
    dataNascimento <= hoje
  );
}

export function validateCourse(
  curso: string
): boolean {

  return /^[A-Za-zÀ-ÿ\s]+$/
    .test(
      curso.trim()
    );
}

export function validateRequired(
  value: string
): boolean {

  return (
    value.trim()
      .length > 0
  );
}

export function maskCPF(
  value: string
): string {

  const cpf =
    value.replace(
      /\D/g,
      ''
    ).slice(0, 11);

  return cpf
    .replace(
      /^(\d{3})(\d)/,
      '$1.$2'
    )
    .replace(
      /^(\d{3})\.(\d{3})(\d)/,
      '$1.$2.$3'
    )
    .replace(
      /\.(\d{3})(\d)/,
      '.$1-$2'
    );
}

export function maskPhone(
  value: string
): string {

  const phone =
    value.replace(
      /\D/g,
      ''
    ).slice(0, 11);

  if (
    phone.length <= 10
  ) {
    return phone
      .replace(
        /^(\d{2})(\d)/,
        '($1) $2'
      )
      .replace(
        /(\d{4})(\d)/,
        '$1-$2'
      );
  }

  return phone
    .replace(
      /^(\d{2})(\d)/,
      '($1) $2'
    )
    .replace(
      /(\d{5})(\d)/,
      '$1-$2'
    );
}

export function maskBirthDate(
  value: string
): string {

  const date =
    value.replace(
      /\D/g,
      ''
    ).slice(0, 8);

  return date
    .replace(
      /^(\d{2})(\d)/,
      '$1/$2'
    )
    .replace(
      /^(\d{2})\/(\d{2})(\d)/,
      '$1/$2/$3'
    );
}

export function onlyLetters(
  value: string
): string {

  return value.replace(
    /[^A-Za-zÀ-ÿ\s]/g,
    ''
  );
}

import * as FileSystem from 'expo-file-system/legacy';

type SaveDocumentParams = {
  userId: string;
  uri: string;
  fileName?: string | null;
};

function getFileExtension(
  fileName?: string | null,
  uri?: string
) {

  const source =
    fileName || uri || '';

  const extension =
    source
      .split('?')[0]
      .split('.')
      .pop();

  if (
    extension &&
    extension.length <= 5
  ) {
    return extension;
  }

  return 'jpg';
}

function getSafeFileName(
  fileName?: string | null,
  uri?: string
) {

  const extension =
    getFileExtension(
      fileName,
      uri
    );

  const baseName =
    fileName
      ? fileName.replace(
          /\.[^/.]+$/,
          ''
        )
      : 'certificado';

  const safeBaseName =
    baseName.replace(
      /[^a-zA-Z0-9_-]/g,
      '_'
    );

  return `${Date.now()}-${safeBaseName}.${extension}`;
}

export async function saveDocumentLocally({
  userId,
  uri,
  fileName,
}: SaveDocumentParams) {

  if (
    !FileSystem.documentDirectory
  ) {
    throw new Error(
      'Diretório local indisponível'
    );
  }

  const directory =
    `${FileSystem.documentDirectory}certificados/${userId}/`;

  await FileSystem.makeDirectoryAsync(
    directory,
    {
      intermediates: true,
    }
  );

  const safeFileName =
    getSafeFileName(
      fileName,
      uri
    );

  const localUri =
    `${directory}${safeFileName}`;

  await FileSystem.copyAsync({
    from: uri,
    to: localUri,
  });

  return localUri;
}

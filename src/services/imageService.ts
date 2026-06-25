import * as ImageManipulator from 'expo-image-manipulator';

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
const QUALITY = 0.7;

export type OptimizedImage = {
  uri: string;
  width: number;
  height: number;
};

function calcularDimensoes(
  width: number,
  height: number
) {
  let newWidth = width;
  let newHeight = height;

  if (newWidth > MAX_WIDTH) {
    newHeight = Math.round(
      (newHeight * MAX_WIDTH) / newWidth
    );
    newWidth = MAX_WIDTH;
  }

  if (newHeight > MAX_HEIGHT) {
    newWidth = Math.round(
      (newWidth * MAX_HEIGHT) / newHeight
    );
    newHeight = MAX_HEIGHT;
  }

  return {
    width: newWidth,
    height: newHeight,
  };
}

export async function otimizarImagem(
  uri: string,
  width: number,
  height: number
): Promise<OptimizedImage> {
  const dimensoes = calcularDimensoes(
    width,
    height
  );

  const resultado =
    await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          resize: dimensoes,
        },
      ],
      {
        compress: QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

  return {
    uri: resultado.uri,
    width: resultado.width,
    height: resultado.height,
  };
}
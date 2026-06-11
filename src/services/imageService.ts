import * as ImageManipulator from 'expo-image-manipulator';

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
const COMPRESS_QUALITY = 0.7;
const OUTPUT_FORMAT = ImageManipulator.SaveFormat.JPEG;

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: ImageManipulator.SaveFormat;
}

export interface OptimizedImage {
  uri: string;
  width: number;
  height: number;
}

function calcularDimensoes(
  larguraOriginal: number,
  alturaOriginal: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  let width = larguraOriginal;
  let height = alturaOriginal;
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }
  return { width, height };
}

export async function comprimirImagem(
  uri: string,
  quality: number = COMPRESS_QUALITY
): Promise<OptimizedImage> {
  const resultado = await ImageManipulator.manipulateAsync(
    uri,
    [],
    { compress: quality, format: OUTPUT_FORMAT }
  );
  return { uri: resultado.uri, width: resultado.width, height: resultado.height };
}

export async function redimensionarImagem(
  uri: string,
  larguraOriginal: number,
  alturaOriginal: number,
  maxWidth: number = MAX_WIDTH,
  maxHeight: number = MAX_HEIGHT
): Promise<OptimizedImage> {
  const { width, height } = calcularDimensoes(larguraOriginal, alturaOriginal, maxWidth, maxHeight);
  if (width === larguraOriginal && height === alturaOriginal) {
    return { uri, width, height };
  }
  const resultado = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width, height } }],
    { compress: 1, format: OUTPUT_FORMAT }
  );
  return { uri: resultado.uri, width: resultado.width, height: resultado.height };
}

export async function otimizarImagem(
  uri: string,
  larguraOriginal: number,
  alturaOriginal: number,
  opcoes: ImageOptimizationOptions = {}
): Promise<OptimizedImage> {
  const {
    maxWidth = MAX_WIDTH,
    maxHeight = MAX_HEIGHT,
    quality = COMPRESS_QUALITY,
    format = OUTPUT_FORMAT,
  } = opcoes;
  const { width, height } = calcularDimensoes(larguraOriginal, alturaOriginal, maxWidth, maxHeight);
  const acoes: ImageManipulator.Action[] = [];
  if (width !== larguraOriginal || height !== alturaOriginal) {
    acoes.push({ resize: { width, height } });
  }
  const resultado = await ImageManipulator.manipulateAsync(uri, acoes, { compress: quality, format });
  return { uri: resultado.uri, width: resultado.width, height: resultado.height };
}

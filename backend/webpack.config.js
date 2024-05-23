const path = require('path');

module.exports = {
  entry: './src/server.ts',  // Punto de entrada de tu aplicación
  output: {
    filename: 'bundle.js',  // Nombre del archivo de salida
    path: path.resolve(__dirname, 'dist'),  // Directorio de salida
  },
  resolve: {
    extensions: ['.ts', '.js'],  // Extensiones a resolver
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  // Transpilar archivos TypeScript
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',  // Especifica que el bundle es para Node.js
  mode: 'production',  // Modo de producción para optimizar el bundle
};

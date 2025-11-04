#!/bin/bash

# Limpiar instalaciones previas
rm -rf node_modules
rm -f package-lock.json

# Instalar dependencias con configuración específica
npm install --no-audit --no-fund --legacy-peer-deps

# Construir el proyecto
npm run build
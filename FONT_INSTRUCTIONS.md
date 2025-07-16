# 📝 INSTRUCCIONES PARA FUENTES DEL CLIENTE

## 🎯 PROBLEMA ACTUAL
La aplicación necesita las fuentes exactas del diseño del cliente:
- **Tisa Pro** (para títulos)
- **Tisa Sans Pro** (para textos)

## ✅ LO QUE YA ESTÁ HECHO
1. ✅ Configuración CSS completa
2. ✅ Componentes usando las fuentes correctas
3. ✅ Fuentes de respaldo funcionando
4. ✅ Sistema listo para recibir los archivos

## 📋 LO QUE NECESITAS HACER

### 1. Contactar al Cliente
Solicita estos archivos específicos:

**Tisa Pro:**
```
TisaPro-Regular.woff2
TisaPro-Regular.woff
TisaPro-Bold.woff2
TisaPro-Bold.woff
TisaPro-Italic.woff2
TisaPro-Italic.woff
TisaPro-BoldItalic.woff2
TisaPro-BoldItalic.woff
```

**Tisa Sans Pro:**
```
TisaSansPro-Regular.woff2
TisaSansPro-Regular.woff
TisaSansPro-Bold.woff2
TisaSansPro-Bold.woff
```

### 2. Verificar Licencia
- ✅ Confirma que tienes permisos para usar las fuentes
- ✅ Verifica que la licencia permite uso web

### 3. Instalar las Fuentes
1. Copia todos los archivos a: `/public/fonts/`
2. Reinicia el servidor: `npm run next-dev`
3. ✅ Las fuentes se cargarán automáticamente

## 🔍 DÓNDE CONSEGUIR LAS FUENTES

### Opción 1: Cliente
- El cliente debería tener los archivos originales
- Pueden estar en su kit de marca o assets de diseño

### Opción 2: Diseñador
- Si trabajó con un diseñador, él debería tenerlas
- Revisa archivos de Figma/Adobe que puedan incluir las fuentes

### Opción 3: Licencia Directa
- Tisa Pro es de Mitja Miklavčič
- Se puede comprar en: https://www.f25.cc/fonts/tisa/
- Tisa Sans Pro también está disponible allí

## 🚀 RESULTADO ESPERADO

Una vez que tengas los archivos:
- ❌ Se eliminarán los errores 404 de fuentes
- ✅ La aplicación usará las fuentes exactas del diseño
- ✅ El cliente verá exactamente lo que especificó

## 💡 ESTADO ACTUAL

Mientras tanto, la aplicación funciona perfectamente con:
- **Playfair Display** (similar a Tisa Pro)
- **Source Sans Pro** (similar a Tisa Sans Pro)

¡El diseño se ve profesional incluso con las fuentes de respaldo!

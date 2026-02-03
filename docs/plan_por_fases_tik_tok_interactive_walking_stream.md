# TikTok Interactive Walking Stream

## Objetivo
Validar si un stream de caminata con bio‑feedback en vivo (ritmo cardíaco, stats) genera engagement real en TikTok, y escalar progresivamente hacia una experiencia interactiva avanzada (MLP).

---

## Principios del plan
- **Iterativo**: no construir nada complejo sin validar interés.
- **Visible**: cada fase debe aportar algo *claramente* perceptible para el viewer.
- **Reversible**: si algo no engancha, se descarta sin dolor.
- **Low‑friction**: minimizar hardware y setup al inicio.

---

## Fase 0 – Preparación (Setup base)
**Objetivo:** estar técnicamente listo para transmitir y capturar datos.

### Tareas
- [ ] Cuenta TikTok lista para Live
- [ ] OBS configurado (webcam, micrófono, escenas)
- [ ] Iluminación básica estable
- [ ] Walking pad + cámara principal
- [ ] Huawei Watch D3 emparejado con teléfono Android

**Resultado esperado:** stream estable, sin interacción todavía.

---

## Fase 1 – MVP (Validación de interés)
**Objetivo:** comprobar si la gente se queda a ver *solo* por el concepto.

### Qué se muestra en stream
- Video tuyo caminando
- Overlay simple con:
  - Ritmo cardíaco (HR)
  - Tiempo caminando
  - Calorías o pasos (opcional)

### Implementación técnica
- App Android mínima (Health Kit)
  - Leer datos del workout de caminata
  - Polling cada 2–5 segundos
- Envío de data a PC (HTTP o WebSocket)
- Overlay HTML simple en OBS

### Métricas a observar
- Viewers promedio
- Tiempo de permanencia
- Comentarios sobre el HR / esfuerzo

**Go / No‑Go:**
- Si nadie comenta ni se queda → iterar formato
- Si hay curiosidad → avanzar

---

## Fase 2 – MVP+ (Contexto y narrativa)
**Objetivo:** darle significado a los números.

### Mejoras
- Texto contextual:
  - “Zona cardio”
  - “Subiendo ritmo”
  - “Recuperación”
- Alertas visuales simples:
  - HR > X
  - X minutos caminando

### Valor para el viewer
- Entiende qué está pasando
- Empieza a empatizar con el esfuerzo

---

## Fase 3 – Engagement pasivo
**Objetivo:** que el viewer se sienta parte sin controlar nada aún.

### Ideas
- Mostrar últimos followers / supporters
- Mostrar contador de gente activa
- Mini ranking del stream

### Técnica
- Integración TikTok Live (solo lectura)
- Overlay con lista simple

---

## Fase 4 – Engagement activo (inicio MLP)
**Objetivo:** el viewer provoca cambios visibles.

### Primeros experimentos
- Comandos de chat que:
  - Cambien colores del overlay
  - Muestren su nombre en pantalla
- Nombre del último comando visible

### Métrica clave
- % viewers que interactúan

---

## Fase 5 – Cuerpo como interfaz (MLP)
**Objetivo:** diferenciación fuerte del stream.

### Features
- Playera / banda con marcador
- Tracking visual (OpenCV)
- Overlay que se mueve contigo
- Nombre del usuario “pegado” al cuerpo

---

## Fase 6 – Interacción física avanzada (futuro)
**Objetivo:** experiencia única.

### Ideas
- Control de caminadora por gifts
- Cámara secundaria (piernas)
- Retos físicos
- Seguridad (ToF, límites)

---

## Qué NO hacer al inicio
- ❌ Servos
- ❌ Tracking corporal
- ❌ AR complejo
- ❌ Automatización peligrosa

---

## Regla de oro
> **Si el viewer no lo nota en 3 segundos, no vale la pena.**

---

## Estado actual
- Reloj: Huawei Watch D3 ✅
- Próximo paso recomendado:
  **Fase 1 – MVP (HR + overlay simple)**


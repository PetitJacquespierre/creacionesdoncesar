/* ==========================================================================
   CREACIONES DON CÉSAR C.A. — MOTOR DUAL 3D SCROLL & EXPERIENCIA EDITORIAL
   Cambio de textos editoriales al scroll + Maniquí + Asesor + Reserva WhatsApp
   Grow Studio Agency
   ========================================================================== */

(function initDonCesarExperience() {
  'use strict';

  // 1. SPLASH SCREEN ANTI-BLOQUEO (0.65s máx)
  const splash = document.querySelector('[data-splash]');
  if (splash) {
    const dismissSplash = () => {
      splash.classList.add('is-revealed');
      document.body.style.overflow = '';
    };
    const timer = setTimeout(dismissSplash, 650);
    ['click', 'touchstart', 'keydown', 'wheel'].forEach(evt => {
      window.addEventListener(evt, () => {
        clearTimeout(timer);
        dismissSplash();
      }, { once: true, passive: true });
    });
  }

  // 2. FASES EDITORIALES COMPLETAS SEGÚN EL SCROLL (CERO PREFIJOS NUMÉRICOS)
  const stages = [
    {
      step: 0,
      pill: 'ALQUILER & VENTA • EDICIÓN GALA 2026',
      headline: 'El porte de un caballero. La <span class="hero-headline__accent">tradición</span> de Punto Fijo.',
      lead: 'Más de cuatro décadas vistiendo a novios, graduandos y padrinos de Falcón. Experimenta el ajuste anatómico milimétrico de nuestra sastrería tradicional y reserva tu traje con tintorería y accesorios incluidos.',
      telemetryTitle: 'Corte Anatómico & Medidas',
      telemetryDesc: 'Toma de medidas anatómicas en tienda para un calce perfecto en tallas 34 al 58+.',
      telemetryBadge: 'DISPONIBLE',
      frameIndex: 0
    },
    {
      step: 1,
      pill: 'DETALLES DE PRECISIÓN • ACCESORIOS DE GALA',
      headline: 'Camisa almidonada & gemelos de <span class="hero-headline__accent">plata fina</span>.',
      lead: 'Cada alquiler incluye camisa de cuello italiano impecable y mancuernas plateadas pulidas a mano. Cuidamos cada milímetro para que luzcas con autoridad desde la sesión de fotos hasta la fiesta.',
      telemetryTitle: 'Camisa de Gala & Gemelos',
      telemetryDesc: 'Camisa formal con puño francés y gemelos plateados de etiqueta incluidos.',
      telemetryBadge: 'DISPONIBLE',
      frameIndex: 1
    },
    {
      step: 2,
      pill: 'SELLO DON CÉSAR • CORBATÍN BORGOÑA',
      headline: 'El toque distintivo: chaleco y <span class="hero-headline__accent">corbatín imperial</span>.',
      lead: 'Inspirado en el tono borgoña de nuestro logo histórico. Chaleco estructurado que estiliza la postura y corbatín de satén ajustable que marca la diferencia entre un traje común y alta costura.',
      telemetryTitle: 'Chaleco & Corbatín Borgoña',
      telemetryDesc: 'Corte anatómico con botonadura cerrada y satén vino tinto de alta densidad.',
      telemetryBadge: 'DISPONIBLE',
      frameIndex: 2
    },
    {
      step: 3,
      pill: 'ETIQUETA SUPREMA • BLACK TIE DE NOVIO',
      headline: 'Saco de etiqueta listo para <span class="hero-headline__accent">llegar al altar</span>.',
      lead: 'Smoking completo confeccionado en paño fino de lana fría con solapas de seda y caída perfecta. Ajustado a tu cuerpo por nuestros maestros sastres, listo para que solo disfrutes tu noche.',
      telemetryTitle: 'Smoking de Etiqueta Black Tie',
      telemetryDesc: 'Smoking imperial con solapa de seda y botón de gala central. Listo para el altar.',
      telemetryBadge: 'DISPONIBLE',
      frameIndex: 3
    }
  ];

  // 3. REFERENCIAS DEL DOM
  const canvas = document.getElementById('suit3dCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const frameLayers = document.querySelectorAll('.suit-frame-layer');
  
  // Elementos de la columna izquierda que CAMBIAN con el scroll
  const heroPillTag = document.getElementById('heroPillTag');
  const heroHeadline = document.getElementById('heroHeadline');
  const heroLead = document.getElementById('heroLead');

  // Elementos de la telemetría derecha
  const telemetryTitle = document.getElementById('telemetryTitle');
  const telemetryDesc = document.getElementById('telemetryDesc');
  const telemetryBadge = document.getElementById('telemetryBadge');
  const stagePills = document.querySelectorAll('.stage-pill');

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    if (ctx) ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // 4. ANIMACIÓN Y COREOGRAFÍA AL SCROLL
  const heroSection = document.getElementById('heroScrollSection');
  let currentStageIndex = -1;

  function updateHeroScroll() {
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    const sectionHeight = heroSection.offsetHeight - window.innerHeight;
    
    let progress = 0;
    if (sectionHeight > 0) {
      progress = Math.min(Math.max(-rect.top / sectionHeight, 0), 1);
    }

    const stageIndex = Math.min(Math.floor(progress * stages.length), stages.length - 1);
    const activeData = stages[stageIndex];

    // Solo actualizar textos cuando cambia de fase
    if (currentStageIndex !== stageIndex) {
      currentStageIndex = stageIndex;

      // Actualizar columna izquierda con suave fundido
      if (heroPillTag) heroPillTag.textContent = activeData.pill;
      if (heroHeadline) {
        heroHeadline.style.opacity = '0';
        heroHeadline.style.transform = 'translateY(4px)';
        setTimeout(() => {
          heroHeadline.innerHTML = activeData.headline;
          heroHeadline.style.opacity = '1';
          heroHeadline.style.transform = 'translateY(0)';
        }, 120);
      }
      if (heroLead) {
        heroLead.style.opacity = '0';
        setTimeout(() => {
          heroLead.textContent = activeData.lead;
          heroLead.style.opacity = '1';
        }, 120);
      }

      // Actualizar Telemetría derecha (Limpios sin prefijos)
      if (telemetryTitle) telemetryTitle.textContent = activeData.telemetryTitle;
      if (telemetryDesc) telemetryDesc.textContent = activeData.telemetryDesc;
      if (telemetryBadge) telemetryBadge.textContent = activeData.telemetryBadge;

      // Actualizar botones de etapa
      stagePills.forEach((pill, idx) => {
        pill.classList.toggle('is-active', idx === stageIndex);
      });

      // Actualizar capas de fotos
      frameLayers.forEach((layer, idx) => {
        layer.classList.toggle('is-visible', idx === activeData.frameIndex);
      });
    }

    // Dibujo en Canvas 3D sincronizado
    drawInteractiveSuit(progress, stageIndex);
  }

  // Permite hacer clic en las píldoras de etapa para navegar
  stagePills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      if (!heroSection) return;
      const targetScroll = heroSection.offsetTop + (heroSection.offsetHeight - window.innerHeight) * (idx / (stages.length - 1));
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });

  // Dibujo reactivo en el Canvas
  function drawInteractiveSuit(progress, stageIndex) {
    if (!ctx || !canvas) return;
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, width, height);

    // Resplandor cenital
    const gradient = ctx.createRadialGradient(
      width * 0.5, height * 0.35, 20,
      width * 0.5, height * 0.45, width * 0.55
    );
    gradient.addColorStop(0, 'rgba(99, 20, 27, 0.28)');
    gradient.addColorStop(0.65, 'rgba(184, 188, 191, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Giroscopio sutil en Canvas
    ctx.save();
    ctx.translate(width * 0.5, height * 0.45);
    const rotationAngle = (progress * Math.PI * 0.4) - (Math.PI * 0.2);
    ctx.rotate(rotationAngle * 0.12);

    // Maniquí de Sastrería Estilizado
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-90, -130);
    ctx.lineTo(90, -130);
    ctx.lineTo(60, 45);
    ctx.lineTo(-60, 45);
    ctx.closePath();
    ctx.stroke();

    // Solapas Borgoña
    ctx.strokeStyle = stageIndex >= 2 ? 'rgba(180, 40, 50, 0.85)' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -125);
    ctx.lineTo(-32, -15);
    ctx.lineTo(0, 32);
    ctx.lineTo(32, -15);
    ctx.closePath();
    ctx.stroke();

    // Botón central de gala
    if (stageIndex >= 3) {
      ctx.fillStyle = '#E2E4E7';
      ctx.beginPath();
      ctx.arc(0, 12, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  window.addEventListener('scroll', updateHeroScroll, { passive: true });
  updateHeroScroll();

  // 5. ASESOR INTERACTIVO EN 3 TOQUES CON VERIFICACIÓN DE DISPONIBILIDAD
  const advisorBtns = document.querySelectorAll('.advisor-btn');
  const resultName = document.getElementById('advisorResultName');
  const advisorWhatsappBtn = document.getElementById('advisorWhatsappBtn');
  const advisorStatusBadge = document.getElementById('advisorStatusBadge');

  const selectedConfig = {
    evento: 'Boda (Novio)',
    horario: 'Noche (Etiqueta)',
    persona: 'Caballero Adulto'
  };

  advisorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.advisor-options');
      const param = btn.dataset.param;
      const value = btn.dataset.value;

      group.querySelectorAll('.advisor-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');

      selectedConfig[param] = value;
      updateAdvisorRecommendation();
    });
  });

  function updateAdvisorRecommendation() {
    let suitRecommendation = 'Smoking Clásico Black Tie con Solapa de Seda';
    let statusText = 'DISPONIBLE EN TIENDA';
    
    if (selectedConfig.evento === 'Graduación') {
      suitRecommendation = 'Traje Slim Fit Azul Marino / Gris Oxford';
      statusText = 'DISPONIBLE • AJUSTE EN 48 HORAS';
    } else if (selectedConfig.evento === '15 Años') {
      suitRecommendation = 'Esmoquin de Gala con Corbatín Borgoña Imperial';
      statusText = 'DISPONIBLE EN TIENDA';
    } else if (selectedConfig.persona === 'Niño (Paje / Cortejo)') {
      suitRecommendation = 'Cortejo Infantil Completo con Chaleco y Corbata';
      statusText = 'DISPONIBLE • TALLAS 2 A LA 16';
    } else if (selectedConfig.persona === 'Talla Especial / Plus Size') {
      suitRecommendation = 'Traje de Corte Anatómico Especial (Tallas 46 a la 58+)';
      statusText = 'DISPONIBLE • ATENCIÓN PERSONALIZADA';
    } else if (selectedConfig.horario === 'Día / Jardín o Playa') {
      suitRecommendation = 'Traje Claro Fresco o Azul Cobalto de Alta Costura';
      statusText = 'DISPONIBLE EN TIENDA';
    }

    if (resultName) resultName.textContent = suitRecommendation;
    if (advisorStatusBadge) advisorStatusBadge.textContent = statusText;

    if (advisorWhatsappBtn) {
      const text = `¡Hola Sastrería Don César! Vengo de su página web. Usé el asistente de etiqueta para un evento: *${selectedConfig.evento}* de *${selectedConfig.horario}* para *${selectedConfig.persona}*. Me interesa consultar disponibilidad y agendar prueba para el modelo: *${suitRecommendation}*. ¿Tienen fecha disponible?`;
      advisorWhatsappBtn.href = `https://wa.me/584146954001?text=${encodeURIComponent(text)}`;
    }
  }

  // 6. MODAL DE RESERVA / TICKET DE SASTRERÍA DIRECTO A WHATSAPP
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  const modal = document.getElementById('bookingModal');
  const bookingForm = document.getElementById('bookingForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const suitName = btn.dataset.suit || 'Traje de Etiqueta Don César';
      const suitInput = document.getElementById('modalSuitInput');
      if (suitInput) suitInput.value = suitName;
      if (modal) modal.classList.add('is-open');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.remove('is-open');
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-open');
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('clientName').value.trim();
      const telefono = document.getElementById('clientPhone').value.trim();
      const traje = document.getElementById('modalSuitInput').value;
      const fecha = document.getElementById('eventDate').value;
      const talla = document.getElementById('clientSize').value;

      const ticketMsg = 
`🎫 *TICKET DE RESERVA DE ALQUILER — CREACIONES DON CÉSAR*
━━━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${nombre}
📞 *Teléfono:* ${telefono}
👔 *Modelo:* ${traje}
📏 *Talla estimada:* ${talla}
📅 *Fecha del evento:* ${fecha}
━━━━━━━━━━━━━━━━━━━━
💰 *Condiciones de Alquiler:*
• Abono inicial de reserva: $20 USD (al apartar)
• Saldo restante: al retirar la prenda
• Depósito de garantía reembolsable: $10 USD (reintegrable el lunes)
• Tintorería y ajuste de sastre: 100% Incluidos
📍 *Sede:* Calle Zamora c/ Callejón Aragón, Centro Punto Fijo
━━━━━━━━━━━━━━━━━━━━
Hola Don César, acabo de generar mi cita en la web para coordinar mi prueba y congelar mi fecha.`;

      const targetUrl = `https://wa.me/584146954001?text=${encodeURIComponent(ticketMsg)}`;
      window.open(targetUrl, '_blank', 'noopener');
      if (modal) modal.classList.remove('is-open');
    });
  }

  // 7. ACORDEÓN INTERACTIVO DE PREGUNTAS FRECUENTES (FAQ)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Opcional: Cerrar los demás para mantener orden
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 8. TRÍADA DE EASTER EGGS GROW STUDIO
  // A. Mensaje estilizado en consola (F12)
  console.log(
    '%c🎩 CREACIONES DON CÉSAR C.A. %c— Sastrería & Petronio Punto Fijo\n' +
    '%c⚡ Protocolo KDOG_K ejecutado: Arquitectura visual calibrada por Grow Studio (https://growstudioweb.vercel.app/)',
    'background: #63141b; color: #ffffff; font-weight: bold; padding: 6px 10px; border-radius: 4px 0 0 4px; font-size: 12px;',
    'background: #111116; color: #c8c8cf; padding: 6px 10px; border-radius: 0 4px 4px 0; font-size: 12px;',
    'color: #8e8e98; font-size: 11px; margin-top: 6px; display: block;'
  );

  // B. 5 Toques en el Logo -> Confeti Canvas + Modal VIP de Honor
  let logoClickCount = 0;
  let logoResetTimer = null;
  const brandMarks = document.querySelectorAll('.brand-mark');
  const vipModal = document.getElementById('vipEasterModal');
  const closeVipBtn = document.getElementById('closeVipEaster');

  brandMarks.forEach(logo => {
    logo.addEventListener('click', (e) => {
      logoClickCount++;
      clearTimeout(logoResetTimer);
      logoResetTimer = setTimeout(() => { logoClickCount = 0; }, 2500);

      if (logoClickCount === 5) {
        e.preventDefault();
        logoClickCount = 0;
        triggerCelebrationConfetti();
        if (vipModal) vipModal.classList.add('is-open');
      }
    });

    // C. Long-press en el logo (Vibración háptica si está disponible)
    let pressTimer = null;
    const startPress = () => {
      pressTimer = setTimeout(() => {
        if ('vibrate' in navigator) navigator.vibrate([50, 40, 50]);
        logo.style.transform = 'scale(0.95)';
        setTimeout(() => { logo.style.transform = ''; }, 300);
      }, 700);
    };
    const cancelPress = () => { clearTimeout(pressTimer); };

    logo.addEventListener('mousedown', startPress);
    logo.addEventListener('mouseup', cancelPress);
    logo.addEventListener('mouseleave', cancelPress);
    logo.addEventListener('touchstart', startPress, { passive: true });
    logo.addEventListener('touchend', cancelPress, { passive: true });
  });

  if (closeVipBtn && vipModal) {
    closeVipBtn.addEventListener('click', () => {
      vipModal.classList.remove('is-open');
    });
    vipModal.addEventListener('click', (e) => {
      if (e.target === vipModal) vipModal.classList.remove('is-open');
    });
  }

  // Motor Liviano de Confeti Canvas Nativo (Borgoña, Oro, Plata)
  function triggerCelebrationConfetti() {
    const confettiCanvas = document.getElementById('confettiCanvas');
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    const width = confettiCanvas.width = window.innerWidth;
    const height = confettiCanvas.height = window.innerHeight;

    const colors = ['#63141b', '#9b2029', '#d4af37', '#f3e5ab', '#ffffff', '#e0e0e0'];
    const particles = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 16,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    let animationId;
    let frames = 0;

    function render() {
      frames++;
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      particles.forEach(p => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - (frames / 120));

        if (p.opacity > 0 && p.y < height + 20) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
          ctx.restore();
        }
      });

      if (alive && frames < 140) {
        animationId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, width, height);
      }
    }

    render();
  }

  // 9. CONCIERGE / ASISTENTE FLOTANTE IN-APP (SIN SALIR DE LA PÁGINA)
  const conciergeLauncher = document.getElementById('conciergeLauncher');
  const conciergeWidget = document.getElementById('conciergeWidget');
  const closeConciergeBtn = document.getElementById('closeConcierge');

  if (conciergeLauncher && conciergeWidget) {
    const toggleConcierge = () => {
      const isOpen = conciergeWidget.classList.contains('is-open');
      if (isOpen) {
        conciergeWidget.classList.remove('is-open');
        conciergeLauncher.classList.remove('is-active');
        conciergeLauncher.setAttribute('aria-expanded', 'false');
      } else {
        conciergeWidget.classList.add('is-open');
        conciergeLauncher.classList.add('is-active');
        conciergeLauncher.setAttribute('aria-expanded', 'true');
      }
    };

    conciergeLauncher.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleConcierge();
    });

    if (closeConciergeBtn) {
      closeConciergeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        conciergeWidget.classList.remove('is-open');
        conciergeLauncher.classList.remove('is-active');
        conciergeLauncher.setAttribute('aria-expanded', 'false');
      });
    }

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!conciergeWidget.contains(e.target) && !conciergeLauncher.contains(e.target)) {
        conciergeWidget.classList.remove('is-open');
        conciergeLauncher.classList.remove('is-active');
        conciergeLauncher.setAttribute('aria-expanded', 'false');
      }
    });

    // Acciones internas del concierge
    const conciergeActionBtns = conciergeWidget.querySelectorAll('[data-concierge-action]');
    conciergeActionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.conciergeAction;
        conciergeWidget.classList.remove('is-open');
        conciergeLauncher.classList.remove('is-active');
        conciergeLauncher.setAttribute('aria-expanded', 'false');

        if (action === 'ticket') {
          const bookingModal = document.getElementById('bookingModal');
          if (bookingModal) bookingModal.classList.add('is-open');
        } else if (action === 'advisor') {
          const advisorSection = document.getElementById('asesor');
          if (advisorSection) advisorSection.scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'location') {
          const locationSection = document.getElementById('ubicacion');
          if (locationSection) locationSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

})();

/**
 * LIGHT MASTER AUTOMOTIVE - MASTER ENGINE JS
 * Vanilla interactive logic for beam simulator, headlight ignition,
 * accordion FAQ, and zero-framework WhatsApp conversion checkout & warranty submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeadlightSequence();
  initBeamSimulator();
  initAccordions();
  initPurchaseForm();
  initWarrantyForm();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    const isExpanded = navLinks.classList.contains('nav-open');
    toggle.setAttribute('aria-expanded', isExpanded);
    toggle.innerHTML = isExpanded ? '✕' : '☰';
  });

  // Close when clicking outside or clicking any nav link
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('nav-open')) {
      navLinks.classList.remove('nav-open');
      toggle.innerHTML = '☰';
    }
  });
}

// Headlight Startup Glow Sequence
function initHeadlightSequence() {
  const target = document.querySelector('.car-dashboard-pod');
  if (target) {
    target.classList.add('headlight-seq-active');
  }
}

// Interactive Beam Pattern Selector (Halogen vs Light Master Bi-LED)
function initBeamSimulator() {
  const beamEffect = document.getElementById('beamEffect');
  const btnHalogen = document.getElementById('btnHalogen');
  const btnBiLed = document.getElementById('btnBiLed');
  const beamStatusText = document.getElementById('beamStatusText');

  if (!beamEffect || !btnHalogen || !btnBiLed) return;

  btnHalogen.addEventListener('click', () => {
    btnHalogen.classList.add('active');
    btnBiLed.classList.remove('active');
    beamEffect.className = 'beam-light-effect beam-halogen';
    if (beamStatusText) {
      beamStatusText.innerHTML = '<span style="color:#ffaa00">● Standard 55W Halogen:</span> Unfocused scattered beam, 3200K yellow light, dangerous upward stray glare to oncoming traffic, poor road penetration.';
    }
  });

  btnBiLed.addEventListener('click', () => {
    btnBiLed.classList.add('active');
    btnHalogen.classList.remove('active');
    beamEffect.className = 'beam-light-effect beam-biled';
    if (beamStatusText) {
      beamStatusText.innerHTML = '<span style="color:#00d2ff">● Light Master Bi-LED:</span> Razor-sharp German optical cutoff, 6000K daylight white, 450% lux intensity, zero blinding glare above horizon.';
    }
  });
}

// FAQ Accordion Toggle
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('active');

      // Close all other accordion items
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherContent = other.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// WhatsApp Conversion Routines
const LM_WHATSAPP_PHONE = '919544488144'; // Dedicated Business WhatsApp

// 1. PURCHASE ORDER FORM HANDLER
function initPurchaseForm() {
  const form = document.getElementById('lmPurchaseForm');
  const fallbackBox = document.getElementById('purchaseFallbackBox');
  const fallbackLink = document.getElementById('purchaseFallbackLink');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('custName')?.value.trim() || 'Valued Customer';
    const phone = document.getElementById('custPhone')?.value.trim() || 'N/A';
    const vehicle = document.getElementById('custVehicle')?.value.trim() || 'Custom Vehicle';
    const tier = document.getElementById('custTier')?.value || 'Selected Product';
    const bulbSocket = document.getElementById('custSocket')?.value || 'Standard Fitment';
    const address = document.getElementById('custAddress')?.value.trim() || 'Direct Inquiry / Showroom Pickup';
    const notes = document.getElementById('custNotes')?.value.trim() || 'None';

    // Format WhatsApp Message
    const orderMessage = 
`⚡ *LIGHT MASTER AUTOMOTIVE - NEW ORDER INQUIRY* ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${name}
📞 *Contact Number:* ${phone}
🚘 *Vehicle Model & Year:* ${vehicle}
💡 *Selected Lighting Variant:* ${tier}
🔌 *Bulb Socket / Fitting:* ${bulbSocket}
📍 *Delivery / City Address:* ${address}
📝 *Custom Notes / Requirements:* ${notes}
🛡️ *Warranty Covered:* 2-Year Direct Replacement Guarantee
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Inquiry sent via official portal https://lightmasterled.com_`;

    const encodedText = encodeURIComponent(orderMessage);
    const waUrl = `https://wa.me/${LM_WHATSAPP_PHONE}?text=${encodedText}`;

    // Attempt Window Open
    const openedWindow = window.open(waUrl, '_blank');

    // Show fallback anchor if blocked or to guarantee reassurance
    if (fallbackBox && fallbackLink) {
      fallbackLink.href = waUrl;
      fallbackBox.style.display = 'block';
    }

    if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
      window.location.href = waUrl;
    }
  });
}

// 2. WARRANTY REGISTRATION / CLAIM FORM HANDLER
function initWarrantyForm() {
  const form = document.getElementById('lmWarrantyForm');
  const fallbackBox = document.getElementById('warrantyFallbackBox');
  const fallbackLink = document.getElementById('warrantyFallbackLink');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const invoiceNo = document.getElementById('invNumber')?.value.trim() || 'N/A';
    const invoiceDate = document.getElementById('invDate')?.value || 'N/A';
    const custName = document.getElementById('wCustName')?.value.trim() || 'Valued Customer';
    const custPhone = document.getElementById('wCustPhone')?.value.trim() || 'N/A';
    const productModel = document.getElementById('wProductModel')?.value.trim() || 'Light Master LED Unit';
    const issueDesc = document.getElementById('wIssueDesc')?.value.trim() || 'Standard diagnostic replacement request';

    // Format Warranty Support Ticket
    const ticketMessage = 
`🛡️ *LIGHT MASTER AUTOMOTIVE - 2-YEAR WARRANTY CLAIM TICKET* 🛡️
━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Invoice / GST Ref:* ${invoiceNo}
📅 *Purchase / GST Date:* ${invoiceDate}
👤 *Registered Customer:* ${custName}
📞 *Contact Phone:* ${custPhone}
💡 *Product Model & Category:* ${productModel}
⚠️ *Lighting Issue Diagnostic:* ${issueDesc}
🛡️ *Warranty Terms:* 2-Year Express Replacement Policy
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Submitted via official Light Master Automotive Portal https://lightmasterled.com_`;

    const encodedText = encodeURIComponent(ticketMessage);
    const waUrl = `https://wa.me/${LM_WHATSAPP_PHONE}?text=${encodedText}`;

    const openedWindow = window.open(waUrl, '_blank');

    if (fallbackBox && fallbackLink) {
      fallbackLink.href = waUrl;
      fallbackBox.style.display = 'block';
    }

    if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
      window.location.href = waUrl;
    }
  });
}

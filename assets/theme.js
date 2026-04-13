document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const catalogToggle = document.querySelector('[data-catalog-toggle]');
  const mobileClose = document.querySelector('[data-mobile-menu-close]');
  const megaMenu = document.querySelector('[data-mega-menu]');
  const megaBackdrop = document.querySelector('[data-mega-backdrop]');
  const header = document.querySelector('[data-header]');

  const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches;

  const syncStickyOffset = () => {
    if (!header) return;
    if (header.classList.contains('header--sticky-fixed')) {
      body.style.paddingTop = `${header.offsetHeight + 6}px`;
    } else {
      body.style.paddingTop = '';
    }
  };

  syncStickyOffset();

  const openMegaMenu = () => {
    if (!megaMenu || !megaBackdrop || !catalogToggle) return;
    megaMenu.hidden = false;
    megaBackdrop.hidden = false;
    megaMenu.classList.add('is-open');
    megaBackdrop.classList.add('is-open');
    catalogToggle.classList.add('is-active');
    catalogToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('mega-open');
  };

  const closeMegaMenu = () => {
    if (!megaMenu || !megaBackdrop || !catalogToggle) return;
    megaMenu.classList.remove('is-open');
    megaBackdrop.classList.remove('is-open');
    catalogToggle.classList.remove('is-active');
    catalogToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('mega-open');
    window.setTimeout(() => {
      megaMenu.hidden = true;
      megaBackdrop.hidden = true;
    }, 180);
  };

  const openMobileMenu = () => {
    if (!mobileMenu || !catalogToggle) return;
    mobileMenu.hidden = false;
    mobileMenu.classList.add('is-open');
    catalogToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    if (!mobileMenu || !catalogToggle) return;
    mobileMenu.classList.remove('is-open');
    catalogToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
    window.setTimeout(() => {
      mobileMenu.hidden = true;
    }, 180);
  };

  catalogToggle?.addEventListener('click', () => {
    if (isMobileViewport()) {
      if (mobileMenu?.classList.contains('is-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    } else {
      if (megaMenu?.classList.contains('is-open')) {
        closeMegaMenu();
      } else {
        closeMobileMenu();
        openMegaMenu();
      }
    }
  });

  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileMenu?.addEventListener('click', (event) => {
    if (event.target === mobileMenu) closeMobileMenu();
  });

  /* ---- Mobile accordion ---- */
  document.querySelectorAll('[data-mob-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.closest('.mob-cat');
      const bodyId = btn.getAttribute('aria-controls');
      const body = document.getElementById(bodyId);
      const plusEl = btn.querySelector('.mob-cat__plus');
      const isOpen = cat.classList.contains('mob-cat--open');

      /* close all others first */
      document.querySelectorAll('.mob-cat--open').forEach((openCat) => {
        openCat.classList.remove('mob-cat--open');
        const openBody = openCat.querySelector('.mob-cat__body');
        const openPlus = openCat.querySelector('.mob-cat__plus');
        const openBtn = openCat.querySelector('[data-mob-toggle]');
        if (openBody) openBody.hidden = true;
        if (openPlus) openPlus.textContent = '+';
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      });

      /* toggle clicked one */
      if (!isOpen) {
        cat.classList.add('mob-cat--open');
        if (body) body.hidden = false;
        if (plusEl) plusEl.textContent = '\u2212';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  megaBackdrop?.addEventListener('click', closeMegaMenu);

  document.querySelectorAll('[data-mega-trigger]').forEach((trigger) => {
    const activatePanel = () => {
      const panelId = trigger.getAttribute('data-mega-trigger');
      document.querySelectorAll('[data-mega-trigger]').forEach((item) => {
        const active = item === trigger;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      document.querySelectorAll('[data-mega-panel]').forEach((panel) => {
        panel.classList.toggle('is-active', panel.getAttribute('data-mega-panel') === panelId);
      });
    };

    trigger.addEventListener('mouseenter', activatePanel);
    trigger.addEventListener('focus', activatePanel);
    trigger.addEventListener('click', activatePanel);
  });

  document.querySelectorAll('[data-product-gallery]').forEach((gallery) => {
    const mainImage = gallery.querySelector('[data-gallery-main]');
    if (!mainImage) return;

    gallery.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const nextUrl = thumb.getAttribute('data-image-url');
        const nextSrcset = thumb.getAttribute('data-image-srcset');
        const nextAlt = thumb.getAttribute('data-image-alt') || mainImage.alt;

        if (nextUrl) mainImage.src = nextUrl;
        if (nextSrcset) mainImage.srcset = nextSrcset;
        mainImage.alt = nextAlt;

        gallery.querySelectorAll('[data-gallery-thumb]').forEach((item) => {
          item.classList.remove('is-active');
        });
        thumb.classList.add('is-active');
      });
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMegaMenu();
      closeMobileMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!megaMenu || !catalogToggle) return;
    const clickedInsideHeader = event.target.closest('[data-header]');
    const clickedMega = event.target.closest('[data-mega-menu]');
    if (!clickedInsideHeader && !clickedMega) {
      closeMegaMenu();
    }
  });

  window.addEventListener('resize', () => {
    syncStickyOffset();
    if (isMobileViewport()) {
      closeMegaMenu();
    } else {
      closeMobileMenu();
    }
  });

  document.querySelectorAll('[data-quantity-selector]').forEach((wrapper) => {
    const input = wrapper.querySelector('input[type="number"]');
    const minus = wrapper.querySelector('[data-quantity-minus]');
    const plus = wrapper.querySelector('[data-quantity-plus]');

    minus?.addEventListener('click', () => {
      if (!input) return;
      input.value = Math.max(1, Number(input.value || 1) - 1);
    });

    plus?.addEventListener('click', () => {
      if (!input) return;
      input.value = Number(input.value || 1) + 1;
    });
  });

  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const triggers = tabs.querySelectorAll('[data-tab-trigger]');
    const panels = tabs.querySelectorAll('[data-tab-panel]');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const id = trigger.getAttribute('data-tab-trigger');

        triggers.forEach((button) => button.classList.remove('is-active'));
        panels.forEach((panel) => panel.classList.remove('is-active'));

        trigger.classList.add('is-active');
        tabs.querySelector(`[data-tab-panel="${id}"]`)?.classList.add('is-active');
      });
    });
  });

  const toast = document.querySelector('[data-site-toast]');
  const toastText = document.querySelector('[data-site-toast-text]');
  const toastClose = document.querySelector('[data-toast-close]');
  let toastTimeout;

  const showToast = (message) => {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.hidden = false;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
      toast.classList.remove('is-visible');
      window.setTimeout(() => {
        toast.hidden = true;
      }, 180);
    }, 2600);
  };

  toastClose?.addEventListener('click', () => {
    toast?.classList.remove('is-visible');
    window.setTimeout(() => {
      if (toast) toast.hidden = true;
    }, 180);
  });

  document.querySelectorAll('form[data-product-form], form[data-product-form=""]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      if (!window.fetch) return;

      event.preventDefault();

      const submitter = event.submitter;
      const isBuyNow = submitter?.hasAttribute('data-buy-now');

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Nu s-a putut adauga produsul in cos.');
        }

        await response.json();

        if (isBuyNow) {
          window.location.href = '/checkout';
          return;
        }

        const cartResponse = await fetch('/cart.js');
        const cart = await cartResponse.json();
        document.querySelectorAll('[data-cart-count]').forEach((count) => {
          count.textContent = cart.item_count;
        });
        showToast('Produsul a fost adaugat in cos.');
      } catch (error) {
        showToast(error.message);
      }
    });
  });
});
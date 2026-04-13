document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileClose = document.querySelector('[data-mobile-menu-close]');

  const openMobileMenu = () => {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.hidden = false;
    mobileMenu.classList.add('is-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.classList.remove('is-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
    window.setTimeout(() => {
      mobileMenu.hidden = true;
    }, 180);
  };

  mobileToggle?.addEventListener('click', () => {
    if (mobileMenu?.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileMenu?.addEventListener('click', (event) => {
    if (event.target === mobileMenu) closeMobileMenu();
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